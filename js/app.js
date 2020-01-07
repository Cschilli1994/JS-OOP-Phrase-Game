/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
let game = new Game();

 document.getElementById('btn__reset').addEventListener('click', (e)=>{
    game = new Game();
    
    game.startGame();
 });
 document.getElementById('qwerty').addEventListener('click', (letter)=>{
   
    if(game.gameReady){
        if(game.guessed(letter.target.textContent)===false){
            game.handleInteraction(letter);
        }
   }
 });
 document.addEventListener('keydown', (letter)=>{
    if(game.gameReady){
        if(game.guessed(letter.key)===false){
            game.handleInteraction(letter);
        }
   }
  });

 