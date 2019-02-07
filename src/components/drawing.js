import React from "react";
import Paper from "paper";
import { getRandomArbitrary } from "../util";

class Drawing extends React.Component {
  componentDidMount() {
    Paper.setup(this.canvas);

    this.makeGrid(10, 10);
    let circleGroup = Paper.project.activeLayer.children[0];
    circleGroup.children.map(cell => {
      let circle = new Paper.Path.Circle(cell.bounds.center, 5);
      circle.strokeWidth = 2;
      let dot = new Paper.Path.Circle(circle.getPointAt(0), 5);
      dot.fillColor = "white";
      let offset = 0;
      let movement = getRandomArbitrary(0.1, 0.8);
      dot.onFrame = function() {
        this.bounds.center.set(circle.getPointAt(offset));
        offset += movement;
        if (offset > circle.length) {
          offset = 0;
        }
      };
      return circle;
    });
  }

  makeGrid = (cols, rows) => {
    let cellW = Paper.project.view.bounds.width / cols;
    let cellH = Paper.project.view.bounds.height / rows;
    let gridGroup = new Paper.Group();
    let pt = new Paper.Point(0, 0);
    for (let i = 0; i < rows; i++) {
      pt.set(new Paper.Point(0, cellH * i));
      for (let j = 0; j < cols; j++) {
        let cell = new Paper.Path.Rectangle(pt, new Paper.Size(cellW, cellH));
        gridGroup.addChild(cell);

        if (i % 2 === 1) {
          if (j % 2 === 0) {
            cell.name = "red";
          } else {
            cell.name = "blue";
          }
        }
        if (i % 2 === 0) {
          if (j % 2 === 1) {
            cell.name = "red";
          } else {
            cell.name = "blue";
          }
        }

        pt.set(cell.bounds.topRight);
      }
    }
  };
  render() {
    return (
      <div>
        <canvas
          id="myCanvas"
          ref={ref => {
            this.canvas = ref;
          }}
          width={300}
          height={300}
          className="backgroundCanvas"
        />
      </div>
    );
  }
}

export default Drawing;
