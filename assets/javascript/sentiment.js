var temp = 0;
var x = '';
var temp1 = '';
var dataList;
var tempCount = 0;
var countArr = [];
var countArrays= [];
var addedCountArrays = [];

//MASTER FUNCTION THAT TIES IT ALL TOGETHER (SHOULD TAKE IN ARTICLES ARRAY)
function parse(parsedArticles) {
  jQuery.get('assets/javascript/AFINN-111.txt', function(txt) {}).done(function(txt) {
    dataList = parseData(txt);
    dictionary = parseData2(dataList);
    // database.ref().push({
    //   dictionary: dictionary,
    // });
    for (var z = 0; z < parsedArticles.length; z++) {
      countArr[z] = 0;
      for (var l = 0; l < parsedArticles[z].length; l++) {
        if (dictionary[0].includes(parsedArticles[z][l])) {
          var index = dictionary[0].indexOf(parsedArticles[z][l]);
          countArr[z] = (parseInt(dictionary[1][index]) + countArr[z]);
        }
      }
    }
    //RUN GRAPH FROM HERE!!! SUBSTITUTE FOR C LOG
    console.log(countArr);
  });
}

var score = false;
var words = [];
var scores = [];
var tempScore = '';
var tempWord = '';


//MAKING TWO SEPARATE ARRAYS FOR WORDS AND SCORES
function parseData2(dL) {
  var twoArr = [];
  for (var j = 0; j < dL.length; j++) {
    for (var f = 0; f < dL[j].length - 1; f++) {
      if (f < (dL[j].length - 3)) {
        if (dL[j][f] !== '  ') {
          tempWord = tempWord + dL[j][f];
        }
      } else {
        if (dL[j][f] !== '  ') {
          tempScore = tempScore + dL[j][f];
        }
      }
    }
    scores.push(tempScore);
    tempScore = '';
    words.push(tempWord);
    tempWord = '';
  }
  var dictionary = [];
  dictionary.push(words);
  dictionary.push(scores);

  return dictionary;
}

//MAKING ARRAY OUT OF TXT DOC
function parseData(data) {
  var arr = [];
  for (var i = 0; i < data.length; i++) {
    if (data[i] === '\n') {
      for (var y = temp; y <= i; y++) {
        var x = data[y];
        temp1 = temp1 + x;
      }
      arr.push(temp1);
      temp = (i + 1);
      temp1 = '';
    }
  }
  return arr;
}

//TURNING ARTICLES TO ARRAYS OF WORDS
var tempArticle;
var newsArr = ['Walgreens Boots Alliance and Rite Aid nixed their $9.4 billion merger agreement, which had been heavily scrutinized by antitrust regulators, and reached a new deal in which Walgreens will instead buy half of Rite Aid’s stores for $5.18 billion in cash', 'Walgreens Boots Alliance and Rite Aid nixed their $9.4 billion merger agreement, which had been heavily scrutinized by antitrust regulators, and reached a new deal in which Walgreens will instead buy half of Rite Aid’s stores for $5.18 billion in cash', 'I heard poorly rated @Morning_Joe speaks badly of me (dont watch anymore). Then how come low I.Q. Crazy Mika, along with Psycho Joe, came'];
var parsedArticles = [];
function arraying(newsArr) {
  for (var t = 0; t < newsArr.length; t++) {
    var tempArticle = newsArr[t].split(/[ ,."']+/);
    parsedArticles.push(tempArticle);
    for (var b = 0; b < tempArticle.length; b++) {
      tempArticle[b] = (tempArticle[b]).toLowerCase();
    }
  }
  return parsedArticles;
}

//CALLING FUNCS
parsedArticles = arraying(newsArr);
parse(parsedArticles);
