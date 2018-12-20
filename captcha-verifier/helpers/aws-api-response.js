"use strict";

module.exports = class AwsApiResponse {
  static success(statusCode, data) {
    return { statusCode, body: JSON.stringify(data) };
  }
  static error(statusCode, ...messages) {
    return { statusCode, body: JSON.stringify({ messages }) };
  }
};
