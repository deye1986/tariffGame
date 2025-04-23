let gameTime = 0;

counter = () => {
    document.getElementById("game-timer").innerHTML = ++gameTime;
    document.getElementById("start-game-button").disabled = true;
}

const dialog = document.querySelector("dialog");

const typingSpeed = 50;
let messageQueue = [];
let isDisplaying = false;

function displayMessageOnTicker(outputMessage) {
  messageQueue.push(outputMessage);
  if (!isDisplaying) {
    processQueue();
  }
}

const ticker = document.getElementById("game-ticker");

processQueue = () => {
  if (messageQueue.length === 0) {
    isDisplaying = false;
    return;
  }

  isDisplaying = true;
  let i = 0;
  const outputMessage = messageQueue.shift();

  showCharacter = () => {
    if (i < outputMessage.length && isDisplaying) {
      ticker.innerHTML += outputMessage.charAt(i);
      i++;
      setTimeout(showCharacter, typingSpeed);
    } else {
      setTimeout(() => {
        messageQueue = messageQueue.filter(m => m != outputMessage);
        isDisplaying = false;
        processQueue();
      }, typingSpeed);
    }
  }

  showCharacter();
}

clearMessageOnTicker = () => {
  messageQueue = [];
  isDisplaying = false;
  ticker.innerHTML = '';
}

const countryItem = 'countries';
const chinaId = 2;

let countries = JSON.parse(localStorage.getItem(countryItem)) ?? [
  { 
    id: 1, 
    name: 'UK', 
    tariff: 0, 
    imgCords: { x: 475, y: 375, width: 50, height: 50 },
    responses: [
      { tariff: 40, response: 'Blimey!' },
      { tariff: 50, response: 'My goodness, the special relationship has been shattered!' },
      { tariff: 80, response: 'Britain will no longer export to the USA and seeks a willing nation with lower tariffs to handle its imports' }
    ],
    flagImage: '',
    cashReserves: 0,
    marketVolatility: 0.05 
  },
  { id: chinaId, name: 'China', tariff: 0, 
    imgCords: { x: 800, y: 450, width: 300, height: 100 },
    responses: [
      { tariff: 40, response: 'Oh you better not you god damn America, we will not be bullied!' },
      { tariff: 60, response: 'Oh no, not cool America, we will sell your bonds if you carry on' },
      { tariff: 100, response: "We don't care America, you need us more than we need you!" },
      { tariff: 120, response: "We are now applying a tarrif back on you for the same rate America!" }
    ],
    flagImage: 'flags/flagImageChina.png',
    cashReserves: 0,
    marketVolatility: 0.05
  },    
  { id: 3, name: 'EU', tariff: 0, 
    imgCords: { x: 580, y: 350, width: 120, height: 200 },
    responses: [
      { tariff: 30, response: "Don't be stupid America! We will need you to calm down before the next meeting" },
      { tariff: 60, response: 'We will replace what we buy off you from China if you carry on America' }
    ]
  },
  { id: 4, name: 'Mexico', tariff: 0,
    imgCords: { x: 90, y: 550, width: 120, height: 100 },
    responses: [
      { tariff: 20, response: "Hey gringo, don't be like that. You know we have a special relationship" }
    ]
  },
  { id: 5, name: 'Latin America', tariff: 0,
    imgCords: { x: 250, y: 700, width: 200, height: 200 },
    responses: [
      { tariff: 20, response: 'Well this is no surprise at all' },
      { tariff: 40, response: 'Oh we are so through with this, we arent giving you any Canals, stop trying to bully us' }
    ]
  },
  { id: 6, name: 'Africa', tariff: 0,
    imgCords: { x: 580, y: 600, width: 300, height: 300 }
  },
  { id: 7, name: 'Canada', tariff: 0,
    imgCords: { x: 100, y: 280, width: 200, height: 250 }
  },
  { id: 8, name: 'Russia', tariff: 0,
    imgCords: { x: 800, y: 300, width: 300, height: 180 }
  },
  { id: 9, name: 'Asia', tariff: 0,
    imgCords: { x: 850, y: 580, width: 200, height: 150 }
  },
  { id: 10, name: 'Australia', tariff: 0,
    imgCords: { x: 970, y: 730, width: 100, height: 100 }
  }
];

const container = document.getElementById('button-container');
const canvas = document.getElementById('viewport'),
context = canvas.getContext('2d');

const image = new Image();

drawBoundsOnImage = () => {
  context.drawImage(image, 0, 0, image.width, image.height);

  const cords = countries.filter(c => c.imgCords != null);

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

loadImage = () => {
  image.src = 'world-map.svg';
  image.onload = () => drawBoundsOnImage();
}

loadImage();

addtariffOnClick = event => {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  const x = (event.clientX - rect.left) * scaleX;
  const y = (event.clientY - rect.top) * scaleY;

  const country = countries.filter(
    c => c.imgCords != null
    && x >= (c.imgCords.x - c.imgCords.width / 2)
    && x <= (c.imgCords.x + c.imgCords.width / 2)
    && y >= (c.imgCords.y - c.imgCords.height / 2)
    && y <= (c.imgCords.y + c.imgCords.height / 2));

    country.forEach(c => addtariff(c, 10));
}

canvas.addEventListener('click', addtariffOnClick);

loadCountryButtons = () => {
  countries.forEach(country => {
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.textContent = country.name + ' ' + country.tariff;
    button.addEventListener('click', () => addtariff(country, 10)); 
    container.appendChild(button); 
  });
}

removeCountryButtons = () => {
  const buttons = container.querySelectorAll('button');
  buttons.forEach(button => button.remove());
}

loadCountryButtons();

addtariff = (country, tariff) => {
  country.tariff = country.tariff + tariff;
  countries = countries.map(c => c.id === country.id ? country : c);
  removeCountryButtons();
  loadCountryButtons();
  tariffResponse(country);
}

tariffResponse = (country) => {
  const response = country.responses?.find(cr => cr.tariff == country.tariff);
  if (response) {
    clearMessageOnTicker();
    dialog.showModal();
    displayMessageOnTicker(response.response);
  }
}

document.getElementById("dialog-close").addEventListener("click", () => {
  dialog.close();
  clearMessageOnTicker();
});

save = () => {
  const data = JSON.stringify(countries);
  localStorage.setItem(countryItem, data);
}