/**
 *  A module to calculate a move in Gomoku
 *
 *  Ripped and modified from Zebra_Gomoku by Stefan Gabos.
 *
 * Some day I have to write my own...
 *
 *  Visit {@link https://github.com/stefangabos/Zebra_Gomoku} for more information.
 */
"use strict";

function nextBestMove(board, boardSize) {
    var m,
        l,
        position,
        type,
        line,
        totalCells,
        consecutiveCells,
        emptySides,
        bestScore,
        cellScore,
        directionScore,
        score;

    // iterate through all the board's cells
    for (var i = boardSize * boardSize; i--; ) {
        // skip to next cell if this cell is owned by the computer
        // if (board[i] == 1) continue;

        // by default, the best move is the first free cell
        // (position, attack, defense)

        if (bestScore === undefined) {
            bestScore = [i, 0, 0];
        }
        // we will give a "score" to the position,
        // based on its surroundings horizontally, vertically and
        // on both diagonals; for example: for a row like 000XXPXX000 (where "0" means empty,
        // "X" represents the opponent's pieces and "P" is the position for which we are
        // determining the "score", we would check
        // 0|00XXP|XX000, 00|0XXPX|X000, 000|XXPXX|000, 000X|XPXX0|00, 000XX|PXX00|0,
        // and then we would do the same on the vertical, and on both diagonals)

        // cell's default score (attack and defense)
        cellScore = [0, 0];

        // the 4 directions to check: vertical, horizontal, diagonal /, diagonal \ (in this order)
        for (var j = 4; j--; ) {
            // the default score for the direction we're checking
            directionScore = [0, 0];

            // check the 5 possible outcomes, as described above
            // (if we're checking whether the player won,
            // we'll do this iteration only once, checking for 5 in a row)
            for (var k = !board[i] ? 5 : 1; k--; ) {
                // initialize the type of cells we're looking for,
                // and the array with the cells on the current direction
                type = board[i] || undefined;
                line = [];

                // check the 5 pieces for each possible outcome, plus the 2 sides
                for (l = 7; l--; ) {
                    // used to compute position
                    m = -5 + k + l;
                    var n = i % boardSize;

                    if (
                        // vertical
                        ((j === 0 &&
                            (position = i + boardSize * m) !== false &&
                            n == position % boardSize) ||
                            // horizontal
                            (j == 1 &&
                                (position = i + m) !== false &&
                                ~~(position / boardSize) == ~~(i / boardSize)) ||
                            // diagonal /
                            (j == 2 &&
                                (position = i - boardSize * m + m) !== false &&
                                ((position > i && position % boardSize < n) ||
                                    (position < i && position % boardSize > n) ||
                                    position == i)) ||
                            // diagonal \
                            ((j == 3 &&
                                (position = i + boardSize * m + m) !== false &&
                                ((position < i && position % boardSize < n) ||
                                    (position > i && position % boardSize > n))) ||
                                position == i)) &&
                        // the position is not off-board
                        position >= 0 &&
                        position < boardSize * boardSize &&
                        // the cell is of the same type as the ones we are looking for
                        // or, we are checking the score for an empty cell,
                        // the current position is empty,
                        // or is "undefined" (meaning we didn't yet find any non-empty cells)
                        (board[position] == type ||
                            (!board[i] && (!board[position] || undefined === type)) ||
                            // or we're just checking the sides
                            !l ||
                            l == 6)
                    ) {
                        // add position to the line
                        line.push(position);

                        // if we're not just checking the sides,
                        // this is not an empty cell, and is of the same type as
                        // the ones we're looking for,
                        // update the type of cells we're looking for
                        // (we use ^ instead of !=)
                        if (l && l ^ 6 && undefined === type && board[position]) {
                            type = board[position];
                        }

                        // if the computed position is off-board,
                        // but this is a side - cell, save it as "undefined"
                    } else if (!l || l == 6) {
                        line.push(undefined);
                    } else {
                        // skip the rest of the test if we found this row to be "non-compliant"
                        // (a different type of cell than the ones we're looking for,
                        // one of the 5 cells is off - board)
                        break;
                    }
                }

                // if we added exactly 7 position to our line, and
                // the line is not containing * only * empty cells
                if (line.length == 7 && undefined !== type) {
                    // if we are checking whether the player won,
                    // set this flag so that later on we do not
                    // overwrite the value of the cell
                    m = board[i] ? true : false;

                    // calculate the score when setting the current cell to
                    // the same type as the other ones we found
                    board[i] = type;

                    // calculate the number of consecutive cells we get like this
                    // (we'll do this by looking in our "line" array)
                    consecutiveCells = 0;
                    totalCells = 0;
                    emptySides = 0;

                    // the total number of cells of the same type
                    for (l = 5; l--; ) {
                        if (board[line[l + 1]] == type) {
                            totalCells++;
                        }
                    }

                    // look to the left of the current cell
                    for (
                        l = line.indexOf(i) - 1;
                        l >= 0;
                        // if the cell is of the same type,
                        //increment the number of consecutive cells
                        l--
                    ) {
                        if (board[line[l]] == type) {
                            consecutiveCells++;
                        } else {
                            // otherwise
                            // if the adjacent cell is empty, increment the number of empty sides
                            // we have to use === 0 (instead of !) because it
                            // can also be "undefined"
                            if (board[line[l]] === 0) {
                                emptySides++;
                            }

                            // don't look further
                            break;
                        }
                    }

                    // look to the right of the current cell
                    for (
                        l = line.indexOf(i);
                        l < line.length;
                        // if the cell is of the same type,
                        // increment the number of consecutive cells
                        l++
                    ) {
                        if (board[line[l]] == type) {
                            consecutiveCells++;
                        } else {
                            // otherwise
                            // if the adjacent cell is empty, increment the number of empty sides
                            // we have to use === 0 (instead of !)
                            // because it can also be "undefined"
                            if (board[line[l]] === 0) {
                                emptySides++;
                            }

                            // don't look further
                            break;
                        }
                    }

                    // give a score to the row based on the
                    // array below(number of cells / empty sides)
                    score = [[0, 1], [2, 3], [4, 12], [10, 64], [256, 256]][
                        consecutiveCells >= totalCells
                            ? Math.min(consecutiveCells, 5) - 1
                            : totalCells - 1
                    ][consecutiveCells >= totalCells ? (emptySides ? emptySides - 1 : 0) : 0];

                    // reset the cell's value (unless we are looking to see if the player won)
                    if (!m) {
                        board[i] = 0;
                    }
                    // } else if (score >= 256) {
                    //     // if the player won, update the score
                    //     score = 1024;
                    // }

                    // if, so far, this is the best
                    // attack / defense score(depending on the value of "type")
                    // for this direction, update it
                    if (score > directionScore[type - 1]) {
                        directionScore[type - 1] = score;
                    }
                }
            }

            // update the cell's attack and defense score
            // (we simply sum the best scores of all 4 directions)
            for (k = 2; k--; ) {
                cellScore[k] += directionScore[k];
            }
        }

        // used below
        j = cellScore[0] + cellScore[1];
        k = bestScore[1] + bestScore[2];

        // if cell's attack + defense score is better than
        // the current best attack and defense score
        // or, cell's score is equal to the best score,
        // but computer's move is better or equal to the player's,
        // and the current best move is not *exactly* the same
        if (
            (j > k || (j == k && cellScore[0] >= bestScore[1])) &&
            // we're checking the score of an empty cell,
            // or we're checking to see if the player won and he won
            // (we don't update the score when checking if the
            // player won * unless * the player actually won)
            (!board[i] || cellScore[1] >= 1024)

            // update best score (position, attack, defense)
        ) {
            bestScore = [i, cellScore[0], cellScore[1]];
        }
    }

    // Calculation done return x, y
    var x, y;

    y = Math.floor(bestScore[0] / boardSize);
    x = bestScore[0] % boardSize;

    return { x, y };
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// randomMove :: ([Mark], Size) -> Position
//  Mark = 0 | 1 | 2
//  Size = Integer
//  Position = { x: Integer, y: Integer }
function randomMove(board, boardSize) {
    if (board.every(x => x !== 0)) {
        return null;
    }
    var x, y;

    do {
        x = getRandomIntInclusive(0, boardSize);
        y = getRandomIntInclusive(0, boardSize);
    } while (board[x + y * boardSize] !== 0);

    return { x, y };
}

// bestMove :: ([Mark], Size) -> Position
//  Mark = 0 | 1 | 2
//  Size = Integer
//  Position = { x: Integer, y: Integer }
function bestMove(board, boardSize) {
    var pos = nextBestMove(board, boardSize);

    // On occasion the algoritm calcs a position that is already taken
    // Catch that and randomize something.
    if (board[pos.x + pos.y * boardSize] !== 0) {
        pos = randomMove(board, boardSize);
    }

    return pos;
}

module.exports = { bestMove, randomMove };
