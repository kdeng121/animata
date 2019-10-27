import React, { Component } from 'react';
import './App.css';
import AceEditor from 'react-ace';
import Konva from 'konva';
import { render } from 'react-dom';
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';
import MyRect from './Components/MyRect'; // Import a component from another file


function onChange(newValue) {
  console.log('change',newValue);
}



class App extends Component {

  addObject(){
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
          <div>
            <AceEditor
              theme="monokai"
              onChange={onChange}
              name="UNIQUE_ID_OF_DIV"
              editorProps={{$blockScrolling: true}}
            />
            <button onClick={this.addObject.bind(this)}>Add Rectangle!</button>

          </div>
          

          <div>
            <Stage width={800} height={800}>
              <Layer>
                {this.state.rects.map((rect, i) => {
                  return (
                    <MyRect
                      key={i}
                      shapeProps={rect}
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
