"use strict";

// Serverless testing guide: https://serverless.com/framework/docs/providers/aws/guide/testing/

const CaptchaVerifier = require("./helpers/captcha-verifier"),
  AwsApiResponse = require("./helpers/aws-api-response"),
  url = process.env["TEXTUP_MICROSERVICE_RECAPTCHA_URL"],
  secret = process.env["TEXTUP_MICROSERVICE_RECAPTCHA_SECRET_KEY"],
  verifier = new CaptchaVerifier(url, secret);

module.exports.verifyCaptcha = ({ body }, context, callback) => {
  // AWS API Gateway body is always a string -- have to manually parse JSON
  const bodyObj = body && JSON.parse(body);
  if (bodyObj && bodyObj.key) {
    verifier
      .check(bodyObj.key)
      .then(success => callback(null, success), error => callback(null, error));
  } else {
    callback(null, AwsApiResponse.error(422, "Missing required input data. Must specify `key`."));
  }
};
