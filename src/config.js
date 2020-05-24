import firebase from "firebase/app"

export const appName = "advanced-react-23154"

export const firebaseConfig = {
	apiKey: "AIzaSyBCDELiOI2eRaxkca3RQxXoVRb4A0vD65E",
	authDomain: `${appName}.firebaseapp.com`,
	databaseURL: `https://${appName}.firebaseio.com`,
	projectId: appName,
	storageBucket: `${appName}.appspot.com`,
	messagingSenderId: "225862112917",
	appId: "1:225862112917:web:acb3f784ca115a2b4dad9c",
}

firebase.initializeApp(firebaseConfig)
