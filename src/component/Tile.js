import React, { Component } from "react"

const Tile = (props) => {
  return (
    <div className="tile" onClick={() => props.squareClicked(props.index)}>
      <span>{props.tileHiddenState && props.tileInfo.clicked === false ? null : props.tileInfo.value}</span>
    </div>
  )
}

export default Tile
