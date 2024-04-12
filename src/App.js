/* Hey reviewers, welcome to the code, lets understand the logc behind the code together!!*/
import React from 'react';
import  {useState}  from 'react';
//Use State is a React Hook used to add/change "state" of an react component. While importing remember to add braces :'(
import './App.css';

//the "main" or the parent function is declared using keyword 'export default' which can later be imported in index.js file.
//In this game the main Function is Board(), it has several child functions/components,hooks.
export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  //Squares is an argument which is initialized using usestate as an array with 9 null elements.
  //This value can be updated using setter function(setSquare).
  //Whenever the setter fn is called, all the places where 'squares' is used, gets updated.
  //in the game, squares is used to store user input(x/o) in form of array.(array will make it simpler to analyse winning patterns)
  const [status, setStatus] = useState(true);
  //status is used while printing (X/O)

  function clickHandler(i){
    //fn is called when a square block is clicked, it takes index of square as parameter
    // this parameter will be used to update input into the array
    if(squares[i]|| Calculatewinner(squares)) return;
    //so that if winning pattern is formed or the box is already occupied then the function wont run

    const nextsquares=squares.slice();
    //this makes the previous array, immutable.
    if(status) nextsquares[i]='X';
    else nextsquares[i]='O';
    setStatus(!status);
    setSquares(nextsquares);
  }
  const winner=Calculatewinner(squares);
  let states;
  if(winner){
    states="WINNER: "+ winner;
  }
  else{
    states="Next Move: "+ (status?'X':'O');
  }
  //in square component, anonymous function is called,we cannot call the click handler fn directly,as it will call setter fn
  //thus creating an infinite loop
  return (
    <>
    <h1 className='heading'>TIC TAC TOE</h1>
    <div className="gameboard">
      <h1 className='text'>{states}</h1>
      <div className="row-1">
        <Square value={squares[0]} onSquareClick={()=>clickHandler(0)}/>
        <Square value={squares[1]} onSquareClick={()=>clickHandler(1)}/>
        <Square value={squares[2]} onSquareClick={()=>clickHandler(2)}/>
      </div>
      <div className="row-2">
        <Square value={squares[3]} onSquareClick={()=>clickHandler(3)}/>
        <Square value={squares[4]} onSquareClick={()=>clickHandler(4)}/>
        <Square value={squares[5]} onSquareClick={()=>clickHandler(5)}/>
      </div>
      <div className="row-3">
        <Square value={squares[6]} onSquareClick={()=>clickHandler(6)}/>
        <Square value={squares[7]} onSquareClick={()=>clickHandler(7)}/>
        <Square value={squares[8]} onSquareClick={()=>clickHandler(8)}/>
      </div>
    </div>

    </>
);
}

function Square({value,onSquareClick}){
  return (<button className="Square" onClick={onSquareClick}>{value}</button>);
}

function Calculatewinner(squares){
  const lines=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,8],
    [0,4,8],
  ]
  //listed the possible winning combinations
  //and compared them with the inputs, if matched, the square was returned!
  for(let i=0;i<lines.length ;i++){
    const [a,b,c]= lines[i];
    if(squares[a] && squares[a]==squares[b] && squares[a]==squares[c]) return squares[a];
  }
  return null;
}

//Thank you for reviewing my code! If there are any improvements to be made, please let me know on twitter or linkedin!
