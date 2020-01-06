/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */
class Phrase {
    constructor(phrase){
      
      this.phrase = phrase;
      //array holds each letter of phrase
      this.list =[];
      //used to calculate that all letters of phrase have been guessed
      this.correctLetters = [];
    }
    checkLetter(guessedLetter){
      let correct = false;
      this.correctLetters = [];
      for(const letter of this.list){
        const lowerCaseLetter = letter.textContent.toLowerCase();
        if(guessedLetter===lowerCaseLetter){
          //changes correct to true meaning the guessed letter is within the phrase
          correct = true;
          this.correctLetters.push(letter);
        }
      }
      return correct;
    }
 
    showMatchedLetter(){
      for(const letter of this.correctLetters){
        
          letter.className = 'show';
        
      }
    }


    removePhraseFromDisplay(){
      const totalLength = $('#phrase ul li').length;
      for(let i = 0; i < totalLength;i++){
        $('#phrase ul li')[0].remove();
      }
    }

    addPhraseToDisplay(){
          for(const letter of this.phrase){
           
            const space = document.createElement('li');
            space.textContent = letter;
            if(space.textContent===' '){
              space.className = 'space';
            }else if ((/[a-z]/i).test(space.textContent)){
              space.className = 'letter';
            } else {
              space.className = 'show';
            }
            this.list.push(space);
            $('#phrase ul').append(space);
          }
          console.log(this.list);

  }
}
  //   //-----------------------------------------------------------------------------------------------
  //   get phraseArr(){
  //     let phraseArr = [];
  //     for(let i =0;i<this.phrase.length;i++){
  //       const letter = this.phrase[i];
  //       phraseArr.push(letter.toLowerCase());
  //     }
  //     return phraseArr;
  //   }

   
  //   //creates li element for DOM
  //   createList(){
  //     for(const letter of this.phraseArr){
  //       const space = document.createElement('li');
  //       space.textContent = letter;
  //       if(space.textContent===' '){
  //         space.className = 'space';
  //       }else if ((/[a-z]/i).test(space.textContent)){
  //         space.className = 'letter';
  //       } else {
  //         space.className = 'show'
  //       }
  //       this.list.push(space);
  //     }
  //   }
   
  //   //appends each li to the DOM
  //   addPhraseToDisplay(){
  //     for(const letter of this.list){
  //       $('#phrase ul').append(letter);
  //     }
     
  //   }
  // 