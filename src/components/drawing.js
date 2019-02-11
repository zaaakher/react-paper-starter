import React from "react";
import Paper from "paper";
import { getRandomArbitrary } from "../util";

class Drawing extends React.Component {
  componentDidMount() {
    Paper.setup(this.canvas);

    this.makeGrid(20, 20);
    let circleGroup = Paper.project.activeLayer.children[0];

    circleGroup.children.map((cell, i) => {
      // let circle = new Paper.Path.Circle(cell.bounds.center, 5);
      // circle.strokeWidth = 2;
      // let dot = new Paper.Path.Circle(circle.getPointAt(0), 5);
      // dot.fillColor = "white";
      // let offset = 0;
      // let movement = getRandomArbitrary(0.1, 0.8);
      // dot.onFrame = function() {
      //   this.bounds.center.set(circle.getPointAt(offset));
      //   offset += movement;
      //   if (offset > circle.length) {
      //     offset = 0;
      //   }
      // };
      // return circle;
      let path = new Paper.Path(
        cell.bounds.topLeft,
        new Paper.Point(cell.bounds.topRight.x, cell.bounds.topRight.y)
      );
      // path.strokeColor = "red";
      // path.strokeWidth = 1;
      // path.strokeCap = "round";
      path.bounds.center.set(cell.bounds.center);
      let offset = 0;
      // let n = 45;
      // path.rotate(i * n);
      let cir = new Paper.Path.Circle(path.getPointAt(path.length), 2);
      cir.fillColor = "white";
      let forwardMvmnt = true;
      cir.onFrame = function() {
        if (offset === 0) {
          forwardMvmnt = true;
        } else if (offset === Math.round(path.length) - 1) {
          forwardMvmnt = false;
          // offset--;
        }
        if (forwardMvmnt === true) {
          this.bounds.center.set(path.getPointAt(offset));
          offset++;
        } else if (forwardMvmnt === false) {
          this.bounds.center.set(path.getPointAt(offset));
          offset--;
        }
      };
      path.onFrame = function() {
        this.rotation += 0.01 * i;
        // console.log(this.rotation);
      };
      // path.rotate(i * 166);
      return cir;
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
          width={500}
          height={500}
          className="backgroundCanvas"
        />
      </div>
    );
  }
}

export default Drawing;
