import React, { Component } from 'react';
import './App.css';
import AceEditor from 'react-ace';
import Konva from 'konva';
import { render } from 'react-dom';
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';
import MyRect from './Components/MyRect'; // Import a component from another file
import MyCircle from './Components/MyCircle'; // Import a component from another file



function onChange(newValue) {
  console.log('change',newValue);
}



class App extends Component {

  addRectangle(){
    const newRectangle = {
      x: 10,
      y: 10,
      width: 100,
      height: 100,
      fill: 'blue',
      id: 'rect3'
    };
    this.setState({ rects: [...this.state.rects, newRectangle] })
  }

  addCircle(){
    console.log("CIRCLE ADDED BUT");
    const newCircle = {
      x: 200,
      y: 200,
      radius: 50,
      fill: 'black',
    };
    this.setState({ circles: [...this.state.circles, newCircle] })
  }

  constructor(props){
    super(props);
    this.state = {
      rects: [
        {
          x: 10,
          y: 10,
          width: 100,
          height: 100,
          fill: 'red',
          id: 'rect1'
        },
        {
          x: 150,
          y: 150,
          width: 100,
          height: 100,
          fill: 'green',
          id: 'rect2'
        }
      ],
      circles: [
        {
          x: 100,
          y: 100,
          radius: 50,
          fill: 'black',
        }
      ]
    }
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
              theme="monokai"
              onChange={onChange}
              name="UNIQUE_ID_OF_DIV"
              editorProps={{$blockScrolling: true}}
              fontSize={16}
            />
            <button onClick={this.addRectangle.bind(this)}>Add Rectangle!</button>
            <button onClick={this.addCircle.bind(this)}>Add Circle!</button>


          </div>
          

          <div className="stage">
            <Stage width={700} height={600}>
              <Layer>
                {this.state.rects.map((rect, i) => {
                  return (
                    <MyRect
                      key={i}
                      shapeProps={rect}
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
