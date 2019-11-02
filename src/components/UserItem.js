import React from 'react';
import Dropdown from './Dropdown';
import ProfPic from './ProfPic';
import '../styles/useritem.css';

function UserItem(props){
    return(
        <div>
            <ProfPic classType="avatar" avatar={props.avatar}/>
            <h1 className="username">{props.username}</h1>
            <Dropdown className="dropdown" buttonTitles={props.funcName} buttonFunctions={props.funcArr}/>
            <hr/>
        </div>
    );
}

export default UserItem;