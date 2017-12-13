"use strict";

/* global describe it expect */
const { bestMove, randomMove } = require("../src/ai.js");

const empty10x10 = Array.from({ length: 10 * 10 }, () => 0);
const full10x10 = Array.from({ length: 10 * 10 }, (_, i) => i % 2 + 1);

const allButFirstFull10x10 = (() => {
    let t = [...full10x10];

    t[0] = 0;
    return t;
})();

const allButLastFull10x10 = (() => {
    let t = [...full10x10];

    t[99] = 0;
    return t;
})();

describe("randomMove", () => {
    it("should generate position", () => {
        const pos = randomMove(empty10x10, 10);

        expect(pos).toHaveProperty("x");
        expect(pos).toHaveProperty("y");
    });

    it("should return null if board is full", () => {
        const pos = randomMove(full10x10, 10);

        expect(pos).toBe(null);
    });

    it("should return first pos on all but first", () => {
        const pos = bestMove(allButFirstFull10x10, 10);

        expect(pos).toEqual({ x: 0, y: 0 });
    });

    it("should return last pos on all but last", () => {
        const pos = bestMove(allButLastFull10x10, 10);

        expect(pos).toEqual({ x: 9, y: 9 });
    });
});

describe("bestMove", () => {
    it("should generate position", () => {
        const pos = bestMove(empty10x10, 10);

        expect(pos).toHaveProperty("x");
        expect(pos).toHaveProperty("y");
    });

    it("should return null if board is full", () => {
        const pos = bestMove(full10x10, 10);

        expect(pos).toBe(null);
    });

    it("should place winning move", () => {
        const size = 10;
        // prettier-ignore
        const board = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 1, 2, 0, 0, 0, 0,
            0, 0, 0, 0, 1, 2, 0, 0, 0, 0,
            0, 0, 0, 0, 1, 2, 0, 0, 0, 0,
            0, 0, 0, 0, 1, 2, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ];

        // prettier-ignore
        const winningBoard = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 1, 0, 0, 0, 0, 0, //<-- First winning pos
            0, 0, 0, 0, 1, 2, 0, 0, 0, 0,
            0, 0, 0, 0, 1, 2, 0, 0, 0, 0,
            0, 0, 0, 0, 1, 2, 0, 0, 0, 0,
            0, 0, 0, 0, 1, 2, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ];

        const pos = bestMove(board, size);

        board[pos.x + pos.y * size] = 1;

        expect(board).toEqual(winningBoard);
    });

    it("should place blocking move", () => {
        const size = 10;
        // prettier-ignore
        const board = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 2, 2, 2, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ];

        // prettier-ignore
        const blockingBoard = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
            0, 0, 0, 1, 2, 2, 2, 0, 0, 0, //<-- First blocking pos
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ];

        const pos = bestMove(board, size);

        board[pos.x + pos.y * size] = 1;

        expect(board).toEqual(blockingBoard);
    });

    it("should return first pos on all but first", () => {
        const pos = bestMove(allButFirstFull10x10, 10);

        expect(pos).toEqual({ x: 0, y: 0 });
    });

    it("should return last pos on all but last", () => {
        const pos = bestMove(allButLastFull10x10, 10);

        expect(pos).toEqual({ x: 9, y: 9 });
    });
});
