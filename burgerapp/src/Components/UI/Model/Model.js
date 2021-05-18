import React, { Component } from 'react';
import Classes from './Model.css';
import Aux from '../../../hoc/auxilary';
import Backdrop from '../Backdrop/Backdrop';

class Model extends Component {

    shouldComponentUpdate (next,nextState){
        return next.show !== this.props.show|| this.props.children !== next.children;
    }
     componentWillUpdate (){
         console.log("modal componet update")
     }

    render(){
    return(
        <Aux>
         <Backdrop show ={this.props.show} clicked ={this.props.modelclosed}/> 
        {this.props.show ? 
        <div className ={Classes.Modal} 
          style ={{
              transform:this.props.show ? 'translateY(0)' :'transalteY(-100vh)',
              opacity:this.props.show ? '1' :'0'
          }}>
            {this.props.children}
        </div> : null }
        </Aux>
    )}
};

export default Model;