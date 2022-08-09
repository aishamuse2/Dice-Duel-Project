
const newGameBtn =document.getElementById("newGame")
const diceRollBtn = document.getElementById("diceRoll");
const player1Input = document.getElementById("player1Input");
const player2Input = document.getElementById("player2Input");
const roundText = document.getElementById("round");
const player1PointsText = document.getElementById("player1Points");
const player2PointsText = document.getElementById("player2Points");

const diceRoll = () => {
  const player1DiceRoll = Math.floor(Math.random() * 6) + 1;
  const player2DiceRoll = Math.floor(Math.random() * 6) + 1;
  const player1Bet = Number(player1Input.value);
  const player2Bet = Number(player2Input.value);
  if (player1Bet < 0 || player1Bet > 10 || player2Bet < 0 || player2Bet > 10){
    alert("invalid bets please retry your bets! (bets should be between 1-10)")
   return
  }
  // alert ("     "+player1DiceRoll+"     "+player2DiceRoll+"     "+player1Bet+"    "+player2Bet)

  axios
    .post("/api/diceRoll", {
      player1DiceRoll,
      player2DiceRoll,
      player1Bet,
      player2Bet,
    })
    .then(({ data }) => {
      alert(
        "player1's dice roll was: " +
          player1DiceRoll +
          " player2's dice roll was: " +
          player2DiceRoll +
          "  " +
          data.message
      );
      if (data.gameStats.round==5){
        console.log("test")
        diceRollBtn.style.display = "none";
        
      }
      getGameStats();
      // resultsText.textContent = data
      // diceRollBtn.classList.remove('hide')
      //  getPlayerStats()
    });
};
const getGameStats = () => {
  axios
    .get("/api/gameStats")
    .then(({ data: { round, player1TotalPoints, player2TotalPoints } }) => {
      roundText.textContent = `Round: ${round}`;
      player1PointsText.textContent = `player 1 Points: ${player1TotalPoints}`;
      player2PointsText.textContent = `player 2 Points: ${player2TotalPoints}`;
      if (round < 5){
        resetGameStats 
        diceRollBtn.style.display = null;
      }
    });
};

 const resetGameStats = () =>{
axios
  .put("/api/gameStats")
  .then(({ data }) => {
    alert(
     "Game Has Restarted"
    );
    getGameStats();
    // resultsText.textContent = data
    // diceRollBtn.classList.remove('hide')
    //  getPlayerStats()
  });
 };
diceRollBtn.addEventListener("click", diceRoll);
newGameBtn.addEventListener("click", resetGameStats);
getGameStats();
