# power-reactors
US commercial nuclear power reactors

[![Web App Build & Release](https://github.com/tudormobile/power-reactors/actions/workflows/web.yml/badge.svg)](https://github.com/tudormobile/power-reactors/actions/workflows/web.yml)


Copyright (C) 2025 Bill Tudor
### Quick Start

```sh
git clone https://github.com/tudormobile/power-reactors.git
cd power-reactors
npm install

npm run dev
```
### Build and Release
- Update the version (major/minor) in *package.json*. 

The build and release values are automatically adjusted when running a build. See the script *prebuild.js* in the *scripts/* folder for details.

- Run the build.
```sh
npm run build
```
The *dist* folder contains the deployable web application. The application is designed to be deployed under a sub-domain named *power-reactors*, e.g., https://www.example.com/power-reactors.

### Feedback
**power-reactos** is released as open source under the MIT license. Bug reports can be submitted at the [the github repository](https://github.com/tudormobile/power-reactors).

