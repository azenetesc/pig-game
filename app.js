'use strict';
const newGame = document.querySelector(".btn--new");
const rollDice = document.querySelector(".btn--roll");
const holdScore = document.querySelector(".btn--hold");
let diceBlock = document.querySelector(".dice");
const p0 = {
  currentP : document.querySelector('#current--0'),
  scoreP : document.querySelector('#score--0'),
  playerP : document.querySelector('.player--0')
}
const p1 = {
  currentP : document.querySelector('#current--1'),
  scoreP : document.querySelector('#score--1'),
  playerP : document.querySelector('.player--1')
}
let scores, activePlayer, currentScore, IsGameOn;

const reset = function (){
  for(let p of [p0,p1]){
    p.currentP.textContent = 0;
    p.scoreP.textContent = 0;
    p.playerP.classList.remove('player--winner');
  }  
  diceBlock.classList.add('hidden');
  p0.playerP.classList.add('player--active');
  p1.playerP.classList.remove('player--active');
  activePlayer = 0;
  IsGameOn = true;
  scores = [0, 0];
  currentScore = 0;
}

reset();
const switchPlayer = function (){
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  for(let player of [p0, p1]){
    player.playerP.classList.toggle("player--active");
  }
}

rollDice.addEventListener('click', ()=>{
  if(IsGameOn){
  const diceNumber = Math.trunc(Math.random() * 6) + 1; 
  console.log(diceNumber);
  diceBlock.classList.remove('hidden');
  diceBlock.src = `images/dice-${diceNumber}.png`
  if(diceNumber !== 1){
    currentScore += diceNumber;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  } else{
    switchPlayer();
  }
}
});

holdScore.addEventListener('click', ()=>{
  if(IsGameOn){
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
  if(scores[activePlayer] >= 20){
    IsGameOn = false;
    diceBlock.classList.add("hide");
  document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
  } else{
    switchPlayer()
  }
}
})

newGame.addEventListener('click', ()=>{
  reset();
})