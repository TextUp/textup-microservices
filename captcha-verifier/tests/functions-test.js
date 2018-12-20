const test = require("tape"),
  sinon = require("sinon"),
  chance = require("chance").Chance(),
  CaptchaVerifier = require("../helpers/captcha-verifier"),
  AwsApiResponse = require("../helpers/aws-api-response");

test("initializing execution context", function(assert) {
  assert.throws(
    () => require("../functions"),
    "immediately throws error if environment variables not set"
  );

  const url = chance.string(),
    secret = chance.string();
  sinon.replace(process, "env", {
    TEXTUP_MICROSERVICE_RECAPTCHA_URL: url,
    TEXTUP_MICROSERVICE_RECAPTCHA_SECRET_KEY: secret
  });

  assert.doesNotThrow(() => require("../functions"));

  sinon.restore();
  assert.end();
});

test("missing required info", function(assert) {
  const url = chance.string(),
    secret = chance.string();
  sinon.replace(process, "env", {
    TEXTUP_MICROSERVICE_RECAPTCHA_URL: url,
    TEXTUP_MICROSERVICE_RECAPTCHA_SECRET_KEY: secret
  });

  const callback = sinon.fake(),
    { verifyCaptcha } = require("../functions");
  sinon.replace(AwsApiResponse, "failure", sinon.fake());

  verifyCaptcha({}, null, callback);

  assert.ok(callback.calledOnce);
  assert.ok(AwsApiResponse.failure.calledOnce);

  verifyCaptcha({ body: "" }, null, callback);

  assert.ok(callback.calledTwice);
  assert.ok(AwsApiResponse.failure.calledTwice);

  sinon.restore();
  assert.end();
});

test("with all required info", function(assert) {
  const url = chance.string(),
    secret = chance.string();
  sinon.replace(process, "env", {
    TEXTUP_MICROSERVICE_RECAPTCHA_URL: url,
    TEXTUP_MICROSERVICE_RECAPTCHA_SECRET_KEY: secret
  });

  const key = chance.string(),
    callback = sinon.fake(),
    checkFake = sinon.fake.resolves(),
    { verifyCaptcha } = require("../functions");
  sinon.replace(CaptchaVerifier.prototype, "check", checkFake);

  verifyCaptcha({ body: JSON.stringify({ key }) }, null, callback);

  assert.ok(checkFake.calledOnce);
  assert.ok(checkFake.calledWith(key));

  // Need to wait a bit for the promise success callback to be executed
  setTimeout(() => {
    assert.ok(callback.calledOnce);

    sinon.restore();
    assert.end();
  }, 100);
});
