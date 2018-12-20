"use strict";

const axios = require("axios"),
  AwsApiResponse = require("./aws-api-response");

module.exports = class CaptchaVerifier {
  constructor(urlRoot, secret) {
    if (!urlRoot || !secret) {
      throw new Error("Must specify url root and secret key when creating CaptchaVerifier");
    }
    this.urlRoot = urlRoot;
    this.secret = secret;
  }
  check(response) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.urlRoot}?secret=${this.secret}&response=${response}`)
        // Axios response object schema: https://github.com/axios/axios
        .then(({ status, data }) => {
          // calling static function within instance: https://stackoverflow.com/a/42463768
          const statusCode = this.constructor.isSuccess(status, data.success) ? 200 : 400;
          resolve(AwsApiResponse.success(statusCode, data));
        })
        .catch(({ response, message }) => {
          const statusCode = response ? response.status : 500;
          reject(AwsApiResponse.error(statusCode, message));
        });
    });
  }

  static isSuccess(statusCode, isSuccess) {
    return statusCode < 400 && isSuccess;
  }
};
