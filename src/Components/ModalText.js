import React, { Component } from 'react';
import { Document } from 'react-pdf';

class ModalText extends React.Component {
    
    render() {
      return (
        <div>
            hello
            <Document file="/api.pdf" ></Document>
        </div>

        );
    }
}

export default ModalText;

