import React, { Component } from 'react';
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';


class MyCircle extends React.Component {
    moveForward = () => {
      // to() is a method of `Konva.Node` instances
      this.circle.to({
        x: this.circle.getAttr('x') + 50,
        duration: .5
      });
    };
    
    render() {
      return (
        // <Circle
        //   ref={node => {
        //     this.circle = node;
        //   }}
        //   x={this.props.shapeProps.x}
        //   y={this.props.shapeProps.y}
        //   radius={this.props.shapeProps.radius}
        //   fill={this.props.shapeProps.fill}
        //   id={this.props.shapeProps.id}
        //   draggable
        //   onClick={this.moveForward}
        // />
        <div>
            hello1
        </div>
        );
    }
}

export default MyCircle;

