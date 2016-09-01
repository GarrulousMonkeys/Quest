# Quest

## What is Quest?
 > A social platform for sharing geotagged photos and messages

![Quest Demo](./App/Assets/quest-demo.gif)

## Team
1. Chris Walker
2. Jeff Korcal
3. Julius Buckley
4. Michelle Nguyen

## Setup
### Requirements for iOS
Xcode is needed for running this app on iOS
### Starting React Native
  - Run npm install
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
