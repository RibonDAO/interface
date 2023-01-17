<!---
The main structure of this README was taken from:
https://github.com/open-sauced/open-sauced#readme
-->

<div align="center">
  <br>
  <img alt="Ribon Logo" src="https://ribon.io/wp-content/uploads/2021/03/cropped-Ribon-logo-verde.png" width="300px">
  <h1>Ribon DApp</h1>
  <strong>The decentralized giving protocol on the Web 3.0</strong>
</div>
<br>
<p align="center">
  <img src="https://img.shields.io/github/languages/code-size/RibonDAO/interface" alt="GitHub code size in bytes">
  <img src="https://img.shields.io/github/commit-activity/w/RibonDAO/interface" alt="GitHub commit activity">
  <a href="https://github.com/RibonDAO/interface/issues">
    <img src="https://img.shields.io/github/issues/RibonDAO/interface" alt="GitHub issues">
  </a>
  <a href="https://discord.gg/DBcwmDrkpy">
    <img src="https://img.shields.io/discord/341989911450091522.svg?label=&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2" alt="Discord">
  </a>
  <a href="https://twitter.com/RibonDAO">
    <img src="https://img.shields.io/twitter/follow/RibonDAO?label=Follow&style=social" alt="Twitter">
  </a>
</p>

Ribon is a decentralized donation platform that allows donors to become promoters and, by doing so,
encourages others to join them in a global culture of giving. This way it’s possible to increase
donations to charities, promote a culture of giving in the world and make people happier. The
decentralized platform is governed by the community, and this whitepaper is a reader-friendly
description of the Ribon protocol, which is built on Matic/Polygon, a layer 2 in Ethereum.

![ribon-dapp-screencap](https://user-images.githubusercontent.com/24739860/175359784-94a71cb9-fed9-4ad7-bd84-ab43c163a24a.png)

## 📖 Prerequisites

In order to run the project from a local environment we need `node>=16`, `npm>=8` installed on our development machines. We also recommend `yarn>=1.22` to manage dependencies but is optional. The following steps are using the yarn CLI.

**NOTE:** You may need the .env file with some environment variables. You can get it by accessing our [Discord Server](https://discord.gg/DBcwmDrkpy) and requesting it on the #Development channel

## 🖥️ Local development

To clone the repo:

```shell
git clone git@github.com:RibonDAO/interface.git
```

To install the application:

```shell
yarn install
```

Copy the .env.example to a .env file

```shell
cp .env.example .env
```

To start a local copy of the app on port `3000`:

```shell
yarn start
```

## With Dockerfile

- clone this repository: `git clone git@github.com:RibonDAO/interface.git`
- copy the .docker-compose.yml.sample to a .docker-compose.yml file `cp .docker-compose.yml.sample .docker-compose.yml`
- run docker-compose up

Your project will be running on http://localhost:3000/

or if you already have the core-api project on your machine you can use our script to run the whole project:

- clone this repository: `git clone git@github.com:RibonDAO/interface.git`
- clone the core-api repository: `git clone git@github.com:RibonDAO/core-api.git`
- run ./script.sh inside one of the projects
  The app will be running on http://localhost:3000/

### 🧪 Test

For running the test suite, use the following command. Since the tests run in watch mode by default, some users may encounter errors about too many files being open. In this case, it may be beneficial to [install watchman](https://facebook.github.io/watchman/docs/install.html).

```shell
yarn test
```

You can request a coverage report by running the following command:

```shell
yarn testCoverage
```

### 🎨 Code linting

To check the code quality, use the following command:

```shell
yarn lint
```

To check the styles quality, use the following command:

```shell
yarn lint:css
```

### 🚀 Production deployment

A production deployment is a complete build of the project, including the build of the static assets.

```shell
yarn build
```

### 📙 Storybook

Storybook is being leveraged to mock out visual React components. You can start the Storybook Server on http://localhost:6006 by running the following command:

```shell
yarn storybook
```

![storybook-example-screenshot](https://user-images.githubusercontent.com/24739860/175363555-461e4c27-a994-470e-982b-f4c482b6e121.png)

### 💾 Back-End environments

In local development the data comes from the [development API](https://github.com/RibonDAO/core-api) (hosted on AWS). There are still two other environments:

- Staging: [https://ribon-dapp-staging.web.app/?integration_id=1](https://ribon-dapp-staging.web.app/?integration_id=1)
- Production: [https://dapp.ribon.io/?integration_id=1](https://dapp.ribon.io/?integration_id=1)

The staging environment is a production replica, but with a different database. Every time a PR is merged into _main_ this environment is updated with the new code

The production environment is the environment that users are in. Every new merge in main updates this environment

Both environments are hosted on firebase.

## 🤝 Contributing

We encourage you to contribute! Please check out the [Contributing guide](https://ribondao.github.io/docs/) for guidelines about how to proceed.

## 🍕 Community

Got Questions? Join the conversation in our [Discord](https://discord.gg/DBcwmDrkpy).  
Find RibonDAO updates on our [Twitter](https://www.twitter.com/RibonDAO).
