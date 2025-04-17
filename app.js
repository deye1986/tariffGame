let gameTime = 0;

function counter() {
    document.getElementById("game-timer").innerHTML = ++gameTime;
    document.getElementById("start-game-button").disabled = true
}

const chinaId = 2;

let countries = [
  { id: 1, name: 'UK', tarrif: 0 },
  { id: chinaId, name: 'China', tarrif: 0 },
  { id: 3, name: 'EU', tarrif: 0 },
  { id: 4, name: 'Mexico', tarrif: 0 },
  { id: 5, name: 'Latin America', tarrif: 0 },
  { id: 6, name: 'Africa', tarrif: 0 },
  { id: 7, name: 'Canada', tarrif: 0 },
  { id: 8, name: 'Russia', tarrif: 0 },
  { id: 9, name: 'Asia', tarrif: 0 },
  { id: 10, name: 'Australia', tarrif: 0 }
];

const container = document.getElementById('button-container');

const canvas = document.getElementById('viewport'),
context = canvas.getContext('2d');

const image = new Image();

loadImage();

function loadImage() {
  image.src = 'world-map.jpeg';
  image.onload = function(){
    context.drawImage(image, 0, 0, image.width, image.height);
    
  }
}

canvas.addEventListener('click', (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const highlightSize = 50; // Size of the highlighted section

  // Redraw the image
  context.drawImage(image, 0, 0, image.width, image.height);

  // Highlight the clicked section
  context.strokeStyle = 'red';
  context.lineWidth = 5;
  context.strokeRect(x - highlightSize / 2, y - highlightSize / 2, highlightSize, highlightSize);
  console.log('clicked x ', x);
  console.log('clicked y ', y);
});

loadCountryButtons = () => {
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

loadCountryButtons();

addTarrif = (countryId, tarrif) => {
  const country = countries.find(c => c.id == countryId);
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