import React from 'react';
import '../styles/pendingfrienddisplay.css';
import '../styles/archive.css';
import { Button } from "react-bootstrap";
import IconButton from "@material-ui/core/IconButton";
import MoreOptions from './MoreOptions.js'
class UserDisplay extends React.Component {

	constructor(props)
	{
		super(props);
		
	}

	render(){
        if (this.props.userType == "friend"){
            return(
                <div className ="Archive">
                <Button className="prompt_title" onClick={(i) => {this.props.deleteFriend(this.props.username)}}>{this.props.username}</Button>
                </div>
            );
        }
        if (this.props.userType == "closeFriend"){
            return(
                <div className ="Archive">
                <Button className="prompt_title" onClick={(i) => {this.props.deleteFriend(this.props.username)}}>{this.props.username}</Button>
                </div>
            );
        }
        else if (this.props.userType == "pendingFriend")
        {
            return(
                <div className ="Archive">
                <Button className="prompt_title" onClick={(i) => {this.props.acceptFriend(this.props.username)}}>{this.props.username}</Button>
                </div>
            );
        }
        else //Stranger
        {
            return(

                <div className ="Archive">
                <Button className="prompt_title" onClick={(i) => {this.props.requestFriend(this.props.username)}}>{this.props.username}</Button>
                </div>
            )
        }

	}
}
	

export default UserDisplay