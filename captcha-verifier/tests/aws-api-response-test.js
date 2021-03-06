const test = require("tape"),
  chance = require("chance").Chance(),
  AwsApiResponse = require("../helpers/aws-api-response");

test("generating success", function(assert) {
  const code = chance.string(),
    data = chance.n(chance.string, 5);

  let result = AwsApiResponse.success(code, data);
  assert.equal(result.statusCode, code);
  assert.equal(result.body.constructor, String, "body is always a string");
  assert.equal(result.body, JSON.stringify(data));
  assert.ok(Object.keys(result.headers).includes("Access-Control-Allow-Origin"))
  assert.ok(Object.keys(result.headers).includes("Access-Control-Allow-Credentials"))

  assert.end();
});

test("generating failure", function(assert) {
  const code = chance.string(),
    messages = chance.n(chance.string, 5);

  let result = AwsApiResponse.failure(code);
  assert.equal(result.statusCode, code);
  assert.equal(result.body.constructor, String);
  assert.equal(result.body, JSON.stringify({ messages: [] }));
  assert.ok(Object.keys(result.headers).includes("Access-Control-Allow-Origin"))
  assert.ok(Object.keys(result.headers).includes("Access-Control-Allow-Credentials"))

  result = AwsApiResponse.failure(code, messages[0]);
  assert.equal(result.statusCode, code);
  assert.equal(result.body.constructor, String);
  assert.equal(result.body, JSON.stringify({ messages: [messages[0]] }));
  assert.ok(Object.keys(result.headers).includes("Access-Control-Allow-Origin"))
  assert.ok(Object.keys(result.headers).includes("Access-Control-Allow-Credentials"))

  result = AwsApiResponse.failure(code, ...messages);
  assert.equal(result.statusCode, code);
  assert.equal(result.body.constructor, String);
  assert.equal(result.body, JSON.stringify({ messages: messages }));
  assert.ok(Object.keys(result.headers).includes("Access-Control-Allow-Origin"))
  assert.ok(Object.keys(result.headers).includes("Access-Control-Allow-Credentials"))

  assert.end();
});
