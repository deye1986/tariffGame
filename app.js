let gameTime = 0;

function counter() {
    document.getElementById("game-timer").innerHTML = ++gameTime;
    document.getElementById("start-game-button").disabled = true
}

const chinaId = 2;

let countries = [
  { id: 1, name: 'UK', tarrif: 0 },
  { id: chinaId, name: 'China', tarrif: 0 },
  { id: 3, name: 'EU', tarrif: 0 }
];

const container = document.getElementById('button-container');

loadCountries = () => {
  countries.forEach(country => {
    const button = document.createElement('button');
    button.textContent = country.name + ' ' + country.tarrif; 
    button.addEventListener('click', () => addTarrif(country.id, 10)); 
    container.appendChild(button); 
  });
}

removeCountryButtons = () => {
  const buttons = container.querySelectorAll('button');
  buttons.forEach(button => button.remove());
}

loadCountries();

addTarrif = (countryId, tarrif) => {
  let country = countries.find(c => c.id == countryId);
  country.tarrif = country.tarrif + tarrif;
  countries = countries.map(c => c.id === countryId ? country : c);
  console.log(countries);
  removeCountryButtons();
  loadCountries();
  chinaResponse(country);
}

const chinaResponses = [
  { tarrif: 40, response: 'Oh you better not you god damn America, we will not be bullied!' },
  { tarrif: 60, response: 'Oh no, not cool America, we will sell your bonds if you carry on' },
  { tarrif: 100, response: "We don't care America, you need us more than we need you!"}
];

chinaResponse = (country) => {
  const response = chinaResponses.find(cr => cr.tarrif == country.tarrif);
  if (country.id === chinaId && response) {
    alert(response.response);
  }
}