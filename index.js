function pushEl(parent, tag, options) {
  var el = document.createElement(tag)
  for(var i = 0; i < Object.keys(options).length; i++) {
    el[Object.keys(options)[i]] = options[Object.keys(options)[i]]
  }
  parent.appendChild(el)

  return el
}

var SIZE = 5
var OPTIONS = [ "voltorb", 1, 2, 3 ]

function init() {
  var board = document.getElementById("board")
  var score = document.getElementById("score")
  var rows = document.getElementById("rows")
  var cols = document.getElementById("cols")
  var points = 1

  score.innerText = points

  var cards = []
  var cardEls = []

  var style = document.createElement("style")
  style.appendChild(document.createTextNode(""))
  document.head.appendChild(style)
  style.sheet.insertRule("#board { width: " + 56 * SIZE + "px; height: " + 56 * SIZE + "px; }")

  for(let i = 0; i < SIZE; i++) {
    cards[i] = []
    cardEls[i] = []
    for(let j = 0; j < SIZE; j++) {
      cards[i][j] = OPTIONS[Math.floor(Math.random() * OPTIONS.length)]
      pushEl(board, "div", {
        onclick: function(e) {
          var res = cards[i][j] === "voltorb" ? "X" : cards[i][j]
          if(res === "X") {
            alert("you loose")
            board.style.pointerEvents = "none"
          } else {
            points *= res
            e.target.style.pointerEvents = "none"
            score.innerText = points
          }
          pushEl(e.target, "p", {
            innerText: res
          })
        },
        className: "card",
      })
    }
  }

  for(let i = 0; i < SIZE; i++) {
    pushEl(rows, "p", {
      className: "meta-card",
      innerHTML: "p: " + cards[i].reduce((acc, cur) => acc + (typeof cur === "number" ? cur : 0), 0) + " <br /> " + 
                 "v: " + cards[i].reduce((acc, cur) => acc + (typeof cur === "string" ? 1 : 0), 0)
    })
    pushEl(cols, "p", {
      className: "meta-card",
      innerHTML: "p: " + cards.reduce((acc, cur) => acc + (typeof cur[i] === "number" ? cur[i] : 0), 0) + " <br /> " + 
                 "v: " + cards.reduce((acc, cur) => acc + (typeof cur[i] === "string" ? 1 : 0), 0)
    })
  }
  window.cards = cards
}

init()