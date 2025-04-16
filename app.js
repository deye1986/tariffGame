let gameTime = 0;

function counter() {
    document.getElementById("game-timer").innerHTML = ++gameTime;
    document.getElementById("start-game-button").disabled = true
}