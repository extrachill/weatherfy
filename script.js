"use strict";

const container = document.querySelector(".container");
const weatherCur = document.querySelector(".weather-cur");
const weatherBtn = document.querySelector(".weather-btn");

class App {
  #key = "83fc802960481c0a32cd0833d8df12e8";

  constructor() {
    weatherCur.addEventListener("click", this.getLocation.bind(this));
  }

  // Get Current location coordinates
  getLocation() {
    let lat, lon; // if here I give them some values then it will work
    // let lat = 20;
    // let lon = 10;

    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };
      navigator.geolocation.getCurrentPosition(
        // because this is function call, this keyword is set to undefined. But if we use arrow function then this will be used of the scope which is method
        (position) => {
          lat = position.coords.latitude;
          lon = position.coords.longitude;

          console.log(lat, lon); // shows corret lat and lon
        },
        function () {
          alert("Could not get your location, please try again!");
          new Error("🚨🚨🚨 Could not get your location!");
          return;
        },
        options
      );
    }
    this.apiCallLocationReverse(lat, lon);
  }

  // Call API Reverse with lat,lon
  async apiCallLocationReverse(lat, lon) {
    const limit = 5;
    const res = await fetch(
      `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${
        this.#key
      }` // lat lon are undefined
    );
    const data = await res.json();
    console.log(data);
  }

  // Call API with name
  async apiCallDirect() {}

  // Render HTML markup
  renderMarkup() {}
}

const app = new App();
