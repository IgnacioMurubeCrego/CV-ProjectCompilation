// Arq. y Progra. de Sistemas - Practica 2 - Ignacio Murube Crego 

// Funtion to shuffle possible answer shown to the players.
// Solution from : 
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array : Array<(String|Boolean)>) {
  let currentIndex = array.length
  let randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

// Player object interface
interface Player {
    name : string|null
    correct : number
    failed : number
}

// Returns 'players' array using user's promts.
function initPlayers() : Array<Player> {
  const players : Array<Player> = [];
  let numPlayers : string|null = prompt("Introduce the number of players");
  if(numPlayers === null || parseInt(numPlayers) < 1){
    numPlayers = "1";
  }
  console.log("Selected number of players : ",numPlayers);
  
  for(let i = 0 ; i < parseInt(numPlayers) ; i++){
    const name = prompt("Introduce player " + (i+1).toString() + " name :");
    const player : Player = {
        name : name,
        correct : 0,
        failed : 0
    }
    players.push(player);
  }
  return players;
}

// Returns number of questions to fetch from API using user's promts.
function initNumQuestions(players : Array<Player>) : string{
  let numQuestions : string|null = 
  prompt("Introduce the number of questions per player : ");
  if(numQuestions !== null)
    numQuestions = (players.length * parseInt(numQuestions)).toString(); 
  else
    numQuestions = (5 * players.length).toString();
  return numQuestions;
}

// Returns game difficulty setting to fetch questions with using user's promts.
function initGameDifficulty() : string{
  const possibleDiff : Array<string> = ["easy","medium","hard"];
  let gameDiff : string|null = 
  prompt("Introduce the Game difficulty:\n1 -> easy\n2 -> medium\n3 -> hard\n");
  if(gameDiff === null || parseInt(gameDiff) < 1 || parseInt(gameDiff) > 3)
    gameDiff = possibleDiff[1];
  else
    gameDiff = possibleDiff[parseInt(gameDiff)-1]; 
  return gameDiff; 
}

// Main game. API fetch function. 
function trivia() : void {

  // Set number of players, question to request and game difficulty to fetch:
  const players : Array<Player> = initPlayers();
  const numQuestions : string = initNumQuestions(players);
  const gameDiff : string = initGameDifficulty();
  
  // Trivia API fetch:
  fetch("https://opentdb.com/api.php?amount="
  +numQuestions+"&difficulty="+gameDiff)
  .then((res : Response)=>{res.json().then(res => {
      
      // Current player index on 'players' array.
      let playerIndex : number = 0;

      console.log("\t--- TRIVIA ---");

      (res.results).forEach(
        (q: { question: string; type: string; 
          correct_answer: string; incorrect_answers: Array<string>; }) => {

        console.log("\nIt's " + players[playerIndex].name + "'s turn to play : ");

        // We show the question and the shuffled array of possible answers
        // to the player managing the question type.

        console.log("\n",q.question)
        let possibleAns : Array<string> = []; 
        let answer : string|null = "0";

        if(q.type === "boolean"){
          possibleAns = [q.correct_answer,...q.incorrect_answers]; 
          console.log(shuffle(possibleAns));
          // Player answer :
          answer = prompt("Introduce the number of your answer (1) or (2) : ");
          if(answer === null || parseInt(answer) < 1 || parseInt(answer) > 2)
            answer = "0";
        }
        else{
          possibleAns = [q.correct_answer,...q.incorrect_answers]; 
          console.log(shuffle(possibleAns));
          // Player answer :
          answer = prompt("Introduce the number of your answer (1) to (4) : ");
          if(answer === null || parseInt(answer) < 1 || parseInt(answer) > 4) 
            answer = "0";
        }

        // Process current player answer and update score.
        if(possibleAns[parseInt(answer)-1] === q.correct_answer){ 
            console.log("Correct !");
            players[playerIndex].correct++;
        }
        else{
          console.log("Incorrect.");
          console.log("Correct answer was : ",q.correct_answer);
          players[playerIndex].failed++;
        }

        // If we have multiple players, we set the current player index
        // to the next one in the 'players' array.
        if(playerIndex != players.length-1)
            playerIndex++;
        else
          playerIndex = 0;
      });

      // Finds the max value of correct answers among the players :
      const max = players.map((p:Player) => p.correct ).reduce((prev, current) =>  {
        return (prev && prev > current) ? prev : current;
      }) 

      // Filters the 'players' arrays to get the players with 'max' correct answers.
      const winners : Array<Player> = players.filter((p:Player) => p.correct === max);

      // Prints winner or draw message.
      if(!(winners[1])){
        console.log("\n\n--- Winner! ---\n",winners[0]);
      }
      else{
        console.log("\n\n---Its a draw!---\n");
        winners.forEach(p => {
          console.log(p);
        });
      }

    })})
}

// Call Game funtion.
trivia();
