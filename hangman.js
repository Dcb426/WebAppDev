$(document).ready(function() { 
    var hangman = { 
    alphabetArray: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    wordList: [],
    assetsLoaded: 0,
    theWord: "", 
    guessWord: [], 
    newGuessWord: "",
    theCanvas: $("#hangmancanvas").get(0),
    numWrong:0,
    gameOver: false,
    imageCounter: 0, 
    imageInterval: null,
    hangmanSheet: new Image(),
    score: 0,
    danceMusic: new Audio() 
}
hangman.hangmanSheet.addEventListener("load",incrementAssetsLoaded,false); 
hangman.hangmanSheet.src = "spriteSheet.png";
hangman.danceMusic.src = "lol.mp3"; 
hangman.danceMusic.addEventListener('canplaythrough',incrementAssetsLoaded,false); 
hangman.danceMusic.load();
var totalScore = 0;
var ctx = hangman.theCanvas.getContext("2d");
  $.ajax({ 
    type: 'GET', 
    url: "wordlist.txt", 
    success: function( data ) { 
      hangman.wordList = data.split("\r\n"); 
      if (hangman.wordList.length === 1) {  //no \r\n so assume \n alone is linebreak 
        hangman.wordList = data.split("\n"); 
      } 
      incrementAssetsLoaded(); 
    }, 
    dataType: "text" 
  });
  function incrementAssetsLoaded() { 
  hangman.assetsLoaded += 1; 
  if(hangman.assetsLoaded == 3){ 
    startGame();
  } 
  }
  function startGame(){ 
    createGuessWord();
    drawCanvas(); 
    enableButtons();
  }
  function doWin(){ 
     hangman.imageCounter = 0;
     hangman.danceMusic.currentTime=0; 
    hangman.imageInterval = setInterval(drawWinScreen,120); 
  }
  function drawWinScreen(){ 
    clearCanvas(ctx,hangman.theCanvas); 
    if(hangman.imageCounter >= 85){ 
      clearInterval(hangman.imageInterval); 
      setTimeout(clearAndRestartGame,3000); 
    } 
    ctx.drawImage(hangman.hangmanSheet,164*hangman.imageCounter,0,164,264,120,48,164,264); 
    drawText("CORRECT!!",20,375,"bold 35px serif","RED"); 
    hangman.imageCounter++;
    hangman.danceMusic.play(); 
  }
  function clearAndRestartGame(){ 
    hangman.danceMusic.pause();
    doGameOver(); 
  }
  function doGameOver(){ 
    hangman.numWrong = 0; 
    hangman.gameOver = false; 
    startGame(); 
  }
  function createGuessWord(){ 
    hangman.guessWord = new Array(); 
    var randomWord = Math.floor(Math.random() * hangman.wordList.length); 
    hangman.theWord = hangman.wordList[randomWord]; 
    if(hangman.theWord.length < 3 || hangman.theWord.length > 5){ 
      createGuessWord(); 
    } 
    alert(hangman.theWord);

    console.log(hangman.theWord); 
    for(var i = 0; i < hangman.theWord.length; i++){ 
        if(hangman.theWord.charAt(i) == "-"){ 
          hangman.guessWord[i] ="-"; 
        }else{ 
          hangman.guessWord[i]="?"; 
        } 
    } 
    hangman.newGuessWord = hangman.guessWord.join(""); 
  }
  function clearCanvas(context, canvas) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    var w = canvas.width;
    canvas.width = 1;
    canvas.width = w;
  }
  
  function drawGallows(){
    ctx.moveTo(120,305);
    ctx.lineTo(280,305);
    ctx.moveTo(260,305);
    ctx.lineTo(260,70);
    ctx.lineTo(180,70);
    ctx.lineTo(180,96);
    ctx.stroke();
  
  }
  function drawHead(){
      ctx.beginPath();
    ctx.arc(180,120,23,0,Math.PI*2,false);
    ctx.closePath();
    ctx.stroke();
    }
  function drawBody(){
        ctx.moveTo(180,143);
      ctx.lineTo(180,248);
      ctx.stroke();
   }
   function drawArm1(){
  ctx.moveTo(180,175);
  ctx.lineTo(142,167);
  ctx.stroke();
  }
  function drawArm2(){
    ctx.moveTo(180,175);
      ctx.lineTo(218,167);
      ctx.stroke();
   }
    function drawLeg1(){
    ctx.moveTo(180,245);
    ctx.lineTo(145,270);
    ctx.stroke();
  }
   function drawLeg2(){
    ctx.moveTo(180,245);
    ctx.lineTo(215,270);
    ctx.stroke();
  }
  function drawHangman(drawNum){ 
  switch(drawNum) 
  { 
     case 0: 
      drawGallows(); 
     break; 
     case 1: 
      drawHead(); 
     break; 
     case 2: 
      drawBody(); 
     break; 
     case 3: 
      drawArm1(); 
     break; 
     case 4: 
      drawArm2(); 
     break; 
     case 5: 
      drawLeg1(); 
     break; 
     case 6: 
      drawLeg2(); 
     break; 
     } 
  }
  function drawText(word,textX,textY,font,color){ 
    ctx.font = font; 
    ctx.fillStyle = color 
    ctx.fillText(word, textX, textY); 
  }
  function drawCanvas()
  { 
    clearCanvas(ctx,hangman.theCanvas); 
    ctx.font = "bold 35px serif"; 
    ctx.fillStyle = "#0000FF"; 
    ctx.fillText(hangman.newGuessWord,50,27);

    for(var i=0;i<=hangman.numWrong;i++){ 
    drawHangman(i); 
    } 
    if(hangman.gameOver){
      //alert("The correct word was\n "+hangman.theWord) 
      disableButtons();
      drawText("Wrong!!",20,225, "bold 35px serif","red"); 
      setTimeout(doGameOver,1500); 
    }else{ 
        drawText(hangman.newGuessWord,50,27,"bold 35px serif","#0000FF"); 
    } 
  }

  for (var i = 0; i < hangman.alphabetArray.length; i++) { 
    $('<button/>', { 
      text: hangman.alphabetArray[i], 
      id: 'btn_' + hangman.alphabetArray[i], 
      width: "10px", 
      click: function (event) { 
        checkGuess(event, false); 
      } 
    }).appendTo("#buttondiv"); 
  }
  function disableButtons(){ 
  $("#buttondiv button").attr("disabled","disabled"); 
  } 
  disableButtons();
  function enableButtons(){ 
  $("#buttondiv button").removeAttr("disabled"); 
  }
  function checkGuess(event,isKeyPress){ 
  var currentButton; 
  var theLetter; 
  var correctGuess = false; 
  currentButton = $(event.target); 
  $(currentButton).attr("disabled", "disabled"); 
  theLetter = $(currentButton).text().toLowerCase(); 
  for(var i =0; i < hangman.theWord.length; i++){ 
    if(hangman.theWord.charAt(i) == theLetter){ 
      hangman.guessWord[i] = theLetter; 
      correctGuess = true; 
    } 
  } 
  hangman.newGuessWord = hangman.guessWord.join(""); 
     
  if(!correctGuess){ 
    hangman.numWrong++ 
  } 
  if(hangman.newGuessWord == hangman.theWord){ 
    disableButtons();
    setTimeout(doWin,1500);
    //update score
  } 
  if(hangman.numWrong == 6){ 
    hangman.gameOver = true;
    //change later
  } 
  drawCanvas(); 
  }
});