"use strict";

module.exports = class AwsApiResponse {
  static success(statusCode, data) {
    return { statusCode, body: JSON.stringify(data) };
  }
  static failure(statusCode, ...messages) {
    return { statusCode, body: JSON.stringify({ messages }) };
  }
};
