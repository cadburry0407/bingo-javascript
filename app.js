const BINGOCtrl = (function() {
  // Bingo constructor
  const Bingo = function(letter, number) {
    this.letter = letter;
    this.number = number;
  }

  const data = {
    bingo: {
      b: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      i: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
      n: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
      g: [46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
      o: [61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75],
    },
    bingoNumber: [],
    card: {},
    bingoPattern: {}
  }

  return {
    getData: function() {
      return data;
    },
    addBingoNumber: function(letter, number) {

      // Create new item
      newBingoItem = new Bingo(letter, number);
      
      // add to item array
      data.bingoNumber.push(newBingoItem);

      return newBingoItem;
    },
    getBingoNumber: function() {
      return data.bingoNumber;
    },
    getBingoPattern: function() {
      return data.bingoPattern;
    },
    randomBingoNumber: function(bingoNumbers) {

      // get random letter from object data.bingo
      const randomLetter = Object.keys(data.bingo)[Math.floor(Math.random()*Object.keys(data.bingo).length)];

      const getRandomNumberFromObject = function (obj) {
        const keys = Object.keys(obj);
        return obj[keys[ keys.length * Math.random() << 0]];
      };

      // get random number using randomLetter
      const randomNumber = getRandomNumberFromObject(data.bingo[randomLetter]);

      // remove the rolled number from data.bingo
      const randomLetterArr = data.bingo[randomLetter];
      randomLetterArr.splice(randomLetterArr.indexOf(randomNumber), 1);

      return [randomLetter, randomNumber];
    },
    newBingoCard: function() {
      const bingoCard = JSON.parse(JSON.stringify(data.bingo));

      // get the keys b i n g o for iteration
      const bingoKeys = Object.keys(bingoCard);

      // get 5 random item from letters
      const newCard = {};
      
      bingoKeys.forEach( letter => {
        let number = bingoCard[letter];
        let randomize = number.sort(function() {
          return 0.5 - Math.random();
        });
        newCard[letter] = randomize.slice(number,5);
      });
      // insert free 
      newCard.n[2] = "FREE";

      data.card = newCard;

      return data.card;
    },
    clearBingoNumber: function() {
      data.bingoNumber = [];
      data.bingo = {
        b: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        i: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        n: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
        g: [46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
        o: [61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75],
      }
    },
    bingoPattern: function() {
      const bingoCardPattern = JSON.parse(JSON.stringify(data.card));
      
      //data.bingoPattern = bingoCardPattern
      bingoCardPattern.n.splice(2, 1);
      
      const pattern = {};
      // get the keys b i n g o for iteration
      const bingoKeys = Object.keys(bingoCardPattern);

      bingoKeys.forEach( (letter, index) =>  {
        let number = bingoCardPattern[letter];
        pattern[index] = number;

        const pattern5 = [bingoCardPattern.b[0], bingoCardPattern.i[0], bingoCardPattern.n[0], bingoCardPattern.g[0], bingoCardPattern.o[0]];

        const pattern6 = [bingoCardPattern.b[1], bingoCardPattern.i[1], bingoCardPattern.n[1], bingoCardPattern.g[1], bingoCardPattern.o[1]];

        const pattern7 = [bingoCardPattern.b[2], bingoCardPattern.i[2], bingoCardPattern.g[2], bingoCardPattern.o[2]];

        const pattern8 = [bingoCardPattern.b[3], bingoCardPattern.i[3], bingoCardPattern.n[2], bingoCardPattern.g[3], bingoCardPattern.o[3]];

        const pattern9 = [bingoCardPattern.b[4], bingoCardPattern.i[4], bingoCardPattern.n[3], bingoCardPattern.g[4], bingoCardPattern.o[4]];

        const pattern10 = [bingoCardPattern.b[0], bingoCardPattern.i[1], bingoCardPattern.g[3], bingoCardPattern.o[4]];

        const pattern11 = [bingoCardPattern.b[4], bingoCardPattern.i[3], bingoCardPattern.g[1], bingoCardPattern.o[0]];

        pattern[5] = pattern5;
        pattern[6] = pattern6;
        pattern[7] = pattern7;
        pattern[8] = pattern8;
        pattern[9] = pattern9;
        pattern[10] = pattern10;
        pattern[11] = pattern11;
        
      });
      
      data.bingoPattern = pattern;

      return data.bingoPattern;
    },
    removeNumberDataBingoPattern: function(number) {
      const dataPattern = data.bingoPattern;

      let patternLength = Object.keys(dataPattern).length;

      const pattern = {}

      for(let i = 0; i < patternLength; i++) {
        if(number != undefined) {
          let patternArr = Object.values(dataPattern[i]);

          let value = number;
    
          patternArr = patternArr.filter(item => item !== value)
          
          pattern[i] = patternArr;
          
        }
      }

      data.bingoPattern = pattern;

      return pattern;
    },
    dataHighlight: function() {

      const bingoPattern = JSON.parse(JSON.stringify(data.bingoPattern));

      const result = Object.values(bingoPattern);

      let combineBingoPatternArr = [];

      result.forEach(numbers => {
        numbers.forEach(number => {
          combineBingoPatternArr.push(number);
        });
      });

      return combineBingoPatternArr;
    }
  }
})();


// UI Controllers
const UICtrl = (function() {
  const UISelectors = {
    btnNewCard: ".btn-new-card",
    btnRoll: ".btn-roll",
    rollContainer: ".roll-container",
    rolledLetter: ".rolled-letter",
    rolledNumber: ".rolled-number",
    numberRow: ".number-row",
    numberBoxes: ".number-boxes",
    winner: ".winner"
  }

  return {
    getSelectors: function() {
      return UISelectors;
    },
    addListBingoNumbers: function(bingoNumbers) {

      const div = document.createElement("div");
      div.className = "rolled";

      if(bingoNumbers.number != undefined)  {
        
        div.innerHTML = `
        <span class="rolled-letter">${bingoNumbers.letter}</span> 
        <span class="rolled-number">${bingoNumbers.number}</span>
        `;
        
        document.querySelector(UISelectors.rollContainer).insertAdjacentElement("afterbegin", div);
        
      }
      
    },
    getNewBingoCard: function(bingoCard) {

      let numberDiv = "";

      bingoCard.forEach(bingo => {
          bingo.forEach(number => {
            if(number === "FREE") {
              numberDiv += `<div class="number-item highlight">${number}</div>`;
            } else {
              numberDiv += `<div class="number-item">${number}</div>`;
            }
          });
      });

      document.querySelector(UISelectors.numberBoxes).innerHTML = numberDiv;
    },
    clearRollBingoNumbers: function() {
      document.querySelector(UISelectors.rollContainer).innerHTML = "";
    },
    highlightNumber: function(combineBingoPatternArr, randomNumber) {

      let numberNodeList = document.querySelectorAll(".number-item");

      if(combineBingoPatternArr.includes(randomNumber)) {

        numberNodeList.forEach(value => {
          if(randomNumber === +value.innerHTML) {
            value.classList.add("highlight");
          }
        });
    
      }
    },
    winBingo: function(modifiedBingoPattern) {

      const modifiedBingoPatternArr = Object.values(modifiedBingoPattern);

      modifiedBingoPatternArr.forEach(numbers => {
        if(numbers.length === 0) {
          this.enableDisableRoll(true);
          this.showBingo("block");
        }
      });

    },
    enableDisableRoll: function(attr) {
      document.querySelector(UISelectors.btnRoll).disabled = attr;
    },
    showBingo: function(toggle) {
      document.querySelector(UISelectors.winner).style.display = toggle;
    }
  }
  
})(); 

const App = (function(UICtrl, BINGOCtrl) {

  const UISelectors = UICtrl.getSelectors();

  const loadEventListener = () => {

    // Get a Random Number
    document.querySelector(UISelectors.btnRoll).addEventListener("click",
    getRandomBingoNumber);

    // get new card via button
    document.querySelector(UISelectors.btnNewCard).addEventListener("click", generateNewCard);

    window.addEventListener("DOMContentLoaded", (e) => {
      generateNewCard();
      UICtrl.showBingo("none");
    });

  }

  const getRandomBingoNumber = (e) => {

    const [randomLetter, randomNumber] = BINGOCtrl.randomBingoNumber(BINGOCtrl.getBingoNumber());
    
    const addBingoNumber = BINGOCtrl.addBingoNumber(randomLetter, randomNumber);

    UICtrl.addListBingoNumbers(addBingoNumber);

    const combineBingoPatternArr = BINGOCtrl.dataHighlight();

    UICtrl.highlightNumber(combineBingoPatternArr, randomNumber);

    const modifiedBingoPattern = BINGOCtrl.removeNumberDataBingoPattern(randomNumber);

    UICtrl.winBingo(modifiedBingoPattern);

    e.preventDefault();

  }

  const generateNewCard = () => {
    
    BINGOCtrl.clearBingoNumber();
    UICtrl.clearRollBingoNumbers();
    const card =  BINGOCtrl.newBingoCard();
    // convert card to array for iteration
    const cardValues = Object.values(card);
    // generate new card
    UICtrl.getNewBingoCard(cardValues);
    UICtrl.enableDisableRoll(false);
    UICtrl.showBingo("none");
    BINGOCtrl.bingoPattern();

  }

  return {
    init: function() {

      loadEventListener();

    }
  }

})(UICtrl, BINGOCtrl); 


App.init();