import React from 'react';
import '../styles/pendingfrienddisplay.css';
import { Button } from "react-bootstrap";
class UserDisplay extends React.Component {

	constructor(props)
	{
		super(props);
		
	}

	render(){
        if (this.props.userType == "friend"){
            return(
                <div className ="friend">
                <Button className="prompt_title" onClick={(i) => {this.props.deleteFriend(this.props.username)}}>{this.props.username}</Button>
                </div>
            );
        }
        if (this.props.userType == "closeFriend"){
            return(
                <div className ="friend">
                <Button className="prompt_title" onClick={(i) => {this.props.deleteFriend(this.props.username)}}>{this.props.username}</Button>
                </div>
            );
        }
        else if (this.props.userType == "pendingFriend")
        {
            return(
                <div className ="friend">
                <Button className="prompt_title" onClick={(i) => {this.props.acceptFriend(this.props.username)}}>{this.props.username}</Button>
                </div>
            );
        }
        else //Stranger
        {
            return(
                <div className ="friend">
                <Button className="prompt_title" onClick={(i) => {this.props.requestFriend(this.props.username)}}>{this.props.username}</Button>
                </div>
            )
        }

	}
}
	

export default UserDisplay