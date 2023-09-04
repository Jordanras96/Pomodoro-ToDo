export function weatherAPI() {
  async function getCoordinates() {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      return { latitude: position.coords.latitude, longitude: position.coords.longitude };
    } catch (error) {
      // En cas d'erreur de géolocalisation, utilisez les coordonnées d'Antsirabe par défaut
      return { latitude: -19.8655, longitude: 47.0337 }; // Coordonnées d'Antsirabe
    }
  }

  async function getWeatherData(latitude, longitude) {
    const apiKey = 'a582a7f8edmsh4dc9df2e9f618abp16644bjsn214cfaf74551';
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${latitude},${longitude}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Impossible de récupérer les données météorologiques.');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

 
  async function displayWeatherInfo() {
    const weatherInfoDiv = document.getElementById("weather");

    try {
      const coordinates = await getCoordinates();
      const weatherData = await getWeatherData(coordinates.latitude, coordinates.longitude);

      const description = weatherData.current.condition.text;
      const temperature = weatherData.current.temp_c;

      const weatherInfoString = `Description météorologique : ${description}<br>Température : ${temperature} °C`;

      weatherInfoDiv.innerHTML = weatherInfoString;
    } catch (error) {
      weatherInfoDiv.innerHTML = "Impossible de récupérer les données météorologiques.";
      console.error(error);
    }
  }

  // Appel de la fonction principale pour afficher les données météorologiques
  displayWeatherInfo();
}