const test = require("tape"),
  chance = require("chance").Chance(),
  sinon = require("sinon"),
  axios = require("axios"),
  CaptchaVerifier = require("../helpers/captcha-verifier");

test("constructor", function(assert) {
  const urlRoot = chance.string(),
    secret = chance.string();

  assert.throws(() => new CaptchaVerifier(), "requires url root and secret to be specified");
  assert.throws(() => new CaptchaVerifier(urlRoot));
  assert.doesNotThrow(() => new CaptchaVerifier(urlRoot, secret));

  assert.end();
});

test("properties", function(assert) {
  const urlRoot = chance.string(),
    secret = chance.string(),
    verifier = new CaptchaVerifier(urlRoot, secret);

  assert.equal(verifier.urlRoot, urlRoot);
  assert.equal(verifier.secret, secret);

  assert.end();
});

test("determining if success", function(assert) {
  assert.equal(CaptchaVerifier.isSuccess(), false);
  assert.equal(CaptchaVerifier.isSuccess(200), false);
  assert.equal(CaptchaVerifier.isSuccess("not a number", "hello"), false);
  assert.equal(CaptchaVerifier.isSuccess(300, "hello"), true);
  assert.equal(CaptchaVerifier.isSuccess(300, false), false);
  assert.equal(CaptchaVerifier.isSuccess(300, true), true);

  assert.end();
});

test("successful response", function(assert) {
  const urlRoot = chance.string(),
    secret = chance.string(),
    response = chance.string(),
    verifier = new CaptchaVerifier(urlRoot, secret);
  sinon.replace(axios, "post", sinon.fake.resolves({}));

  let result = verifier.check();
  assert.equal(result.constructor, Promise);
  result
    .then(payload => {
      assert.equal(payload.constructor, Object);
      assert.ok(axios.post.calledOnce);
      assert.ok(axios.post.firstCall.args[0].includes(verifier.urlRoot));
      assert.ok(axios.post.firstCall.args[0].includes(verifier.secret));

      result = verifier.check(response);
      assert.equal(result.constructor, Promise);
      return result;
    })
    .then(payload => {
      assert.equal(payload.constructor, Object);
      assert.ok(axios.post.calledTwice);
      assert.ok(axios.post.secondCall.args[0].includes(verifier.urlRoot));
      assert.ok(axios.post.secondCall.args[0].includes(verifier.secret));
      assert.ok(axios.post.secondCall.args[0].includes(response));

      sinon.restore();
      assert.end();
    });
});

test("response that throws error", function(assert) {
  const urlRoot = chance.string(),
    secret = chance.string(),
    message = chance.string(),
    verifier = new CaptchaVerifier(urlRoot, secret);
  sinon.replace(axios, "post", sinon.fake.rejects(message));

  let result = verifier.check();
  assert.equal(result.constructor, Promise);
  result.catch(failure => {
    assert.equal(failure.constructor, Object);
    assert.equal(failure.statusCode, 500);
    assert.equal(failure.body.constructor, String);
    assert.ok(failure.body.includes(message));

    assert.ok(axios.post.calledOnce);
    assert.ok(axios.post.firstCall.args[0].includes(verifier.urlRoot));
    assert.ok(axios.post.firstCall.args[0].includes(verifier.secret));

    sinon.restore();
    assert.end();
  });
});
