const gameTimeItem = 'gameTime';
const gt = JSON.parse(localStorage.getItem(gameTimeItem));

const gameTimer = document.getElementById("game-timer");

let state = {
  gameTime: 0,
  countries: []
};

if (!gt) {
  state.gameTime = 0;
} else {
  state.gameTime = gt;
}

// Set game time required to 'Win'
const gameTimerWin = 365;
const particles = document.getElementById('particles');
let timerInterval;
const winningDialog = document.getElementById('winning-dialog');

counter = () => {
  setTimer(++state.gameTime);
  if (state.gameTime > gameTimerWin 
    && calculateAllTarrifs() <= 0) { 
      // TODO: Add celeration animations
      particles.style.display = 'block';
      winningDialog.showModal();
    }
}

endParticles = () => {
  particles.style.display = 'none';
}

const startGameBtn = document.getElementById("start-game-button");

startGame = () => {
  timerInterval = setInterval(counter, 1000);
  startGameBtn.disabled = true;
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

initGameTimer(state.gameTime);

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
  { min: 100, max: 249, message: "Hey, are you sure you know what you're doing?", backgroundColour: 'yellow' },
  { min: 250, max: 399, message: "US trade court blocks Trump's sweeping tariffs.", backgroundColour: 'orange'},
  { min: 400, max: 9999, message: "The worlds economy is experiencing finacial crisis", backgroundColour: 'red' }
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

calculateAllTarrifs = () => state.countries.reduce((sum, item) => sum + item.tariff, 0);

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

  state.countries = jsonCountries;

  if (savedCountries) {
    savedCountries.forEach(country => state.countries.find(c => c.id == country.id).tariff = country.tariff);
  }

  updateStatus();
}

resetCountryButtons = () => {
  removeCountryButtons();
  loadCountryButtons();
}

save = () => {
  const data = JSON.stringify(state.countries.map(minCountry));
  localStorage.setItem(countryItem, data);
  localStorage.setItem(gameTimeItem, state.gameTime);
}

resetCountries = () => {
  localStorage.removeItem(countryItem);
  //localStorage.removeItem(gameTimeItem);
  loadCountries();
  resetCountryButtons();
  closeResetDialogBox();
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

countryFilter = (c, mouse) =>  c.imgCords != null
    && mouse.x >= (c.imgCords.x - c.imgCords.width / 2)
    && mouse.x <= (c.imgCords.x + c.imgCords.width / 2)
    && mouse.y >= (c.imgCords.y - c.imgCords.height / 2)
    && mouse.y <= (c.imgCords.y + c.imgCords.height / 2);

showTooltipMouseOver = event => {
  const mouse = calculateXAndY(event);
  const country = state.countries.find(c => countryFilter(c, mouse));

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
  const country = state.countries.filter(c => countryFilter(c, mouse));
  country.forEach(c => addTariff(c, 10));
  showTooltipMouseOver(event);
}

canvas.addEventListener('click', addTariffOnClick);

loadCountryButtons = () => {
  state.countries.forEach(country => {
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute("role", "Increment the selected country's tariff by Ten.");
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

genericGameEventMessages = (country) => {
  if ((country.id === 2 && country.tariff >= 50), (country.id === 4 && country.tariff >= 50), (country.id === 8 && country.tariff >= 50)) {  
    tariffResponse(auxillaryResponses, auxillaryResponses.responses[1]);
  }
  if (country.id === 7 && country.tariff === 90) {
    tariffResponse(auxillaryResponses, auxillaryResponses.responses[2]);
  }
  if (country.id === 8 && country.tariff === 90) {
    tariffResponse(auxillaryResponses, auxillaryResponses.responses[3]);
  }
}

addTariff = (country, tariff) => {
  if (state.gameTime == 0) {
    startGame();
  }
  country.tariff = country.tariff + tariff;
  state.countries = state.countries.map(c => c.id === country.id ? country : c);
  resetCountryButtons();
  tariffResponse(country, country.responses?.find(cr => cr.tariff == country.tariff));
  genericGameEventMessages(country);
  checkAchievements(state);
  save();
}

const dialogImg = document.getElementById('dialog-img');

tariffResponse = (country, response) => {
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

const hasPlayedItem = 'hasPlayed';
const hasPlayed = localStorage.getItem(hasPlayedItem);
if (!hasPlayed) {
  tariffResponse(auxillaryResponses, auxillaryResponses.responses[0]);
  localStorage.setItem(hasPlayedItem, true); //change bool val to debug intro dia
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

const resetDialog = document.getElementById('reset-tariff-dialog');

showResetDialogBox = () => {
  resetDialog.showModal();
}

closeResetDialogBox = () => {
  resetDialog.close();
}

const aboutDialog = document.getElementById('about-dialog');
showAboutDialogBox = () => {
  aboutDialog.showModal();
}

closeAboutDialogBox = () => {
  aboutDialog.close();
}

closeWinningDialogBox = () => {
  resetCountries();
  endParticles();
  state.gameTime = 0;
  setTimer(state.gameTime);
  localStorage.removeItem(gameTimeItem);
  clearInterval(timerInterval);
  startGameBtn.disabled = false;
  winningDialog.close();
}

// accessability attribute settings - found in browser: 
// F12 > Accessability Inspector > Properties > Attributes > XML roles.
 canvas.setAttribute("role", "The map dispaly and alternative play area.");
 countriesDialog.setAttribute("role", "This is a pop up dialog box displaying a picture of a flag and a responding message.");
 statusMessage.setAttribute("role", "The message representing the global economic climate");
 statusBar.setAttribute("role", "This displays major events in the game and is coulored green, yellow and red depending on the economic climate");