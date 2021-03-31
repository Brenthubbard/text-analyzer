// Utility Logic

function noInputtedWord(word, text) {
  return ((text.trim().length === 0) || (word.trim().length === 0));
}

// Business Logic

function wordCounter(text) {
  if (text.trim().length === 0) {
    return 0;
  }
  let wordCount = 0;
  const wordArray = text.split(" ");
  wordArray.forEach(function (element) {
    if (!Number(element)) {
      wordCount++;
    }
  });
  return wordCount;
}

function numberOfOccurrencesInText(word, text) {
  if (noInputtedWord(word, text)) {
    return 0;
  }
  const wordArray = text.split(" ");
  let wordCount = 0;
  wordArray.forEach(function (element) {
    if (element.toLowerCase().includes(word.toLowerCase())) {
      wordCount++;
    }
  });
  return wordCount;
}

// UI Logic

function boldPassage(word, text) {
  if (noInputtedWord(word, text)) {
    return "";
  }
  let htmlString = "<p>"
  let textArray = text.split(" ");
  textArray.forEach(function (element, index) {
    if (element.toLowerCase().includes(word.toLowerCase())) {
      htmlString = htmlString.concat("<b>" + element + "</b>");
    } else {
      htmlString = htmlString.concat(element);
    }
    if (index !== (textArray.length - 1)) {
      htmlString = htmlString.concat(" ");
    }
  });
  return htmlString + "</p>";
}

$(document).ready(function () {
  $("form#word-counter").submit(function (event) {
    event.preventDefault();
    const passage = $("#text-passage").val();
    const word = $("#word").val();
    const wordCount = wordCounter(passage);
    const occurrencesOfWord = numberOfOccurrencesInText(word, passage);
    $("#total-count").html(wordCount);
    $("#selected-count").html(occurrencesOfWord);
    $("#bolded-passage").html(boldPassage(word, passage));
  });
});

function returnThreeMostWords(passage) {
  //remove data from string and input into an array
  const wordsArray = passage.split(" ")
  // set the counter to 0
  let wordsCount = 0;
  let oneMostUsed = [0, "test oneMostUsed"]
  let twoMostUsed = [0, "test twoMostUsed"]
  let threeMostUsed = [0, "test threeMostUsed"]
  let topThree = [oneMostUsed[1], twoMostUsed[1], threeMostUsed[1]]
  // set up function for conditional and loop
  wordsArray.forEach(function (word) {
    // set conditional for the loop
    if (word != oneMostUsed[1] && word != twoMostUsed[1] && word != threeMostUsed[1]) {

      wordsCount = numberOfOccurrencesInText(word, passage)
      if (wordsCount >= threeMostUsed[0]) {
        threeMostUsed = [wordsCount, word];// If our current word (in this loop) has a 
        //                                    greater count than 3rd place, it takes 3rd place's spot.
      }
      if (wordsCount >= twoMostUsed[0]) {// If our current word is ALSO greater than 2nd place:
        threeMostUsed = twoMostUsed;// The OLD 2nd place is now 3rd place
        twoMostUsed = [wordsCount, word];// The NEW 2nd place is our current word & count
      }
      if (wordsCount >= oneMostUsed[0]) {// And if it's ALSO greater than the current 1st place:
        threeMostUsed = twoMostUsed;// The old 2nd place goes to 3rd...
        twoMostUsed = oneMostUsed;// The old 1st place goes to 2nd...
        oneMostUsed = [wordsCount, word];// Our current word goes to 1st...
      }
    }
  });
  topThree = [oneMostUsed, twoMostUsed, threeMostUsed]
  return topThree;
}


  // call the word counter function here?


// What do we need to do?
// 1. Write a function that returns the three most used words in a passage of text.
//  1.1 Turn string into array

// 2. Write a function that omits offensive words. (e.g zoinks, muppeteer, biffaroni, and loopdaloop)