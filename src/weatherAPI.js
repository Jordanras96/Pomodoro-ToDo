export function weatherAPI() {
  async function getCoordinates() {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      return {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
    } catch (error) {
      // En cas d'erreur de géolocalisation, utilisez les coordonnées d'Antsirabe par défaut
      return { latitude: -19.8655, longitude: 47.0337 }; // Coordonnées d'Antsirabe
    }
  }

  async function getWeatherData(latitude, longitude) {
    const apiKey = "a582a7f8edmsh4dc9df2e9f618abp16644bjsn214cfaf74551";
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${latitude},${longitude}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Erreur données météo.");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async function fetchWeatherConditions() {
    const conditionURL = "https://www.weatherapi.com/docs/conditions.json";

    try {
      const response = await fetch(conditionURL);
      if (!response.ok) {
        throw new Error("Erreur liste conditions météo");
      }
      const conditionData = await response.json();
      return conditionData;
    } catch (error) {
      throw error;
    }
  }
  function getWeatherDescription(conditionCode, isDay, conditionsData) {
    const condition = conditionsData.find(
      (item) => item.code === conditionCode,
    );
    if (condition) {
      const lang = "fr"; // Vous pouvez changer la langue selon vos besoins
      const langInfo = condition.languages.find(
        (item) => item.lang_iso === lang,
      );
      if (langInfo) {
        return isDay ? langInfo.day_text : langInfo.night_text;
      }
    }
    return "Inconnu";
  }

  // Fonction pour obtenir le numéro d'icône en fonction du code de condition météorologique
  async function getWeatherIconCode(conditionCode) {
    const conditionsData = await fetchWeatherConditions();
    const condition = conditionsData.find(
      (item) => item.code === conditionCode,
    );
    if (condition && condition.icon) {
      return condition.icon;
    } else {
      return null; // Aucun numéro d'icône trouvé pour le code de condition donné
    }
  }
  async function displayWeatherInfo() {
    const weatherInfoDiv = document.getElementById("weather-info");
    const weatherIconDiv = document.getElementById("weather-icon");
    try {
      const coordinates = await getCoordinates();
      const weatherData = await getWeatherData(
        coordinates.latitude,
        coordinates.longitude,
      );

      const conditionCode = weatherData.current.condition.code;
      const temperature = weatherData.current.temp_c;
      const isDay = weatherData.current.is_day;

      const conditionsData = await fetchWeatherConditions();
      const weatherDescription = getWeatherDescription(
        conditionCode,
        isDay,
        conditionsData,
      );
      // Obtenir le numéro d'icône en fonction du code de condition météorologique
      const iconCode = await getWeatherIconCode(conditionCode);

      if (iconCode !== null) {
        // Créer une balise <img> pour afficher l'icône en utilisant le numéro d'icône
        const weatherIcon = document.createElement("img");
        weatherIcon.src = `public/weatherIcons/${iconCode}.png`;
        weatherIcon.alt = conditionCode; // Utiliser le code de condition comme texte alternatif
        weatherIcon.className = "z-1 flex justify-center";

        // Afficher la description météorologique et la température
        weatherInfoDiv.innerHTML = `${weatherDescription}<br> ${temperature} °C`;

        // Afficher l'icône météorologique
        weatherIconDiv.innerHTML = "";
        weatherIconDiv.appendChild(weatherIcon);
      } else {
        weatherInfoDiv.innerHTML =
          "Aucune icône météorologique disponible pour ce code de condition.";
      }
    } catch (error) {
      weatherInfoDiv.innerHTML =
        "Impossible de récupérer les données météorologiques.";
      console.error(error);
    }
  }

  // Appel de la fonction pour afficher les données météorologiques
  displayWeatherInfo();
}
