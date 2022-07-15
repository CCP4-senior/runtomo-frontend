# Runtomo
Welcome to our app Runtomo! This is the frontend repository.

**Main Repo:** https://github.com/CCP4-senior/.github/tree/main/profile

**Demo Video:** https://www.youtube.com/watch?v=ijyDfnP7na8
# How to Use Runtomo

* Launch the Runtomo app
* Register for a free account
* Complete the registration requirements
The application has three main sections:
* Discover Page - you can check what running events are available in the Tokyo area
* Create Event - you can create your own running event and meetup with fellow runners
* My Sessions Page - you can check what running events you have joined and/or created
At the top of the page, you will find two icons
* Left Navigation Icon (Settings) - you can check your profile and modify information as needed. Additionally, you are able to sign out and delete your account from this
* Right Navigation Icon (Points of Interest) - you running stations in the Tokyo area. These stations have the following amenities available: showers, coin lockers, parking, water stations.
# Main Features
* Users can create running events
* Users can modify or delete the running events created
* Users can join running events listed in the Discover page
* Users can post messages in the running events message board
* Users can update their profile information
* Users can check running stations in Tokyo to better set up their running routes
* Users can upload images for their events as well as their profile
# For Developers
**Prerequisites**
**React Native with Expo CLI**
First, you must install Expo CLI. You can find their guide here:
[Expo CLI Installation Guide](https://docs.expo.dev/get-started/installation/)

If you can get a simple "Hello world" app to launch with Expo CLI, you're good to go.
**iOS Simulator**
Our app is currently designed for iOS. There are two ways to test the functionality with a simulator.

*Method 1:* Expo Go on a Mobile Device
* Start by installing Expo Go on your device such as an iPhone. This is the easier method of the two.

*Method 2:* Install XCode on Your Computer
* To run the simulator locally on your machine, you must install XCode from the App Store.

⚠️ XCode can take several hours to download and install, despite having a fast internet connection. This is why using Expo Go on your mobile device is the recommended way to test the app quickly.
# Installation
Create a local copy by cloning this repository
```
git clone git@github.com:CCP4-senior/runtomo-frontend.git
```
Install the required packages:
```
npm install
```
**Configure Environmental Variables**
In order to use Google Maps and Firebase (for images), create an account with both services and obtain the API keys.
Then:
* Open the .env.example file
* Paste your API keys in the correct fields
* Rename .env.example to .env
Run this command after creating the .env, it will clear the cache:
```
expo r -c
```
# Launching the App
To start the app, run:
```
npm start
```
You will then see a QR can in the terminal. Scan the QR code with your mobile device (ex: iPhone 12). It will then launch the App via Expo Go.
Alternatively, you can test the application locally on your computer by pressing i in the terminal. This will launch the iOS simulator.
You can also press r to reload the app.
# Tech Stack
We used the following technologies in the frontend:
* React Native
* React Native Paper
* React Navigation
* Explo: for deployment
* Google Maps
* Firebase: for photo storage

# Thanks for visiting, feel free to reach out to us!
