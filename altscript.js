var highScoresList = document.getElementById("highScoresList");
var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScoresList.innerHTML = highScores
  .map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
  })
  .join("");

var clear = document.getElementById("remove")

clear.addEventListener("click", function(event) {
    event.preventDefault()
    var areYouSure = confirm("Cleared scores cannot be retrieved. Clearing highscores will lead you directly to the Start Quiz page. Are you sure you want to clear highscores?")

    if (confirm) {

        localStorage.removeItem("highScores")
        window.location.href = "https://elijahflanders96.github.io/Timed_Quiz/index.html"
    }
})