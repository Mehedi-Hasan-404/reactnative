Streampilot - React Native app (source)
======================================

This is a ready-to-upload React Native project folder for "Streampilot".
It's a minimal template with Android (Java) module included so GitHub Actions
can build a debug APK. You may still need to run `npm install` before building.

How to use:
1. Unzip and open in Termux or on your PC.
2. Run: npm install
3. To build locally (requires Android SDK on your machine):
   cd android
   ./gradlew assembleDebug
4. Or push to GitHub and use the provided workflow (.github/workflows/build.yml) to build.

NOTE: gradle-wrapper.jar is not included in this archive. CI runners will download Gradle automatically.
