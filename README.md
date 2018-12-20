# TextUp Microservices

Microservices implemented using [Serverless](https://serverless.com). Click into a specific microservice directory for additional instructions

## Tips

* When using the Serverless CLI, specify `--aws-profile <profile-name>` to apply the correct permissions
    * AWS CLI profiles are stored in `~/.aws/credentials`
    * Currently, the IAM user designed for use with Serverless is `sls`
    * Currently, Serverless [does not have a complete list of IAM permissions required](https://serverless.com/framework/docs/providers/aws/guide/credentials/)
* As [recommended by Serverless, environment variables stored in AWS Parameter Store](https://serverless.com/blog/serverless-secrets-api-keys/) (within AWS Systems Manager)
* Currently, we use [IAM to manage externally-issued SSL certificates](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_server-certs.html)
    * AWS ACM is the recommended certificate manager so IAM-managed certificates can only be accessed via the AWS CLI (no console access)
    * Note that our IAM-managed certificates have paths prefixed with `/cloudfront` in order to be [usable with Cloudfront as required in the docs](https://aws.amazon.com/premiumsupport/knowledge-center/custom-ssl-certificate-cloudfront/)
    * **Because Serverless uses CloudFormation to deploy, only ACM-managed certificates are supported**
* [AWS Lambda execution context is reused for a period of time](https://docs.aws.amazon.com/lambda/latest/dg/running-lambda-code.html), so keep expensive initializations outside of the export body

## Helpful links

* [AWS lambda configuration limits](https://docs.aws.amazon.com/lambda/latest/dg/limits.html)
* [AWS API Gateway lambda vs lambda proxy integration](https://medium.com/@lakshmanLD/lambda-proxy-vs-lambda-integration-in-aws-api-gateway-3a9397af0e6d)
    * [AWS API Gateway event object passed via lambda proxy integration](https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format)
    * [AWS API Gateway lambda proxy integration required response format](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-lambda.html)
    * [Examples of all lambda events](https://docs.aws.amazon.com/lambda/latest/dg/eventsources.html)
* [Overview of Serverless](https://hackernoon.com/a-crash-course-on-serverless-with-node-js-632b37d58b44)
* [Axios request library documentation](https://github.com/axios/axios)
* [Intro to ES2015 classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
* [`serverless-api-cloudfront` documentation](https://github.com/Droplr/serverless-api-cloudfront)
* [Serverless testing guide](https://serverless.com/framework/docs/providers/aws/guide/testing/)
* [Serverless AWS Lambda CLI reference](https://serverless.com/framework/docs/providers/aws/cli-reference/)
