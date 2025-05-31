let achievements = [{
  id: 1,
  name: 'The Beginning',
  description: 'You have started the game',
  achieved: false,
  requirement: (state) => state.gameTime > 0
},{
  id: 2,
  name: 'Tariffed a country',
  description: 'You have tariffed your first country!',
  achieved: false,
  requirement: (state) => {
    return state.countries.some(c => c.tariff > 0);
  }
},{
  id: 3,
  name: 'Economic Uncertainty',
  description: 'You have started the ball rolling, down the hill and added tariffs totalling more than 100',
  achieved: false,
  requirement: (state) => {
    // wasn't working with calculateAllTarrifs function, just doing it here 
    // Assume it's a context issue (this model doesn't know wtf a function outside of itself is)
    return state.countries.reduce((sum, item) => sum + item.tariff, 0) > 100
  }
}, {
  id: 4,
  name: 'Economic Downfall',
  description: "You've sent the economy into freefall, are you sure this is a good idea?",
  achieved: false,
  requirement: (state) => state.countries.reduce((sum, item) => sum + item.tariff) > 250
},{
  id: 5, 
  name: 'Economic Collapse',
  description: "You got the world enconomy in big trouble",
  achieved: false,
  requirement: (state) => state.countries.reduce((sum, item) => sum + item.tariff) > 400
}, {
  id: 6,
  name: 'Art of the deal',
  description: "You've played your art of the deal card",
  achieved: false,
  requirement: (state) => state.reset
},{
  id: 7,
  name: 'Winner',
  description: "You have won the game!",
  achieved: false,
  requirement: (state) => state.won
}];

const achievementItem = 'achievements';

minAchievement = (achievement) => {
  return {
    id: achievement.id,
    achieved: achievement.achieved
  }
}

saveAchievements = () => {
  const achievementsJson = JSON.stringify(achievements.map(minAchievement));
  localStorage.setItem(achievementItem, achievementsJson);
}

loadAchievements = () => {
  const savedAchievements = JSON.parse(localStorage.getItem(achievementItem));
  if (savedAchievements) {
    savedAchievements.forEach(achievement => {
      achievements.find(a => a.id == achievement.id).achieved = achievement.achieved;
    })
  }

  displayAchievements();
}

const achievementContent = document.getElementById('achievements-content');

clearAchievementsDisplay = () => {
  const spans = achievementContent.querySelectorAll('span');
  spans?.forEach(s => s.remove());
}

displayAchievements = () => {
  achievements.forEach(a => {
    const span = document.createElement('span');
    span.id = `${a.id}-${a.name}`;

    span.innerHTML = `<p>${a.name}<br/>${a.description}</p>`;
    if (!a.achieved) {
      span.className = 'blurred-text';
    }

    achievementContent.appendChild(span);
  });
}

loadAchievements();

const alertTicker = document.getElementById('alert-ticker');

checkAchievementReached = (achievement, state) => {
  if (achievement.achieved) return;

  if (achievement.requirement(state)) {
    achievement.achieved = true;
    achievements = achievements.map(a => a.id === achievement.id ? achievement : a);
    alertTicker.innerText = `You have achieved ${achievement.name}: ${achievement.description}`; 
    saveAchievements(achievements);
    clearAchievementsDisplay();
    displayAchievements();
  }
}

checkAchievements = (state) => {
  achievements.filter(a => !a.achieved).forEach(a => {
    checkAchievementReached(a, state);
  });
}

const achievementsDialogBox = document.getElementById('achievements-dialog');

closeAchievementsDialogBox = () => {
  achievementsDialogBox.close();
}

showAchievementsDialogBox = () => {
  achievementsDialogBox.showModal();
}