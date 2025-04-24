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

let countries;

loadCountries();

async function loadCountries() {
  let jsonCountries = JSON.parse(localStorage.getItem(countryItem));
  if (!jsonCountries) {
    jsonCountries = defaultCountries;
  }
  
  countries = jsonCountries;
}

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

const dialogImg = document.getElementById('dialog-img');

tariffResponse = (country) => {
  const response = country.responses?.find(cr => cr.tariff == country.tariff);
  
  if (response) {
    clearMessageOnTicker();
    dialog.showModal();
    if (country.flagImage) {
      dialogImg.src = country.flagImage;
    }
    
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