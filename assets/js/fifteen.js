let module = (function ($) {
  "use strict";

  let empty = { row: 3, col: 3 };
  let matrix = [];
  let puzzlearea, pieces;

  function isNextToEmpty(elem) {
    let position = JSON.parse(elem.dataset.coordinate);
    let { top, bottom, left, right } = getNeighbors(position);

    return (
      JSON.stringify(top) === JSON.stringify(empty) ||
      JSON.stringify(bottom) === JSON.stringify(empty) ||
      JSON.stringify(left) === JSON.stringify(empty) ||
      JSON.stringify(right) === JSON.stringify(empty)
    );
  }

  function movePiece(elem) {
    let coord = JSON.parse(elem.dataset.coordinate);
    let old = elem;
    matrix[empty.row][empty.col] = old;
    elem.style.top = empty.row * 100 + "px";
    elem.style.left = empty.col * 100 + "px";
    elem.dataset.coordinate = JSON.stringify(empty);
    empty = coord;
    matrix[coord.row][coord.col] = null;
  }

  function removeMoveableClass() {
    pieces.each((index, element) => {
      $(element).removeClass("movablepiece");
    });
  }

  function clickHandler() {
    removeMoveableClass();

    if (isNextToEmpty(this)) {
      movePiece(this);
    }

    addMoveableClassToNeighbors();
  }

  function addMoveableClassToNeighbors() {
    let { top, bottom, left, right } = getNeighbors(empty);

    if (top) {
      $(matrix[top.row][top.col]).addClass("movablepiece");
    }

    if (bottom) {
      $(matrix[bottom.row][bottom.col]).addClass("movablepiece");
    }

    if (left) {
      $(matrix[left.row][left.col]).addClass("movablepiece");
    }

    if (right) {
      $(matrix[right.row][right.col]).addClass("movablepiece");
    }
  }

  function getNeighbors(coord) {
    const { row, col } = coord;

    return {
      top: row > 0 ? { row: row - 1, col } : null,
      bottom: row < 3 ? { row: row + 1, col } : null,
      left: col > 0 ? { row, col: col - 1 } : null,
      right: col < 3 ? { row, col: col + 1 } : null,
    };
  }

  function otherShuffle() {}

  function shuffle() {
    removeMoveableClass();
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    // Fisher-Yates Algorithm
    for (let i = arr.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == arr.length) {
        empty = { row: Math.floor(i / 4), col: i % 4 };
        continue;
      } else {
        let row = Math.floor(i / 4);
        let col = i % 4;
        pieces[arr[i] - 1].dataset.coordinate = JSON.stringify({ row, col });
        pieces[arr[i] - 1].style.top = row * 100 + "px";
        pieces[arr[i] - 1].style.left = col * 100 + "px";
        matrix[row][col] = pieces[arr[i] - 1];
      }
    }
    addMoveableClassToNeighbors();
  }

  function init() {
    puzzlearea = $("#puzzlearea");
    pieces = $(".puzzlepiece");

    let index = 0;

    for (let i = 0; i < Math.ceil(pieces.length / 4); i++) {
      let row = [];
      for (let j = 0; j < 4; j++) {
        if (pieces[index]) {
          pieces[index].dataset.coordinate = JSON.stringify({ row: i, col: j });
          $(pieces[index]).on("click", clickHandler);
          row.push(pieces[index]);
        }

        index++;
      }
      matrix.push(row);
    }

    $("#shufflebutton").on("click", shuffle);

    addMoveableClassToNeighbors();
  }

  return {
    init,
  };
})(jQuery);

window.onload = module.init;
