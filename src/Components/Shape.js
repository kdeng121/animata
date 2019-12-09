import React, { Component } from 'react';
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';


class Shape extends React.Component {

    constructor(props){
        super(props);
    }
    move(x_offset, y_offset) {
        // to() is a method of `Konva.Node` instances
        this.shape.to({
          x: this.shape.getAttr('x') + x_offset,
          y: this.shape.getAttr('y') + y_offset,
          duration: .5
        });
    }

    changeParam(param, newValue){
        if (param == 'color'){
            //this.shape.fill(newValue);
            this.shape.to({
                fill: newValue
            });
        }

        if (param == 'height'){
            this.shape.to({
                height: newValue
            });
        }
        if (param == 'width'){
            this.shape.to({
                width: newValue
            });
        }
        if (param == 'radius'){
            this.shape.to({
                radius: newValue
            });
        }
    }


    render() {
        if (this.props.shapeProps.type == "rectangle"){
            return (
                <Rect
                  ref={node => {
                    this.shape = node;
                  }}
                  x={this.props.shapeProps.x}
                  y={this.props.shapeProps.y}
        
                  width={this.props.shapeProps.width}
                  height={this.props.shapeProps.height}
                  fill={this.props.shapeProps.fill}
                  id={this.props.shapeProps.id}
                  draggable
                />
            );
        }

        if (this.props.shapeProps.type == "circle"){
            return (
                <Circle
                    ref={node => {
                        this.shape = node;
                    }}
                    x={this.props.shapeProps.x}
                    y={this.props.shapeProps.y}
                    radius={this.props.shapeProps.radius}
                    fill={this.props.shapeProps.fill}
                    id={this.props.shapeProps.id}
                    draggable
                />
            );
        }

        if (this.props.shapeProps.type == "text"){
            return (
                <Text
                    ref={node => {
                        this.shape = node;
                    }}
                    x={this.props.shapeProps.x}
                    y={this.props.shapeProps.y}
                    text={this.props.shapeProps.text}
                    id={this.props.shapeProps.id}
                    fontSize={20}
                    draggable
                />
            );
        }
        return null;
    }
}

export default Shape;

