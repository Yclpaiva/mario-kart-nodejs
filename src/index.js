import { personagens } from './personagens.js';


function roll_dice() {
  return Math.floor(Math.random() * 6) + 1;
}
const player1 = personagens[0];
const player2 = personagens[1];

async function getRandomBlock(block) {
  switch (block) {
    case 1:
      console.log("Block: RETA");
      return "RETA";
    case 2:
      console.log("Block: CURVA");
      return "CURVA";
    case 3:
      console.log("Block: POWER");
      return "POWER";
  }
}
async function testSkill(block, player1, player2, diceResult1, diceResult2, player1Points, player2Points) {
  //test skill of each player
  let totalTestSkill1 = 0;
  let totalTestSkill2 = 0;

  switch (block) {
    case "RETA":
      totalTestSkill1 = player1.SPEED + diceResult1;
      totalTestSkill2 = player2.SPEED + diceResult2;
      if (totalTestSkill1 > totalTestSkill2) {
        console.log(`${player1.NAME} wins this round!`);
        player1Points++;
      } else if (totalTestSkill1 < totalTestSkill2) {
        console.log(`${player2.NAME} wins this round!`);
        player2Points++;
      } else {
        console.log("It's a tie!");
      }
      break;
    case "CURVA":
      totalTestSkill1 = player1.MANEUVERABILITY + diceResult1;
      totalTestSkill2 = player2.MANEUVERABILITY + diceResult2;
      if (totalTestSkill1 > totalTestSkill2) {
        console.log(`${player1.NAME} wins this round!`);
        player1Points++;
      } else if (totalTestSkill1 < totalTestSkill2) {
        console.log(`${player2.NAME} wins this round!`);
        player2Points++;
      } else {
        console.log("It's a tie!");
      }
      break;
    case "POWER":
      totalTestSkill1 = player1.POWER + diceResult1;
      totalTestSkill2 = player2.POWER + diceResult2;
      if (totalTestSkill1 > totalTestSkill2) {
        console.log(`${player1.NAME} wins this round!`);
        if (player2Points > 0) {
          player2Points--;
        }
      } else if (totalTestSkill1 < totalTestSkill2) {
        console.log(`${player2.NAME} wins this round!`);
        if (player1Points > 0) {
          player1Points--;
        }
      } else {
        console.log("It's a tie!");
      }
      break;
  }
  return [player1Points, player2Points];
}
async function playRaceEngine(player1, player2) {
  let player1Points = 0;
  let player2Points = 0;
  for (let round = 1; round <= 5; round++) {
    console.log(`Round ${round}`);

    //roll dices
    let diceResult1 = roll_dice();
    let diceResult2 = roll_dice();

    let randomBlockIndex = Math.floor(Math.random() * 3) + 1;
    let block = await getRandomBlock(randomBlockIndex);

    const testResult = await testSkill(block, player1, player2, diceResult1, diceResult2, player1Points, player2Points);
    player1Points = testResult[0];
    player2Points = testResult[1];
  }
  console.log(`Final score: ${player1.NAME} ${player1Points} x ${player2.NAME} ${player2Points}`);
}



(async function main() {
  console.log(`Race between ${player1.NAME} and ${player2.NAME} starts now!`);
  await playRaceEngine(player1, player2);

})(); // function automatically called when the script is run because of the "()()" at the end of the function definition


