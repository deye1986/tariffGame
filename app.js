const gameTimeItem = 'gameTime';
const gt = JSON.parse(localStorage.getItem(gameTimeItem));

const gameTimer = document.getElementById("game-timer");

let globalMarketVolatility = 0;


let gameTime;
if (!gt) {
  gameTime = 0;
} else {
  gameTime = gt;
}

const gameTimerWin = 365;

counter = () => {
  setTimer(++gameTime);
  if (gameTime > gameTimerWin 
    && calculateAllTarrifs() <= 0) { 
      // TODO: Add celeration animations, dialog box, ect.
      alert('You won!');
    }
}

startGame = () => {
  setInterval(counter, 1000);
  document.getElementById("start-game-button").disabled = true;
}

setTimer = (time) => {
  gameTimer.innerHTML = time;
}

initGameTimer = (time) => {
  if (time > 0) {
    startGame();
  }

  setTimer(time);
}

initGameTimer(gameTime);

const countriesDialog = document.getElementById("countries-responses-dialog");

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

const economicStatuses = [
  { min: 0, max: 99, message: 'The economy is all good', backgroundColour: 'green' },
  { min: 100, max: 399, message: "Hey, are you sure you know what you're doing?", backgroundColour: 'orange' },
  { min: 400, max: 9999, message: "Mr Preseident, I thought you knew to never go full retard", backgroundColour: 'red' }
];

const statusMessage = document.getElementById('economic-status-message');
const statusBar = document.getElementById('economic-status-bar');

updateEconomicStatus = (status) => {
  statusMessage.innerText = status.message;
  statusBar.style.backgroundColor = status.backgroundColour;
}

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

calculateAllTarrifs = () => countries.reduce((sum, item) => sum + item.tariff, 0);

updateStatus = () => {
  const allTarrifs = calculateAllTarrifs();

  const status = economicStatuses.find(s => s.min <= allTarrifs
    && s.max >= allTarrifs);

  if (status && status.message != statusMessage.innerText) {
    updateEconomicStatus(status);
  }
}

loadCountries = () => {
  let jsonCountries = JSON.parse(JSON.stringify(defaultCountries));

  const savedCountries = JSON.parse(localStorage.getItem(countryItem));

  countries = jsonCountries;

  if (savedCountries) {
    savedCountries.forEach(country => countries.find(c => c.id == country.id).tariff = country.tariff);
  }

  updateStatus();
}

resetCountryButtons = () => {
  removeCountryButtons();
  loadCountryButtons();
}

resetCountries = () => {
  localStorage.removeItem(countryItem);
  localStorage.removeItem(gameTimeItem);
  loadCountries();
  resetCountryButtons();
  closeResetDialogBox();
  globalMarketVolatility = 0;
}

loadCountries();

const container = document.getElementById('button-container');
const canvas = document.getElementById('viewport'),
context = canvas.getContext('2d');

const image = new Image();

loadImage = () => {
  image.src = 'world-map.svg';
  image.onload = () => context.drawImage(image, 0, 0, image.width, image.height);
}

loadImage();

const tooltip = document.getElementById('tooltip');

calculateXAndY = (event) => {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  const x = (event.clientX - rect.left) * scaleX;
  const y = (event.clientY - rect.top) * scaleY;

  return { x, y };
}

showTooltipMouseOver = event => {
  const mouse = calculateXAndY(event);

  const country = countries.find(
    c => c.imgCords != null
    && mouse.x >= (c.imgCords.x - c.imgCords.width / 2)
    && mouse.x <= (c.imgCords.x + c.imgCords.width / 2)
    && mouse.y >= (c.imgCords.y - c.imgCords.height / 2)
    && mouse.y <= (c.imgCords.y + c.imgCords.height / 2));

    if (country) {
      tooltip.style.display = 'block';
      tooltip.style.left = event.pageX + 'px';
      tooltip.style.top = event.pageY + 'px';
      tooltip.innerHTML = country.name + ' <br/>Tariff: ' + country.tariff;
    } else {
      tooltip.style.display = 'none';
    }
}

canvas.addEventListener('mousemove', showTooltipMouseOver);

addTariffOnClick = event => {
  const mouse = calculateXAndY(event);

  const country = countries.filter(
    c => c.imgCords != null
    && mouse.x >= (c.imgCords.x - c.imgCords.width / 2)
    && mouse.x <= (c.imgCords.x + c.imgCords.width / 2)
    && mouse.y >= (c.imgCords.y - c.imgCords.height / 2)
    && mouse.y <= (c.imgCords.y + c.imgCords.height / 2));

    country.forEach(c => addTariff(c, 10));
    showTooltipMouseOver(event);
}

canvas.addEventListener('click', addTariffOnClick);

loadCountryButtons = () => {
  countries.forEach(country => {
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.textContent = country.name + ' ' + country.tariff;
    button.addEventListener('click', () => addTariff(country, 10)); 
    container.appendChild(button); 
  });
}

removeCountryButtons = () => {
  const buttons = container.querySelectorAll('button');
  buttons.forEach(button => button.remove());
}

loadCountryButtons();

addTariff = (country, tariff) => {
  if (gameTime == 0) {
    startGame();
  }
  country.tariff = country.tariff + tariff;
  globalMarketVolatility = globalMarketVolatility + 1;
  console.log(globalMarketVolatility) // remove dave
  countries = countries.map(c => c.id === country.id ? country : c);
  resetCountryButtons();
  tariffResponse(country);
}

const dialogImg = document.getElementById('dialog-img');

tariffResponse = (country) => {
  const response = country.responses?.find(cr => cr.tariff == country.tariff);
  
  if (response) {
    clearMessageOnTicker();
    countriesDialog.showModal();
    if (country.flagImage) {
      dialogImg.src = country.flagImage;
    } else {
      dialogImg.src = '';
    }
    dialogImg.alt = country.name;
    
    displayMessageOnTicker(response.response);
  }

  updateStatus();
}

closeCountriesDialog = () => {
  countriesDialog.close();
  clearMessageOnTicker();
  dialogImg.src = '';
}

minCountry = (country) => {
  return {
    id: country.id,
    tariff: country.tariff
  }
}

save = () => {
  const data = JSON.stringify(countries.map(minCountry));
  localStorage.setItem(countryItem, data);
  localStorage.setItem(gameTimeItem, gameTime);
}

const resetDialog = document.getElementById('reset-tariff-dialog');

showResetDialogBox = () => {
  resetDialog.showModal();
}

closeResetDialogBox = () => {
  resetDialog.close();
}