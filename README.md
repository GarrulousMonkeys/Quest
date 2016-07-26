# 2016-06-greenfield

## What is Quest?
Quest is an app to help you discover points of interest around you.

## Team
1. Chris Walker
2. Jeff Korcal
3. Julius Buckley
4. Michelle Nguyen

## Setup
### Requirements for iOS
Xcode is needed for running this app on iOS
### Starting React Native
  - Quest can be started in Xcode by pressing the play button
  - Quest can also be started through the command line by running npm start.  In a new tab run react-native run-ios to open up Simulator.

### Firebase
  - A firebase project is needed to add credentials into an environment file

## Deployment
Quest is deployed using Bitrise, a continuous delivery service.
- Before setting up Bitrise, Apple certificates and UUID's must be created for each team member. 
- Apple has extensive documentation at https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/AppStoreDistributionTutorial/CreatingYourTeamProvisioningProfile/CreatingYourTeamProvisioningProfile.html
- After Apple certificatse and UUID's are set up a custom workflow must be generated

## Database
The database is hosted on Firebase, which can be accessed with the API key.
- Firebase has extensive API documentation at: https://firebase.google.com/docs/reference/js/

### Authentication
Authentication is hosted on firebase
- Firebase has extensive API documentation at: https://firebase.google.com/docs/reference/js/

## Quest Features
- Users can use Quest to drop artifacts wherever they go. Artifacts are images or messages that are tracked by geolocation.
- Images can be taken within the app or chosen from the user's camera roll.
- A user will be able to view their past artifacts in their user profile, and discover nearby artifacts using the map or list view.

## Things to Note
- Currently, images are being stored as base64 strings in a property on our Artifact objects in Firebase. An npm module called react-native-asset-library-to-base64 takes the path to our photo and encodes it before sending it to the database. This has the advantage of not needing a separate storage database for image files, but has the disadvantage of potentially encoding images as very large (10s to 100s of thousands of characters) strings, which can take a long time for the client to download. 
