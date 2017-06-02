# NSS Pinterest Clone Project

![Splashpage]()

<hr>

## Summary

In teams our task was to reverse engineer the basic functionality of Pinterest and build your own version of it using AngularJS and Bootstrap.

<hr>

## To Access Necessary Libaries:
 - Pull down project
 - cd into lib
 - Run command "bower install"
 - Run command "npm install"
 - Seed database/seed.json to firebase with read & write permissions
 - Run grunt

<hr>

## Priorities

1. Firebase structure. Flat, flat, flat.
2. Authentication.
3. Create board.
4. Create pin to go on a board.

## Firebase structure

<pre>
 App
  |
  + users
  |---+ -K84hddnjx9v
  |   |--- uid: "github:jruhfiurnvuienciuwdn"
  |   |--- name: "Abraham Ybrimovitz"
  |
  + pins
  |---+ -K84hfurycvb
  |   |--- uid: "github:jruhfiurnvuienciuwdn"
  |   |--- boardid: "-K66hzzzyyyy"
  |   |--- url: "http://www.imgur.com/9rufrniuvnfu2vnefui"
  |   |--- title: "Ha ha, stupid gator"
  |
  + boards
  |---+ -K66hzzzyyyy
  |   |--- uid: "github:jruhfiurnvuienciuwdn"
  |   |--- title: "Stupid animals"
</pre>

## Authentication

### Relevent Firebase docs

+ Determine if the user is logged in with [onAuthStateChanged or currentUser](https://firebase.google.com/docs/auth/web/manage-users#get_the_currently_signed-in_user)
+ Perform an action as soon as user logs in or out with the [onAuthStateChanged event listener](https://firebase.google.com/docs/auth/web/manage-users#get_the_currently_signed-in_user)
+ Allow user to use OAuth to log in via a social service with [signInWithPopup()](https://firebase.google.com/docs/auth/web/github-auth#handle_the_sign-in_flow_with_the_firebase_sdk) (GitHub linked, other OAuth providers are listed in the left sidebar).