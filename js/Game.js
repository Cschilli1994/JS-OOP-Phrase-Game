/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */
class Game {
    constructor(){
        this.phrases = [
            new Phrase('Monkey see monkey do!'),
            new Phrase('You win some, you lose some.'),
            new Phrase('Tomorrow is a new day.'),
            new Phrase('A dime a dozen.'),
            new Phrase('A piece of cake.'),
            new Phrase('Stop beating around the bush.'),
            new Phrase("You're barking up the wrong tree.")
          ];
        this.activePhrase;
        this.hearts = $('#scoreboard ol li img');
        this.missed = 0;
        this.gameReady = false;
        this.guessedLetters = [];
    }
           
    //randomly selects a phrase from this.phrases
    getrandomPhrase(){
        return this.phrases[Math.floor(Math.random()*this.phrases.length)];
    }

    startGame(){
        //Hides start screen overlay
        $('#overlay').hide();

        this.gameReady = true;
        //sets active phrase property
        this.activePhrase = this.getrandomPhrase();
        //calls addphrase to display
        this.activePhrase.addPhraseToDisplay();
        $('body').css('background','rgb(2, 59, 2)');
    }
    guessed(letter){
        let matched = false;
        this.guessedLetters.forEach(function(guessed){
         
            if(guessed===letter){
                matched = true;
            }
            
        });
        return matched;
    }
    
    //handles all keypresses and button clicks of keyboard
    handleInteraction(event){
        
        const button = $('#qwerty button');
        let selected;
        for(let i =0; i<button.length;i++){
            //disables button if clicked or if correlating key is pressed on keyboard
            if(button[i].textContent===event.target.textContent || button[i].textContent===event.key){
                button[i].disabled = true;
                selected = button[i];
            }
        }
        //disables selected button
        if(event.target.tagName==='BUTTON'){
            this.guessedLetters.push(event.target.textContent);
             if(this.activePhrase.checkLetter(event.target.textContent)===false){
                //adds wrong class to selected button
                event.target.className = 'wrong';
            
                this.removeLife();
             }else {
                 event.target.className = 'chosen';
                 this.activePhrase.showMatchedLetter();
                 this.checkForWin();
             }               
        } else if (event.type==='keydown'){
            this.guessedLetters.push(event.key);
            if(!this.activePhrase.checkLetter(event.key, this.activePhrase.list)){
                //adds wrong class to selected letter button
                selected.className = 'wrong';
             
                this.removeLife();
             }else {
                 selected.className = 'chosen';
                 this.activePhrase.showMatchedLetter();
                 this.checkForWin();
             }        
        }
        
    }
    checkForWin(){
        const guessedCorrect = $('.show').length + $('.space').length ;
        const totalLetters = this.activePhrase.phrase.length;
        if(guessedCorrect===totalLetters){
            this.gameOver('You Win!');
        }
    }
    removeLife(){
        //removes a life from scoreboard
            //liveHeart.png replaced with lostHeart.png
            //if 0 hearts left
                //gameOver()
                const lostHeart = this.hearts[this.missed];
               
                lostHeart.src = "images/lostHeart.png";
                this.missed++;
                if(this.missed===5){
                    this.gameOver('You ran out of lives.  Game Over!');
                }
        this.changeBackground();
        
    }
    changeBackground(){
      
        switch(this.missed){
            //changes color of background based on missed guesses
            case 1 : $('body').css('background','rgb(3, 202, 19)');break;
            case 2 : $('body').css('background','rgb(204, 226, 3)');break;
            case 3 : $('body').css('background','rgb(250, 125, 9)');break;
            case 4 : $('body').css('background','rgb(248, 54, 6)');break;
        }
    }
    gameOver(message){
        const keyboard = $('#qwerty button');
        for(const button of keyboard){
            button.className = 'key';
            button.disabled = false;
        }
        $('#game-over-message').text(message);
        $('#overlay').show();
        $('#btn__reset').text('Play Again');
        this.activePhrase.removePhraseFromDisplay();
        for(const heart of this.hearts){
            heart.src = "images/liveHeart.png";
        }
        //resets guessed letters
        this.GuessedLetters = [];
    }

}
