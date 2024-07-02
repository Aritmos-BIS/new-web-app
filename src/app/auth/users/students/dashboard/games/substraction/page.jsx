"use client"

import React, { Component, useState, useEffect  } from 'react';
import Image from 'next/image';

class SumGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num1: 13,
      num2: 12,
      playerAnswer: '',
      enemyAnswer: '',
      correctAnswer: 1,
      playerLives: 3,
      enemyLives: 5,
      gameover: false,
      resultMessage: '',
      correctGif1: '/gifs/Ari_att.gif',
      incorrectGif1: '/gifs/Ari_danio.gif',
      idleGif1: '/gifs/Ari_idle.gif',
      currentGif1: '/gifs/Ari_idle.gif',
      correctGif2: '/gifs/Plus&Moin-danio.gif',
      incorrectGif2: '/gifs/Plus&Moin-att.gif',
      idleGif2: '/gifs/Plus&Moin-idle.gif',
      currentGif2: '/gifs/Plus&Moin-idle.gif',
    };

    this.generateRandomNumbers(); // Initialize with random numbers
  }

  generateRandomNumbers() {
    let num1 = Math.floor(Math.random() * 20)+1;
    let num2 = Math.floor(Math.random() * 20)+1;
  
    // Asegurar que num1 sea mayor que num2
    if (num1 < num2) {
      const temp = num1;
      num1 = num2;
      num2 = temp;
    }
    const correctAnswer = num1 - num2;
    this.setState({
      num1,
      num2,
      correctAnswer,
      playerAnswer: '',
      enemyAnswer: '',
      gameover: false,
      resultMessage: '',
    });
  }
  
  checkAnswer = () => {
    const { playerAnswer, correctAnswer, playerLives, enemyLives } = this.state;
    if (parseInt(playerAnswer, 10) === correctAnswer) {
      this.generateRandomNumbers();
      if (enemyLives > 0) {
        this.setState({ enemyLives: enemyLives - 1 });
        if (enemyLives === 1) {
          this.setState({ gameover: true, resultMessage: 'You Win!' });
        }
      }
      // Set the GIF to the correct GIF
      this.setState({
        currentGif1: this.state.correctGif1,
        currentGif2: this.state.correctGif2,
        currentGifTimeout: setTimeout(() => {
          this.setState({ currentGif1: this.state.idleGif1 });
          this.setState({ currentGif2: this.state.idleGif2 });
        }, 5000),
      });
    } else {
      if (playerLives > 0) {
        this.setState({ playerLives: playerLives - 1 });
        if (playerLives === 1) {
          this.setState({ gameover: true, resultMessage: 'You Lose!' });
        }
      }
      // Set the GIF to the incorrect GIF
      this.setState({
        currentGif1: this.state.incorrectGif1,
        currentGif2: this.state.incorrectGif2,
        currentGifTimeout: setTimeout(() => {
          this.setState({ currentGif1: this.state.idleGif1 });
          this.setState({ currentGif2: this.state.idleGif2 });
        }, 5000),
      });
    }
  };
  

  reloadGame = () => {
    window.location.reload(); // Refresh the page
  }

  handleChange = (e, type) => {
    const inputValue = e.target.value;
  
      if (/^\d*$/.test(inputValue)) {
        this.setState({ [`${type}Answer`]: inputValue });
  
        // Set the GIF to the idle GIF
        this.setState({
          currentGif1: this.state.idleGif1,
          currentGif2: this.state.idleGif2,
          currentGifTimeout: setTimeout(() => {
            this.setState({ currentGif1: this.state.idleGif1 });
            this.setState({ currentGif2: this.state.idleGif2 });
          }, 5000),
        });
      } else {
        // Mostrar una alerta en caso de no ser un número
        alert('Ingrese solo números válidos');
      }
    
  };
  
  

  // Moved the useEffect hook to the render method
  render() {
    const { num1, num2, playerAnswer, enemyAnswer, playerLives, enemyLives, gameover, resultMessage,  currentGif1, currentGif2} = this.state;
    
    const playerLifeBarWidth = (playerLives / 3) * 100;
    const enemyLifeBarWidth = (enemyLives / 5) * 100;

    return (
      
      <div className="container mx-auto text-center mt-10">
        <h1 className="text-3xl font-semibold mb-4">Sum Game</h1>
        
        <div className="container mx-auto flex justify-center items-center space-between py-3">
          <Image
            src={currentGif1}
            alt="GIF"
            width={250}
            height={250}
            objectFit="contain"
          />

          <Image
            src={currentGif2}
            alt="GIF"
            width={250}
            height={250}
            objectFit="contain"
          />
        </div>
     
        {gameover ? (
        <div>
          <p>{resultMessage}</p>
          <button onClick={this.reloadGame} className="bg-blue-500 text-white p-2 rounded">
            Reload
          </button>
        </div>
      ) : (
        <div className="mb-4">
          <div className="text-left">
            <p>Player Lives:</p>
            <div className="relative h-6 rounded-full overflow-hidden bg-gray-300">
              <div className="h-6 bg-green-500 animate-pulse" style={{ width: `${playerLifeBarWidth}%` }}></div>
            </div>
          </div>
          <div className="text-right">
            <p>Enemy Lives:</p>
            <div className="relative h-6 rounded-full overflow-hidden bg-gray-300">
              <div className="h-6 bg-red-500 animate-pulse" style={{ width: `${enemyLifeBarWidth}%` }}></div>
            </div>
          </div>
        </div>
      )}

      {playerLives > 0 && enemyLives > 0 && !gameover && (
        <div>
          <p className="text-lg mb-2">Your Lives: {playerLives}</p>
          <p className="text-2xl mb-4">
            {num1} - {num2} =
            <input
              type="number"
              value={playerAnswer}
              onChange={(e) => this.handleChange(e, 'player')}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  this.checkAnswer();
                }
              }}
              className="border border-gray-400 p-2 rounded ml-2 text-black"
            />
            <button onClick={this.checkAnswer} className="bg-blue-500 text-white p-2 rounded ml-2">
              Check
            </button>
          </p>
        </div>
      )}
    </div>
  );

  }
}

export default SumGame;
