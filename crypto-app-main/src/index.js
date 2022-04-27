import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./app/store";
import "antd/dist/antd.css";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQI0iqSOkGmtL4K7lVdC0gy076wpPAN8Q",
  authDomain: "cryptoorder-bot.firebaseapp.com",
  databaseURL: "https://cryptoorder-bot-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "cryptoorder-bot",
  storageBucket: "cryptoorder-bot.appspot.com",
  messagingSenderId: "901831630204",
  appId: "1:901831630204:web:8eecfd0bcd0aade27dd8f9",
  measurementId: "G-2KGPMZMDH0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);
