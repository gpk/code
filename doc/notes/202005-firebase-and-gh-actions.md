## firebase project setup and deploy

* create project: `gpk-program-world`
* console: https://console.firebase.google.com/project/gpk-program-world/overview
* `firebase login`
* `firebase init`
* `firebase deploy`
* https://gpk-program-world.web.app


## first trivial gh action
* https://gabrieltanner.org/blog/an-introduction-to-github-actions

in `.github/try.yaml` 

```
on:
  push:
    branches:
      - master
      - firebase-and-gh-action-exploration

jobs:
  build:

    runs-on: ubuntu-latest

    steps:
      - name: First step
        run: echo "::debug Hello World"
```

## firebase gh action setup

* https://github.com/marketplace/actions/github-action-for-firebase
* generate firebase token: `firebase login:ci`
* store as a gh project secret named `FIREBASE_TOKEN`



