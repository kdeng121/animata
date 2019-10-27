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
          width={this.props.shapeProps.width}
          height={this.props.shapeProps.width}
          fill={this.props.shapeProps.fill}
          id={this.props.shapeProps.id}
          draggable
          onClick={this.moveForward}
        />
        );
    }
}

export default MyRect;

