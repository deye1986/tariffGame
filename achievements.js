calculateAllTarrifs = (countries) => countries.reduce((sum, item) => sum + item.tariff, 0);

let achievements = [{
  id: 1,
  name: 'The Beginning',
  description: 'Has started the game',
  achieved: false,
  requirement: (state) => state.gameTime > 0
},{
  id: 2,
  name: 'Tariffed a country',
  description: 'You have tariffed your first country!',
  achieved: false,
  requirement: (state) => state.countries.some(c => c.tariff > 0)
},{
  id: 3,
  name: 'Economic Uncertainty',
  description: 'You have started the ball rolling, down the hill',
  achieved: false,
  requirement: (state) =>  calculateAllTarrifs(state.countries) > 100
}];

const achievementItem = 'achievements';

saveAchievements = () => {
  const achievementsJson = JSON.stringify(achievements);
  localStorage.setItem(achievementItem, achievementsJson);
}

loadAchievements = () => {
  const savedAchievements = JSON.parse(localStorage.getItem(achievementItem));
  if (savedAchievements) {
    console.log('loading achievements')
    achievements = savedAchievements;
  }
}

loadAchievements();

checkAchievementReached = (achievement, state) => {
  if (achievement.achieved) return;

  if (achievement.requirement(state)) {
    achievement.achieved = true;
    achievements = achievements.map(a => a.id === achievement.id ? achievement : a);
    //TODO: Show toast pop up or something that's not too intrusive
    alert('You have achieved ' + achievement.name);
    saveAchievements(achievements);
  }
}

checkAchievements = (state) => {
  console.log('achievements', achievements);
  achievements.filter(a => !a.achieved).forEach(a => {
    console.log('checking achievement', a);
    checkAchievementReached(a, state);
  });
  console.log('achievements after', achievements);
}