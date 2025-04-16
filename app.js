let gameTime = 0;

function counter() {
    document.getElementById("game-timer").innerHTML = ++gameTime;
    document.getElementById("start-game-button").disabled = true
}

function typeWriter(outputMessage, htmlID) {
    let i = 0;
    let txt = outputMessage;
    let speed = 50;

    if (i < txt.length) {document.getElementById(htmlID).innerHTML =+ txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}