import React, { Component } from 'react';
import './App.css';
import AceEditor from 'react-ace';
import Konva from 'konva';
import { render } from 'react-dom';
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';



function onChange(newValue) {
  console.log('change',newValue);
}

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
        width={50}
        height={50}
        fill="green"
        draggable
        onClick={this.moveForward}
      />
    );
  }
}



class App extends Component {

  render() {
    return (
      <div className="App">
        <header>
          <h1>
            Animata
          </h1>
        </header>
        
        <div class="col">
          <AceEditor
            theme="github"
            onChange={onChange}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{$blockScrolling: true}}
          />
        </div>
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            <MyRect />
          </Layer>
        </Stage>
      </div>
    );
  }

}

export default App;
