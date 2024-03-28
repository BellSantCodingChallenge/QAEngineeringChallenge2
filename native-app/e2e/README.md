# Steps for Setting up a Detox Testing Project
1. Install the necessary prerequisites on your macOS machine. Ensure you have macOS High Sierra 10.13 or above, Xcode 10.1 or above, and Homebrew installed.

2. You’ll also need Node 20.11.1 or above and Apple Simulator Utilities.

You can use the following commands to install them:
Run brew update && brew install node to update Homebrew and install Node.
Run brew tap wix/brew && brew install applesimutils to install Apple Simulator Utilities.

3. Install the Detox CLI by running the following command:
Run ```npm install -g detox-cli``` to install the Detox CLI globally.

4. Install the latest EAS CLI
```npm install -g eas-cli```
You can also use the above command to check if a new version of EAS CLI is available. We encourage you to always stay up to date with the latest version.

5. Log in to your Expo account
If you are already signed in to an Expo account using Expo CLI, you can skip the steps described in this section. If you are not, run the following command to log in:

```- eas login```
You can check whether you are logged in by running ```eas whoami```

6. You need to delete projectId from app.json
and run ``eas build:configure`` to generate your own id
For remote run on expo after login run: ```eas build -p ios -e test```

7. For local run you need to run ```detox build --configuration=ios.release```
modify simulator/emulator acording to your macOs/Xcode version in .detoxrc.js under devices for iOS/Android and run test ```detox test --configuration=ios.release```
 

