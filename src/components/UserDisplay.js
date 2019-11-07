import React from 'react';
import '../styles/userDisplay.css';
import UserItem from './UserItem';
class UserDisplay extends React.Component {

	constructor(props)
	{
		super(props);
		
	}

	render(){
        console.log("Rendering UserDisplay.js")
        console.log("User type:" + this.props.userType)
        console.log("Username:" + this.props.username)
        if (this.props.userType === "friend"){
            return(
                <div>
                <UserItem  avatar={this.props.avatar} funcArr={[this.props.deleteFriend.bind(this)]} funcName={["delete"]} username={this.props.username}/>
                </div>
            );
        }
        else if (this.props.userType === "closeFriend"){
            return(
                <div >
                <UserItem  avatar={this.props.avatar}  funcArr={[this.props.deleteFriend.bind(this)]} funcName={["delete"]} username={this.props.username}/>
                </div>
            );
        }
        else if (this.props.userType === "pendingFriend")
        {
            return(
                <div >
                <UserItem  avatar={this.props.avatar}  funcArr={[this.props.acceptFriend.bind(this)]} funcName={["accept friend"]} username={this.props.username}/>
                </div>
            );
        }
        else //Stranger
        {
            return(

                <div>
                <UserItem avatar={this.props.avatar}  funcArr={[this.props.requestFriend.bind(this)]} funcName={["send friend request"]} username={this.props.username}/>
                </div>
            )
        }

    }
    
}
	

export default UserDisplay