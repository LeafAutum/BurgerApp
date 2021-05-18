import React from 'react';
import classes from './Input.css';

const input =(props) => {
    let InputElement =null;
    const inputclasses= [classes.InputElement];
    if(props.invalid && props.touch){
        inputclasses.push(classes.Invalid);
        console.log("mfdk");
    }
    
    switch(props.elementType){
        case ('input'):
            InputElement =<input className={inputclasses.join(' ')} {...props.elementConfig}
             value={props.value} onChange={props.changed}/>
            break;

        case ('textarea'):
                InputElement =<textarea className={classes.InputElement} {...props.elementConfig} 
                value={props.value}  onChange={props.changed}/>
                break; 
                
        case ('select'):
                InputElement =<select className={classes.InputElement}  onChange={props.changed} value={props.value}>
                   {props.elementConfig.options.map(option =>(
                       <option key ={option.value} value={option.value} >{option.displayValue}</option>
                   ))}
                    </select>
                break;
    
        default:
            InputElement =<input className={classes.InputElement} {...props.elementConfig} value={props.value}/>
            break;

    
    }

    return(
          <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {InputElement}
          </div>
    );
}

export default input;