let gameTime = 0;

function counter() {
    document.getElementById("game-timer").innerHTML = ++gameTime;
    document.getElementById("start-game-button").disabled = true
}

const chinaId = 2;

let countries = [
  { id: 1, name: 'UK', tarrif: 0, 
    imgCords: { x: 475, y: 375, width: 50, height: 50 } },
  { id: chinaId, name: 'China', tarrif: 0, 
    imgCords: { x: 800, y: 450, width: 300, height: 100 } },
  { id: 3, name: 'EU', tarrif: 0, 
    imgCords: { x: 580, y: 350, width: 120, height: 200 } },
  { id: 4, name: 'Mexico', tarrif: 0,
    imgCords: { x: 90, y: 550, width: 120, height: 100 }
   },
  { id: 5, name: 'Latin America', tarrif: 0,
    imgCords: { x: 250, y: 700, width: 200, height: 200 }
   },
  { id: 6, name: 'Africa', tarrif: 0,
    imgCords: { x: 580, y: 600, width: 300, height: 300 }
   },
  { id: 7, name: 'Canada', tarrif: 0,
    imgCords: { x: 100, y: 280, width: 200, height: 250 }
   },
  { id: 8, name: 'Russia', tarrif: 0,
    imgCords: { x: 800, y: 300, width: 300, height: 180 }
   },
  { id: 9, name: 'Asia', tarrif: 0,
    imgCords: { x: 850, y: 580, width: 200, height: 150 }
   },
  { id: 10, name: 'Australia', tarrif: 0,
    imgCords: { x: 970, y: 730, width: 100, height: 100 }
   }
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
    context.fillStyle = 'lightblue';
    const cords = countries.filter(c => c.imgCords != null);
    // Draw country bounds
    cords.forEach(c => {
      const width = c.imgCords.width;
      const height = c.imgCords.height;
      const x = c.imgCords.x;
      const y = c.imgCords.y;

      context.lineWidth = 5;
      context.strokeStyle = 'red';
      context.strokeRect(x - width / 2, y - height / 2, width, height);
    });
  }
}

canvas.addEventListener('click', (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const cords = countries.filter(c => c.imgCords != null);

  cords.forEach(c => {
    const area = c.imgCords;
    console.log('area', area);
    console.log('x ' + x);
    console.log('y ' + y);

  });
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
  loadCountryButtons();
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