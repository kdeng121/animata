import React, { Component } from 'react';
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';


class MyRect extends React.Component {
    moveForward = () => {
      // to() is a method of `Konva.Node` instances
      this.rect.to({
        x: this.rect.getAttr('x') + 50,
        duration: .5
      });
    };
    
    render() {
      return (
        <Rect
          ref={node => {
            this.rect = node;
          }}
          x={this.props.shapeProps.x}
          y={this.props.shapeProps.y}

          width={this.props.shapeProps.width}
          height={this.props.shapeProps.height}
          fill={this.props.shapeProps.fill}
          id={this.props.shapeProps.id}
          draggable
          onClick={this.moveForward.bind(this)}
        />
        );
    }
}

export default MyRect;

