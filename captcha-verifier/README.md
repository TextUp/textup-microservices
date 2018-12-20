# TextUp Microservices - Captcha Verifier

Simple tool for verifying [reCAPTCHA](https://developers.google.com/recaptcha) responses

## Versions

* `node v8.14.1` (lts/carbon)
* `npm v6.4.1`
* `yarn v1.10.1`
* `tape v4.9.1`
* `serverless v1.35.1`

## Installation

To set up the environment:

* `brew install yarn --without-node`
* [Install nvm] https://github.com/creationix/nvm#installation
* `nvm use lts/carbon`
* Optional: `nvm alias default lts/carbon`

To set up this project:

* `yarn global add tape@4.9.1`
* `yarn global add serverless@1.35.1`
* `yarn install`

## Running

* `serverless offline --aws-profile <profile-name>`
* Shorthand version `sls offline --aws-profile <profile-name>`

## Testing

* `npm run test`
