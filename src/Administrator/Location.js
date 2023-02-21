import React from "react";
import { useEffect } from "react";
import { google } from "google-maps";
import { getDatabase, ref, onValue } from "firebase/database";

const initMap = () => {
  const map = new window.google.maps.Map(document.getElementById("maps"), {
    center: { lat: 37.7749, lng: -122.4194 },
    zoom: 8,
  });
};
const db = getDatabase();
const Location = () => {
  useEffect(() => {
    var workers = [];
    const starCountRefU = ref(db, "users/");

    onValue(starCountRefU, (snapshot) => {
      snapshot.forEach((element) => {
        workers.push(element.val());
      });
    });
    console.log(workers);
    console.log(workers[workers.length]);
  }, []);

  const googleAPIkey = "AIzaSyBk-m6q2o1dKuggqoNxjoKZHmXeMSHhjsA";
  const googleAPIkey2 = "AIzaSyBkm6q2o1dKuggqoNxjoKZHmXeMSHhjsA";

  function findClosestSecondaryAddress(primaryAddress, secondaryAddresses) {
    // Geocode primary address using Google Maps API
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: primaryAddress }, (results, status) => {
      if (status !== "OK") {
        console.error(`Geocode failed with status ${status}`);
        return;
      }

      const primaryLocation = results[0].geometry.location;

      // Geocode secondary addresses using Google Maps API
      const secondaryLocations = [];
      for (const secondaryAddress of secondaryAddresses) {
        geocoder.geocode({ address: secondaryAddress }, (results, status) => {
          if (status === "OK") {
            secondaryLocations.push(results[0].geometry.location);
          } else {
            console.error(
              `Geocode failed with status ${status} for address ${secondaryAddress}`
            );
          }
        });
      }

      // Wait for all geocoding requests to finish before calculating distances
      Promise.allSettled(secondaryLocations).then((results) => {
        const distances = [];
        for (const result of results) {
          if (result.status === "fulfilled") {
            const secondaryLocation = result.value;
            const distance =
              google.maps.geometry.spherical.computeDistanceBetween(
                primaryLocation,
                secondaryLocation
              );
            distances.push({
              address: secondaryAddresses[distances.length],
              distance,
            });
          }
        }

        // Sort distances by distance and return closest address
        distances.sort((a, b) => a.distance - b.distance);
        if (distances.length > 0) {
          console.log(
            `The closest secondary address to ${primaryAddress} is ${distances[0].address} (${distances[0].distance} meters away)`
          );
        } else {
          console.log(`No secondary addresses found`);
        }
      });
    });
  }

  function findNigerianState(str) {
    const states = [
      { name: "Abia", capital: "Umuahia" },
      { name: "Adamawa", capital: "Yola" },
      { name: "Akwa Ibom", capital: "Uyo" },
      { name: "Anambra", capital: "Awka" },
      { name: "Bauchi", capital: "Bauchi" },
      { name: "Bayelsa", capital: "Yenagoa" },
      { name: "Benue", capital: "Makurdi" },
      { name: "Borno", capital: "Maiduguri" },
      { name: "Cross River", capital: "Calabar" },
      { name: "Delta", capital: "Asaba" },
      { name: "Ebonyi", capital: "Abakaliki" },
      { name: "Edo", capital: "Benin" },
      { name: "Ekiti", capital: "AdovEkiti" },
      { name: "Enugu", capital: "Enugu" },
      { name: "Gombe", capital: "Gombe" },
      { name: "Imo", capital: "Owerri" },
      { name: "Jigawa", capital: "Dutse" },
      { name: "Kaduna", capital: "Kaduna" },
      { name: "Kano", capital: "Kano" },
      { name: "Katsina", capital: "Katsina" },
      { name: "Kebbi", capital: "Birnin Kebbi" },
      { name: "Kogi", capital: "Lokoja" },
      { name: "Kwara", capital: "Ilorin" },
      { name: "Lagos", capital: "Ikeja" },
      { name: "Nasarawa", capital: "Lafia" },
      { name: "Niger", capital: "Minna" },
      { name: "Ogun", capital: "Abeokuta" },
      { name: "Ondo", capital: "Akure" },
      { name: "Osun", capital: "Osogbo" },
      { name: "Oyo", capital: "Ibadan" },
      { name: "Plateau", capital: "Jos" },
      { name: "Rivers", capital: "Port Harcourt" },
      { name: "Sokoto", capital: "Sokoto" },
      { name: "Taraba", capital: "Jalingo" },
      { name: "Yobe", capital: "Damaturu" },
      { name: "Zamfara", capital: "Gusau" },
    ];

    let foundState = null;

    // check if the string contains any state names or capitals
    for (let i = 0; i < states.length; i++) {
      if (
        str.toUpperCase().includes(states[i].name.toUpperCase()) ||
        str.toUpperCase().includes(states[i].capital.toUpperCase())
      ) {
        foundState = states[i].name;
        return foundState;
      }
    }

    console.log(foundState);
  }
  return (
    <div>
      <div onLoad={initMap}>
        <h1 style={{ textAlign: "center" }}>Location</h1>
        <p style={{ textAlign: "center" }}>
          <input className="addressin"></input>
          <br></br>
          <button
            onClick={() => {
              var primaryAddress = document.querySelector(".addressin").value;
              const stateName = findNigerianState(`${primaryAddress}`);
              console.log(stateName);
            }}
            style={{ textAlign: "center" }}>
            find closest maid
          </button>
        </p>

        <div id="maps"></div>
      </div>
    </div>
  );
};

export default Location;
