import React, { Component } from "react"
import Board from "../component/Board"

class GameManager extends Component {
  constructor(props) {
    super(props)
    this.state = {
      matchItems: [],
      buttonText: "End Game",
      tileHiddenState: false,
      numOfTilesClicked: 0,
      tilesClicked: [],
      matchesFound: 0
    }
  }

  componentDidMount() {
    this.createMatchItems()
    this.hideTiles()
  }

  reStartGame = () => {
    if (this.state.buttonText === "End Game") {
      this.setState({ buttonText: "Start Game" })
    } else {
      this.setState({ tileHiddenState: false, matchesFound: 0, buttonText: "End Game" }, () => {
        this.createMatchItems()
        this.hideTiles()
      })
    }
  }

  hideTiles = () => {
    setTimeout(() => {
      this.setState({ tileHiddenState: true })
    }, 3000)
  }

  createMatchItems = () => {
    let randomizedArray = []

    for (let i = 0; i < 12; i++) {
      let randomNum = Math.floor(Math.random() * 101)
      randomizedArray.push({ value: randomNum, clicked: false })
      randomizedArray.push({ value: randomNum, clicked: false })
    }
    randomizedArray = this.shuffle(randomizedArray)
    this.setState({ matchItems: randomizedArray })
  }

  shuffle = (array) => {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }
    return array
  }

  squareClicked = (idx) => {
    if (this.state.matchItems[idx].clicked === false && this.state.buttonText === "End Game") {
      console.log("clicked", idx)
      this.state.numOfTilesClicked++
      this.setState(
        {
          numOfTilesClicked: this.state.numOfTilesClicked
        },
        () => {
          if (this.state.numOfTilesClicked > 2) {
          } else {
            this.state.tilesClicked.push({ ...this.state.matchItems[idx], idx })
            this.state.matchItems[idx].clicked = true
            this.setState(
              {
                tilesClicked: this.state.tilesClicked,
                matchItems: this.state.matchItems
              },
              () => {
                if (this.state.numOfTilesClicked === 2) {
                  if (this.state.tilesClicked[0].value === this.state.tilesClicked[1].value) {
                    this.state.matchesFound++
                    this.setState({
                      numOfTilesClicked: 0,
                      tilesClicked: [],
                      matchesFound: this.state.matchesFound
                    })
                  } else {
                    setTimeout(() => {
                      this.state.matchItems[this.state.tilesClicked[0].idx].clicked = false
                      this.state.matchItems[this.state.tilesClicked[1].idx].clicked = false
                      this.setState({
                        matchItems: this.state.matchItems,
                        numOfTilesClicked: 0,
                        tilesClicked: []
                      })
                    }, 3000)
                  }
                }
              }
            )
          }
        }
      )
    }
  }

  render() {
    return (
      <div className="container">
        <h1>Memory Game</h1>
        <Board
          matchItems={this.state.matchItems}
          tileHiddenState={this.state.tileHiddenState}
          squareClicked={this.squareClicked}
        />
        <br />
        <button onClick={this.reStartGame}>{this.state.buttonText}</button>
        <br />
        <h1>Matches Found {this.state.matchesFound}</h1>
      </div>
    )
  }
}

export default GameManager
