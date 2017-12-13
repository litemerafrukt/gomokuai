# Simple gompku ai

[![Build Status](https://travis-ci.org/litemerafrukt/gomokuai.svg?branch=master)](https://travis-ci.org/litemerafrukt/gomokuai)
[![Maintainability](https://api.codeclimate.com/v1/badges/88a10f1a90b0434aa338/maintainability)](https://codeclimate.com/github/litemerafrukt/gomokuai/maintainability)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/litemerafrukt/gomokuai/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/litemerafrukt/gomokuai/?branch=master)
[![Code Coverage](https://scrutinizer-ci.com/g/litemerafrukt/gomokuai/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/litemerafrukt/gomokuai/?branch=master)
[![Build Status](https://scrutinizer-ci.com/g/litemerafrukt/gomokuai/badges/build.png?b=master)](https://scrutinizer-ci.com/g/litemerafrukt/gomokuai/build-status/master)

Calculates next move for a gomoku game.

## Install

`npm install gomokuai`.

## Usage

Gomokuai has a simple API with just two funktions:

```javascript
// bestMove :: ([Mark], Size) -> Position
//  Mark = 0 | 1 | 2
//  Size = Integer
//  Position = { x: Integer, y: Integer }
const bestMove = (board, boardSize) => {
    /*...*/
};

// randomMove :: ([Mark], Size) -> Position
//  Mark = 0 | 1 | 2
//  Size = Integer
//  Position = { x: Integer, y: Integer }
const randomMove = (board, boardSize) => {
    /*...*/
};
```

You put in a flat array representing your gomoku game board, the size of the game board (quadratic, eg 10x10 gives Size = 10) and you get back a position object.

`bestMove` calculates the best move to make on the current game board and `randomMove` just gives you a random placement on any free space.

Example

```javascript
const ai = require("gomokuai");

/* ... */

const { x, y } = ai.bestMove(gameBoard.getBoard(), gameBoard.getSize());
gameBoard.play(x, y);
```

## Tests

Clone the repo, cd in, `npm install`, `npm test`.

## TODO

* Write a new best-move calculator.
* Increase code quality.

## Shoutout

The best-move calculator is a ripped from a jQuery plugin by [Stefan Gabos](https://github.com/stefangabos)

Licens LGPL-3.0
