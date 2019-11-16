import React from 'react';
import ProfPic from './ProfPic';
import '../styles/useritem.css';
import {  Button } from "react-bootstrap";
function UserItem(props){
    return(
            <div className="useritem">
            <ProfPic classType="avatar-user" avatar={props.avatar}/>
            <p className="username-user">{props.username}</p>
            {props.funcName.length > 3 && 
                <button className="userButton" onClick={()=>{props.funcArr[3](props.username)}}>
                        {props.funcName[3]}
                </button>
            
            }
            {props.funcName.length > 2 && 
                <button className="userButton" onClick={()=>{props.funcArr[2](props.username)}}>
                        {props.funcName[2]}
                </button>
            
            }
            {props.funcName.length > 1 && 
                <button className="userButton" onClick={()=>{props.funcArr[1](props.username)}}>
                        {props.funcName[1]}
                </button>
            }
            <button className="userButton" onClick={()=>{props.funcArr[0](props.username)}}>
                            {props.funcName[0]}
            </button>

            </div>

    );
}

export default UserItem;