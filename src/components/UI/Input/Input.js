import React from 'react';
import classes from './Input.css';

const Input = (props) => {
    
    let inputElement = null;

    const inputClasses = [classes.InputElement];

    if(props.inValid && props.shouldValidate && props.touched)
        inputClasses.push(classes.Invalid);

    switch(props.elementType){
        case('input'):
            inputElement = <input 
                            className={inputClasses.join(' ')} 
                            {...props.elementConfig} 
                            value={props.value}
                            onChange={props.inputChanged}/>
            break;
        case('textarea'):
            inputElement = <textarea 
                                className={inputClasses.join(' ')} 
                                {...props.elementConfig} 
                                value={props.value}
                                onChange={props.inputChanged}/>
            break;
        case('select'):
            let selectConfig = props.elementConfig;

            inputElement = (<select className={inputClasses.join(' ')}
                                    onChange={props.inputChanged}>

                                {selectConfig.options.map((ele,index)=> {
                                    return <option key={index} value={ele.value}>{ele.displayValue}</option>
                                })};

                           </select>)   
            break;
        default:
            inputElement = <input 
                                className={inputClasses.join(' ')} 
                                {...props.elementConfig} 
                                value={props.value}
                                onChange={props.inputChanged}/>
            break;
    }

    return (
            <div className={classes.Input}>
                <label className={classes.Label}>{props.label}</label>
                {inputElement}
            </div>
    )
};

export default Input;