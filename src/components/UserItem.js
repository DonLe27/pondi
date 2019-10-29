import React from 'react';
import Dropdown from './Dropdown';
import ProfPic from './ProfPic';
import '../styles/useritem.css';

function UserItem(props){
    return(
        <div>
            <ProfPic classType="avatar" avatar={this.avatar}/>
            <h1>{this.username}</h1>
            <Dropdown buttonTitles={this.funcName} buttonFunctions={this.funcArr}/>
        </div>
    );
}

export default UserItem;