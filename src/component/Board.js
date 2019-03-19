import React, { Component } from "react"
import Tile from "./Tile"

const Board = (props) => {
  return (
    <div className="board">
      {props.matchItems.map((tile, index) => {
        return (
          <Tile
            tileInfo={tile}
            tileHiddenState={props.tileHiddenState}
            squareClicked={props.squareClicked}
            index={index}
          />
        )
      })}
    </div>
  )
}

export default Board
