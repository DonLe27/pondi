import React from 'react';
import '../styles/userDisplay.css';
import UserItem from './UserItem';
/*
Stranger Pending Friend CloseFriend
Unfollowing Requesting Following
*/
class UserDisplay extends React.Component {

	constructor(props)
	{
		super(props);
		
	}

	render(){
        console.log("Rendering UserDisplay.js")
        console.log("User type:" + this.props.userType)
        console.log("Username:" + this.props.username)
        if (this.props.userType === "SU"){
            return(
                <div>
                <UserItem  avatar={this.props.avatar} funcArr={[this.props.sendRequest.bind(this)]} funcName={["sendRequest"]} username={this.props.username}/>
                </div>
            );
        }
        else if (this.props.userType === "PU"){
            return(
                <div >
                <UserItem  avatar={this.props.avatar}  funcArr={[this.props.acceptFriend.bind(this),this.props.acceptCloseFriend.bind(this), this.props.deleteFriend.bind(this), this.props.sendRequest.bind(this)]} funcName={["accept friend", "accept close friend", "delete friend", "follow"]} username={this.props.username}/>
                </div>
            );
        }
        else if (this.props.userType === "FU")
        {
            return(
                <div >
                <UserItem  avatar={this.props.avatar}  funcArr={[this.props.acceptCloseFriend.bind(this), this.props.deleteFriend.bind(this), this.props.sendRequest.bind(this)]} funcName={["make close friend", "delete friend", "follow"]} username={this.props.username}/>
                </div>
            );
        }
        else if (this.props.userType === "CU"){
            return(
                <div >
                <UserItem  avatar={this.props.avatar}  funcArr={[this.props.acceptFriend.bind(this), this.props.deleteFriend.bind(this), this.props.sendRequest.bind(this)]} funcName={["make friend", "delete friend", "follow"]} username={this.props.username}/>
                </div>
            );
        }
        else if (this.props.userType === "SR")
        {
            return(
                <div >
                <UserItem  avatar={this.props.avatar}  funcArr={[this.props.cancelRequest.bind(this)]} funcName={["cancel request"]} username={this.props.username}/>
                </div>
            );
        }
        else if (this.props.userType === "PR"){
            return(
                <div >
                <UserItem  avatar={this.props.avatar}  funcArr={[this.props.acceptFriend.bind(this),this.props.acceptCloseFriend.bind(this), this.props.deleteFriend.bind(this), this.props.cancelRequest.bind(this)]} funcName={["accept friend", "accept close friend", "delete friend", "cancel request"]} username={this.props.username}/>
                </div>
            );
        }
        else if (this.props.userType === "FR")
        {
            return(
                <div >
                <UserItem  avatar={this.props.avatar}  funcArr={[this.props.acceptCloseFriend.bind(this), this.props.cancelRequest.bind(this)]} funcName={["make close friend", "delete friend", "cancel request"]} username={this.props.username}/>
                </div>
            );
        }
        else if (this.props.userType === "CR"){
            return(
                <div >
                <UserItem  avatar={this.props.avatar}  funcArr={[this.props.acceptFriend.bind(this), this.props.cancelRequest.bind(this)]} funcName={["make friend", "delete friend", "cancel request"]}  username={this.props.username}/>
                </div>
            );
        }
        else if (this.props.userType === "SF")
        {
            return(
                <div >
                <UserItem  avatar={this.props.avatar}  funcArr={[this.props.cancelRequest.bind(this)]} funcName={["unfollow"]}  username={this.props.username}/>
                </div>
            );
        }
        else if (this.props.userType === "PF"){
            return(
                <div >
                <UserItem  avatar={this.props.avatar}  funcArr={[this.props.acceptFriend.bind(this),this.props.acceptCloseFriend.bind(this), this.props.deleteFriend.bind(this), this.props.cancelRequest.bind(this)]} funcName={["accept friend", "accept close friend", "delete friend", "unfollow"]}username={this.props.username}/>
                </div>
            );
        }
        else if (this.props.userType === "FF")
        {
            return(
                <div >
                <UserItem  avatar={this.props.avatar}  funcArr={[this.props.acceptCloseFriend.bind(this), this.props.cancelRequest.bind(this)]} funcName={["make close friend", "delete friend", "unfollow"]}  username={this.props.username}/>
                </div>
            );
        }
        else //CF
        {
            return(

                <div>
                <UserItem avatar={this.props.avatar}  funcArr={[this.props.acceptFriend.bind(this), this.props.cancelRequest.bind(this)]} funcName={["make friend", "delete friend", "unfollow"]}  username={this.props.username}/>
                </div>
            )
        }

    }
    
}
	

export default UserDisplay