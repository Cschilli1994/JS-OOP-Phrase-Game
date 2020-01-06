/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */
class Game {
    constructor(){
        this.phrases = [
            'Monkey see monkey do!',
            'You win some, you lose some.',
            'Tomorrow is a new day.',
            'A dime a dozen.',
            'A piece of cake.',
            'Stop beating around the bush.',
            "You're barking up the wrong tree."
          ];
        this.activePhrase;
        this.hearts = $('#scoreboard ol li img');
        this.missed = 0;
    }
           
    //randomly selects a phrase from this.phrases
    get randomPhrase(){
        return this.phrases[Math.floor(Math.random()*this.phrases.length)];
    }

    startGame(){
        //Hides start screen overlay
        $('#overlay').hide();
        //sets active phrase property
        this.activePhrase = new Phrase(this.randomPhrase);
        //calls addphrase to display
        this.activePhrase.addPhraseToDisplay();
        $('body').css('background','rgb(2, 59, 2)');
    }

    handleInteraction(event){
        const button = $('.key');
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
                console.log(lostHeart);
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
    }

}
//     //------------------------------------------------------------------------------------------
//     resetGame(){
//         this.phrase.createList();
//         this.phrase.addPhraseToDisplay();
//         this.score = 5;
//     }
//     loseHeart(){
        
//     }
//     updateGame(){

//     }
//     //handles on screen letters
//     handleBtnLetter(letterGuessed){
//         if(this.gameOver===false){
//             for(const letter of this.phrase.list){
//                 console.log(letter);
//                 const currentLetter = letter.textContent.toLowerCase();
//                 if(currentLetter===letterGuessed){
//                     letter.className = 'show';
//                 }
//             }
//         }
//     }
//     //handles all guesses made from keyboard
//     handleKeydown(letterGuessed){
//         if(this.gameOver===false){
//             let matched = false;
//             for(const letter of this.phrase.list){
               
//                 const currentLetter = letter.textContent.toLowerCase();
//                 if(currentLetter===letterGuessed){
//                     letter.className = 'show';
//                     matched = true;
//                 }
//             }
//             if(!matched){
//                 this.loseHeart();
//             }
//         }
//     }
// }