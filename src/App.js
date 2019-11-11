import React, { Component } from 'react';
import './App.css';
import AceEditor from 'react-ace';
import brace from 'brace';
import Konva from 'konva';
import { render } from 'react-dom';
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';
import Shape from './Components/Shape'; // Import a component from another file
import 'brace/theme/github';
import { Delay } from 'react-delay';


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

    this.lines = [];
    this.index = 0;
  }

  async clearCanvas(){
    this.setState({allShapes: [], myRefs: []});
    this.index = 0;
  }

  async runCanvas(){
    await this.clearCanvas();
    //this.parseCode();
    //this.setState({allShapes: [], myRefs: []}, () => this.parseCode());
    this.lines = this.state.codeValue.split('\n');

    for (const item of this.lines){
      await this.delayedLog(item);
    }
    setTimeout(() => console.log('Done!'), 1000);
    // while (this.index < this.lines.length){
    // }
  }


  delay() {
    return new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  async delayedLog(item) {
    // notice that we can await a function
    // that returns a promise
    await this.delay();
    //console.log(item);
    this.stepThrough();
  }



  async moveRelative(objectId, x_dist, y_dist){
    console.log("OBJECT ID: ", objectId);
    console.log("MY REFS", this.state.myRefs);
    for (var i=0; i<this.state.allShapes.length; i++){
      if (objectId == this.state.allShapes[i].id){
        this.myRefs[i].current.move(x_dist, y_dist);
        break;
      }
    }

  }
  
  stepThrough(){
    this.lines = this.state.codeValue.split('\n');

    if (this.index < this.lines.length){
      this.parseCode(this.index);
      this.index += 1;
    }

  }



  async parseCode(i){
    // this.setState({allShapes: [], myRefs: []}, () => {

      // var lines = this.state.codeValue.split('\n');
      // console.log(lines.length)
      //for(var i=0; i<lines.length; i++){
        var line = this.lines[i];
        var parts = line.split(' ');
        var command = parts[0];
  
        if (command == "circle"){
          await this.addShape({
            type: command,
            x: parts[1],
            y: parts[2],
            radius: parts[3],
            fill: parts[4],
            id: parts[5]
          });
        }
  
        if (command == "rectangle"){
          await this.addShape({
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
          await this.addShape({
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
          //await this.moveRelative(target, x_offset, y_offset);
          // setTimeout(async () => {await this.moveRelative(target, x_offset, y_offset)}, 1000);
          this.moveRelative(target, x_offset, y_offset);
        }
        //DELAY HERE
      //}

    // });
  }
  
  async sleep(milliseconds) {
    console.log("sleep started");
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
    console.log("sleep ended");
  }

  onChange(newValue) {
    this.setState({
      codeValue: newValue
    });
  }


  async addShape(props){
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
    this.setState({ allShapes: [...this.state.allShapes, newShape] });
  }

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
            <button onClick={this.runCanvas.bind(this)}>RUN</button>
            <button onClick={this.clearCanvas.bind(this)}>CLEAR</button>
            <button onClick={this.stepThrough.bind(this)}>STEP THROUGH</button>


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
              </Layer>
            </Stage>
          </div>
          
        </div>
      </div>
    );
  }
}

export default App;
