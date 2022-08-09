const express = require("express");
const app = express();
const cors = require("cors");
const { gameStats } = require("./data.js");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));
app.use(cors());

app.post("/api/diceroll", (req, res) => {
  let message = "";
  try {
    
    let { player1DiceRoll, player2DiceRoll, player1Bet, player2Bet } = req.body;
    if (player1DiceRoll > player2DiceRoll) {
    
      gameStats.player1TotalPoints = gameStats.player1TotalPoints + player1Bet;
      gameStats.player2TotalPoints = gameStats.player2TotalPoints - player2Bet;
      gameStats.round = gameStats.round + 1;
      message = "player1 won";
    }
    if (player2DiceRoll > player1DiceRoll) {
      gameStats.player2TotalPoints = gameStats.player2TotalPoints + player2Bet;
      gameStats.player1TotalPoints = gameStats.player1TotalPoints - player1Bet;
      gameStats.round = gameStats.round + 1;
      message = "player2 won";
    } else {
      message = "its a draw. play another round!";
    }
    res.status(200).send({ message: message, gameStats });
  } catch (error) {
    console.log("ERROR DUELING", error);
    res.sendStatus(400);
  }
});

app.get("/api/gameStats", (req, res) => {
  try {
    res.status(200).send(gameStats);
  } catch (error) {
    console.log("ERROR GETTING GAME STATS", error);
    res.sendStatus(400);
  }
});

app.put("/api/gameStats", (req, res) => {
  try {
    gameStats.round = 0;
    gameStats.player1TotalPoints = 0;
    gameStats.player2TotalPoints = 0;
    res.status(200).send(gameStats);
  } catch (error) {
    console.log("ERROR GETTING GAME STATS", error);
    res.sendStatus(400);
  }
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
