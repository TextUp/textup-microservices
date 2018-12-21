"use strict";

const CORS_HEADERS = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": false
  }
};

module.exports = class AwsApiResponse {
  static success(statusCode, data) {
    return { statusCode, body: JSON.stringify(data), ...CORS_HEADERS };
  }
  static failure(statusCode, ...messages) {
    return { statusCode, body: JSON.stringify({ messages }), ...CORS_HEADERS };
  }
};
