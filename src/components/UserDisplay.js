import React from 'react';
import '../styles/pendingfrienddisplay.css';
import '../styles/archive.css';
import { Button } from "react-bootstrap";
import UserItem from './UserItem';
class UserDisplay extends React.Component {

	constructor(props)
	{
		super(props);
		
	}

	render(){
        if (this.props.userType == "friend"){
            return(
                <div className ="friend">
                <UserItem className="prompt_title" avatar={this.props.avatar} funcArr={[this.props.deleteFriend(this.props.username)]} funcName={["delete"]} username={this.props.username}/>
                </div>
            );
        }
        if (this.props.userType == "closeFriend"){
            return(
                <div className ="Archive">
                <UserItem className="prompt_title" avatar={this.props.avatar} funcArr={[this.props.deleteFriend(this.props.username)]} funcName={["delete"]} username={this.props.username}/>
                </div>
            );
        }
        else if (this.props.userType == "pendingFriend")
        {
            return(
                <div className ="Archive">
                <UserItem className="prompt_title" avatar={this.props.avatar} funcArr={[this.props.acceptFriend(this.props.username)]} funcName={["delete"]} username={this.props.username}/>
                </div>
            );
        }
        else //Stranger
        {
            return(

                <div className ="Archive">
                <UserItem avatar={this.props.avatar} funcArr={[this.props.requestFriend(this.props.username)]} funcName={["send friend request"]} username={this.props.username}/>
                </div>
            )
        }

    }
    
}
	

export default UserDisplay