import React from 'react';
import ProfPic from './ProfPic';
import '../styles/useritem.css';
import {  Button } from "react-bootstrap";
function UserItem(props){
    return(
            <div className="useritem">
            <ProfPic classType="avatar-user" avatar={props.avatar}/>
            <p className="username-user">{props.username}</p>
            <button className="userButton" onClick={()=>{props.funcArr[0](props.username)}}>
                            {props.funcName[0]}
            </button>
            </div>

    );
}

export default UserItem;