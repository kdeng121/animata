import React, { Component } from 'react';
import ModalText from './ModalText';


class Modal extends React.Component {
    
    render() {
      return (
        <div>
        <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">API Docs</button>

        <div class="modal fade" id="myModal" role="dialog">
          <div class="modal-dialog">
          
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Commands API</h4>
              </div>
              <div class="modal-body">

                  <ModalText></ModalText>
                                  
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
            
          </div>
        </div>
        </div>
        );
    }
}

export default Modal;

