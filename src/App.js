import React, { Component } from 'react';
import './App.css';
import AceEditor from 'react-ace';
import brace from 'brace';
import Konva from 'konva';
import { render } from 'react-dom';
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';
import Shape from './Components/Shape'; // Import a component from another file

import 'brace/theme/github';



class App extends React.Component {


  constructor(props){
    super(props);

    this.state = {
      allShapes:[
        {
          type: 'rectangle',
          x: 500,
          y: 100,
          width: 100,
          height: 100,
          fill: 'red',
          id: 'rect1'
        },
        {
          type: 'rectangle',
          x: 150,
          y: 150,
          width: 100,
          height: 100,
          fill: 'green',
          id: 'rect2'
        },
        {
          type: 'circle',
          x: 100,
          y: 100,
          radius: 50,
          fill: 'black',
          id: 'circle1'
        }
      ],
      codeValue: ""
    }

    this.myRefs = [];

    for (var i=0; i<this.state.allShapes.length; i++){
      this.myRefs[i] = React.createRef();
    }
  }
  


  clearCanvas(){
    this.setState({allShapes: [], myRefs: []}, () => console.log("Cleared canvas: ", this.state.allShapes));

  }


  moveRelative(objectId, x_dist, y_dist){
    console.log("OBJECT ID: ", objectId);
    console.log("MY REFS", this.state.myRefs);
    for (var i=0; i<this.state.allShapes.length; i++){
      if (objectId == this.state.allShapes[i].id){
        this.myRefs[i].current.move(x_dist, y_dist);
        break;
      }
    }

  }

  parseCode(){
    // this.setState({allShapes: [], myRefs: []}, () => {

      var lines = this.state.codeValue.split('\n');
      for(var i=0; i<lines.length; i++){
        var line = lines[i];
        var parts = line.split(' ');
        var command = parts[0];
  
        if (command == "circle"){
          this.addShape({
            type: command,
            x: parts[1],
            y: parts[2],
            radius: parts[3],
            fill: parts[4],
            id: parts[5]
          });
        }
  
        if (command == "rectangle"){
          this.addShape({
            type: command,
            x: parts[1],
            y: parts[2],
            width: parts[3],
            height: parts[4],
            fill: parts[5],
            id: parts[6]  
          });
        }

        if (command == "text"){
          this.addShape({
            type: command,
            x: parts[1],
            y: parts[2],
            text: parts[3],
            id: parts[4]
          })
        }
  
        if (command == "moveRelative"){
          const target = parts[1];
          const x_offset = parseInt(parts[2]);
          const y_offset = parseInt(parts[3]);
          this.moveRelative(target, x_offset, y_offset);
        }
      }

    // });
  }

  onChange(newValue) {
    this.setState({
      codeValue: newValue
    });
  }


  addShape(props){
    this.myRefs.push(React.createRef());

    const newShape = {
      type: props.type,
      x: parseInt(props.x),
      y: parseInt(props.y),
      width: parseInt(props.width),
      height: parseInt(props.height),
      radius: parseInt(props.radius),
      text: props.text,
      fill: props.fill,
      id: props.id
    };
    this.setState({ allShapes: [...this.state.allShapes, newShape] }, () => console.log(this.state.allShapes));
  }

  // addRectangle(props){
  //   this.myRefs[this.myRefs.length] = React.createRef();
  //   const newRectangle = {
  //     type: 'rectangle',
  //     x: parseInt(props.x),
  //     y: parseInt(props.y),
  //     width: parseInt(props.width),
  //     height: parseInt(props.height),
  //     fill: props.fill,
  //     id: props.id
  //   };
  //   this.setState({ allShapes: [...this.state.allShapes, newRectangle] });
  // }

  // addCircle(props){
  //   this.myRefs[this.myRefs.length] = React.createRef();

  //   const newCircle = {
  //     type: 'circle',
  //     x: parseInt(props.x),
  //     y: parseInt(props.y),
  //     radius: parseInt(props.radius),
  //     fill: props.fill,
  //     id: props.id
  //   };
  //   this.setState({ allShapes: [...this.state.allShapes, newCircle] });
  // }

  

  render() {
    return (
      <div className="App">
        <header>
          <h1>
            Animata
          </h1>
        </header>
        
        <div className="rowC">
          <div className="editor">
            <AceEditor
              theme="github"
              onChange={this.onChange.bind(this)}
              name="UNIQUE_ID_OF_DIV"
              editorProps={{$blockScrolling: true}}
              fontSize={16}
              value={this.state.codeValue}
            />
            <button onClick={this.parseCode.bind(this)}>RUN</button>
            <button onClick={this.clearCanvas.bind(this)}>CLEAR</button>


          </div>
          

          <div className="stage">
            <Stage width={700} height={600}>
              <Layer>
                {this.state.allShapes.map((shape, i) => {                
                  return (
                    <Shape
                      key={i}
                      shapeProps={shape}
                      ref={this.myRefs[i]}
                    />
                  );
                })}

                {/* {this.state.rects.map((rect, i) => {
                  return (
                    <MyRect
                      key={i}
                      shapeProps={rect}
                      ref={this.myRefs[i]}
                    />
                  );
                })}
                {this.state.circles.map((circ, i) => {
                  return (
                    <MyCircle
                      key={i}
                      shapeProps={circ}
                    />
                  );
                })} */}
              </Layer>
            </Stage>
          </div>
          
        </div>


        
      </div>
    );
  }

}

export default App;
