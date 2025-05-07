const defaultCountries = [
  { 
    "id": 1, 
    "name": "UK", 
    "tariff": 0, 
    "imgCords": { "x": 475, "y": 375, "width": 50, "height": 50 },
    "responses": [
      { "tariff": 10, "response": "I thought we had something special, America" },
      { "tariff": 40, "response": "Blimey! This isn't what we spoke about in our last meeting" },
      { "tariff": 50, "response": "My goodness, the special relationship has been shattered!" },
      { "tariff": 80, "response": "Britain will no longer export to the USA and seeks a willing nation with lower tariffs to handle its imports" },
      { "tariff": 100, "response": "We have had enough of you America, we won't be selling you anymore tea, so there!" }
    ],
    "flagImage": "flags/flagImageUnionFlag.svg",
    "cashReserves": 0
  },
  { "id": 2, 
    "name": "China", 
    "tariff": 0, 
    "imgCords": { "x": 800, "y": 450, "width": 300, "height": 100 },
    "responses": [
      { "tariff": 10,  "response": "Are you sure you want to play this game, America?"},
      { "tariff": 30,  "response": "Oh you better not you god damn America, we will not be bullied!" },
      { "tariff": 50,  "response": "God damn, America. Do you really want to play this game?" },
      { "tariff": 60,  "response": "Oh no, not cool America, we will sell your bonds if you carry on" },
      { "tariff": 100, "response": "We don't care America, you need us more than we need you!" },
      { "tariff": 120, "response": "We are now applying a tarrif back on you for the same rate America!" },
      { "tariff": 140, "response": "You are only hurting yourself now America, do you like pain?"}
    ],
    "flagImage": "flags/flagImageChina.svg",
    "cashReserves": 0
  },    
  { "id": 3, 
    "name": "EU", 
    "tariff": 0, 
    "imgCords": { "x": 580, "y": 350, "width": 120, "height": 200 },
    "responses": [
      { "tariff": 10, "response": "Don't do anything we wouldn't do!" },
      { "tariff": 30, "response": "Don't be stupid America! We will need you to calm down before the next meeting" },
      { "tariff": 60, "response": "We will replace what we buy off you from China if you carry on America" }
    ],
    "flagImage": "flags/flagImageEurope.svg"
  },
  { "id": 4, 
    "name": "Mexico", 
    "tariff": 0,
    "imgCords": { "x": 90, "y": 550, "width": 120, "height": 100 },
    "responses": [
      { "tariff": 10, "response": "Hey gringo, don't be like that. You know we have a good thing going on" }
    ],
    "flagImage": "flags/flagImageMexico.svg"
  },
  { "id": 5, 
    "name": "South America",
    "tariff": 0,
    "imgCords": { "x": 250, "y": 700, "width": 200, "height": 200 },
    "responses": [
      { "tariff": 20, "response": "Well this is no surprise at all" },
      { "tariff": 40, "response": "Oh we are so through with this, we arent giving you any Canals, stop trying to bully us" }
    ],
    "flagImage": "flags/flagImageSouthAmerica.svg"
  },
  { "id": 6, 
    "name": "Africa", 
    "tariff": 0,
    "imgCords": { "x": 580, "y": 600, "width": 300, "height": 300 },
    "responses": [
      { "tariff": 10, "response": "Grab her by the, what Mr President?"},
      { "tariff": 20, "response": "Why do you do this?" },
      { "tariff": 50, "response": "What is going on Trump?" }
    ],
    "flagImage": "flags/flagImageAfrica.svg"
  },
  { "id": 7, 
    "name": "Canada", 
    "tariff": 0,
    "imgCords": { "x": 100, "y": 280, "width": 200, "height": 250 },
    "flagImage": "flags/flagImageCanada.svg",
    "responses": [
      { "tariff": 10, "response": "We don't need your trade, Trump." },
      { "tariff": 20, "response": "We won't be playing your silly games America" },
      { "tariff": 30, "response": "Canada will not be bullied, we aren't for sale either." }
    ]
  },
  { "id": 8, 
    "name": "Russia", 
    "tariff": 0,
    "imgCords": { "x": 800, "y": 300, "width": 300, "height": 180 },
    "flagImage": "flags/flagImageRussia.png",
    "responses": [
      { "tariff": 10, "response": "I thought you didn't want this information releasing?" }
    ]
  },
  { "id": 9, 
    "name": "Asia", 
    "tariff": 0,
    "imgCords": { "x": 850, "y": 580, "width": 200, "height": 150 },
    "flagImage": "flags/flagImageAsiaRegion.svg",
    "responses":[
      { "tariff": 20, "response": "You need our cheap electronics, and clothes this doesn't make sense." }
    ]
  },
  { "id": 10, 
    "name": "Australia", 
    "tariff": 0,
    "imgCords": { "x": 970, "y": 730, "width": 100, "height": 100 },
    "flagImage": "flags/flagImageAustralia.SVG",
    "responses": [
      { "tariff": 10, "response": "We will just ignore that for now, good one mate." }
    ]
  },
  {
    "id": 11,
    "name": "Greenland",
    "tariff": 0,
    "imgCords": { "x": 200, "y": 180, "width": 350, "height": 250 },
    "flagImage": "flags/flagImageGreenland.svg",
    "responses": [
      {"tariff": 10, "response": "Greenland retaliates with matching trade tariff's."},
      {"tariff": 20, "response": "Greenland refuses to allow America to operate data centres in its cold climate"}
    ]
  },
  {
    "id": 12,
    "name": "South Africa",
    "tariff": 0,
    "imgCords": { "x": 600, "y":810, "width": 80, "height": 80 },
    "flagImage": "flags/flagImageSouthAfrica.svg",
    "responses": [
      {"tariff": 20, "response": "We are disapointed to see a 20% tariff applied, is there anything we can do to change your mind sir?"}
    ]
  }
];