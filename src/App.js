import React, { Component } from 'react';
import './App.css';
import AceEditor from 'react-ace';
import brace from 'brace';
import Konva from 'konva';
import { render } from 'react-dom';
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';
import Shape from './Components/Shape'; // Import a component from another file
import Modal from './Components/Modal';
import 'brace/theme/github';
import { Delay } from 'react-delay';

import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'

//import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';

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
      codeValue: "",
      delayValue: 1000,
      lineIndex: 0
    }

    this.myRefs = [];

    for (var i=0; i<this.state.allShapes.length; i++){
      this.myRefs[i] = React.createRef();
    }

    this.lines = [];
    //this.index = 0;

  }

  /**
   * Clears the canvas by removing all shapes and object refs
   * Resets line index to 0
   */
  async clearCanvas(){
    this.setState({allShapes: [], myRefs: [], lineIndex: 0});
  }

  /**
   * Parses commands and executes each command (via stepThrough) with delay time
   */
  async runCanvas(){
    await this.clearCanvas();
    //this.parseCode();
    this.lines = this.state.codeValue.split('\n');

    for (const item of this.lines){
      await this.delayedLog(item);
    }
    setTimeout(() => console.log('Done!' ), this.state.delayValue);
  }


  /**
   * Delay 1 second
   */
  delay() {
    return new Promise(resolve => setTimeout(resolve, this.state.delayValue));
  }
  
  /**
   * 
   * Delay helper
   */
  async delayedLog(item) {
    // notice that we can await a function
    // that returns a promise
    await this.delay();
    //console.log(item);
    this.stepThrough();
  }



  /**
   * 
   * @param {String} objectId 
   * @param {int} x_dist 
   * @param {int} y_dist 
   * moves objectId x_dist and y_dist
   */
  async moveRelative(objectId, x_dist, y_dist){

    for (var i=0; i<this.state.allShapes.length; i++){
      if (objectId == this.state.allShapes[i].id){
        this.myRefs[i].current.move(x_dist, y_dist);
        break;
      }
    }

  }

  async changeParam(objectId, param, newVal){
    for (var i=0; i<this.state.allShapes.length; i++){
      if (objectId == this.state.allShapes[i].id){
        this.myRefs[i].current.changeParam(param, newVal);
        console.log("CHANGED PARAM");
        break;
      }
    }
  }
  
  stepThrough(){
    this.lines = this.state.codeValue.split('\n');

    if (this.state.lineIndex < this.lines.length){
      this.parseCode(this.state.lineIndex);
      this.setState({ lineIndex: this.state.lineIndex + 1 });
      //this.index += 1;
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

        if (command == "changeParam"){
          const target = parts[1];
          const param = parts[2];
          const newVal = parts[3];
          this.changeParam(target, param, newVal);
        }

        if (command == "remove"){
          const target = parts[1];
          this.removeShape(target);
        }
      //}

    // });
  }
  

  onChange(newValue) {
    this.setState({
      codeValue: newValue
    });
  }

  onChangeDelay(newValue){
    this.setState({
      delayValue: newValue
    });
    console.log(this.state.delayValue);
  }




  // CONSIDER USING HASHMAP TO STORE OBJECTS??? 
  //TODO: ADD JAVADOC AND REFACTOR EVERYTHING
  removeShape(objectId){
    console.log("Current allShapes: ", this.state.allShapes);
    var array = [...this.state.allShapes]; // make a separate copy of the array
    for (var i=0; i<this.state.allShapes.length; i++){
      if (objectId == this.state.allShapes[i].id){
        console.log("REMOVED object: ", objectId);

        array.splice(i, 1);
        this.myRefs.splice(i, 1);

        this.setState({allShapes: array});
        break;
      }
    }
    console.log("After remove state: ", this.state.allShapes);
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
        <Navbar bg="light" className="topBar">
        <Navbar.Brand target="_blank" href="https://docs.google.com/document/d/e/2PACX-1vQFh7ypq9ngURK3sJqdzDNcC1N_iVT4eCYJJRDSuCogCGi3CuqLvR9gImqTy93C3kpvFa78B7hOWOcM/pub"><button type="button" class="btn btn-info btn-lg" >API Docs</button>
</Navbar.Brand>

        <header>        <h1>Animata</h1>
</header>
        </Navbar>
        
        <div className="rowC">
          <div className="editor">
          <p>Executing line #{this.state.lineIndex}: {this.lines[this.state.lineIndex-1]}</p>
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
            <button onClick={this.stepThrough.bind(this)}>STEP</button>
            <p>Delay Time (ms)</p>
            <Slider
              min={100}
              max={2000}
              step={10}
              value={this.state.delayValue}
              orientation="horizontal"
              onChange={this.onChangeDelay.bind(this)}
            />

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
