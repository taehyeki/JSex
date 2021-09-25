const APIKEY = '8dd38fc4352b0bd4bcdd14c050c86a6f';

function geoOk(pos){
  const lat = pos.coords.latitude;
  const lng = pos.coords.longitude;
  console.log('you live in ', lat, lng);
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${APIKEY}`;
  fetch(url).
    then( present => present.json()).
    then( data =>{
      const city = document.querySelector('#weather span:first-child');
      const weather = document.querySelector('#weather span:last-child');
      weather.innerHTML = data.weather[0].main;
      city.innerHTML = data.name;
      })
  
};
function geoErr(){
  console.log('cant find where you are')
};



navigator.geolocation.getCurrentPosition(geoOk,geoErr);