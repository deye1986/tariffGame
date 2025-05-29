// this file contains the usa and intoduction respoinses which ideally
// should appear in a dialog element, once immidiateley on the game boot, 
// and when ever required after - to narate the game from the 
// players/USA's perspective.
// 
// it doesnt require coords for the map but does use an flagImage file (usa)

// i propose a function (in app.js) that leverages 'calculateAllTariffs()' func 
// in game and displays helper dialogs, warning dialogues, and funny instances 
// not related to a particualar nation. The function should check if a 
// threshold is reached and then display a response from the json below, 
// depending on the state of the game.

const auxillaryResponses = { 
  "id": 25, 
  "name": "USA", 
  "responses": [
    { "signal": 1, "response": "Hello, and welcome to the most wonderful and greatest tariff game in the world. Trumps Tariff's. Lets get this trade war started, first you just need to grab 'em right by the p.... sorry I mean, click the countries and add some tariffs to get things started." },
    { "signal": 2, "response": "a response for somthing" },
    { "signal": 3, "response": "Donald Trump makes Canada an offer to become the 51st state"}
  ],
  "flagImage": "flags/USA.svg",
};