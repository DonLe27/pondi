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
        this.acceptCloseFriend = this.props.userFunctions.acceptCloseFriend.bind(this)
        this.acceptFriend = this.props.userFunctions.acceptFriend.bind(this)
        this.deleteFriend = this.props.userFunctions.deleteFriend.bind(this)
        this.sendRequest = this.props.userFunctions.sendRequest.bind(this)
        this.cancelRequest = this.props.userFunctions.cancelRequest.bind(this)
        console.log(this.props.userType)
	}

	render(){
        console.log("Rendering UserDisplay.js")
        console.log("User type:" + this.props.userType)
        console.log("Username:" + this.props.username)
        if (this.props.userType === "SU"){
            return(
                <div>
                <UserItem  avatar={this.props.avatar} funcArr={[this.sendRequest]} funcName={["follow"]} username={this.props.username}/>
                </div>
            );
        }
        else if (this.props.userType === "PU"){
            return(
                <div >
                <UserItem  avatar={this.props.avatar}  funcArr={[this.acceptFriend,this.acceptCloseFriend, this.deleteFriend, this.sendRequest]} funcName={["accept friend", "accept close friend", "delete pending", "follow"]} username={this.props.username}/>
                </div>
            );
        }
        else if (this.props.userType === "FU")
        {
            return(
                <div >
                <UserItem  avatar={this.props.avatar}  funcArr={[this.acceptCloseFriend, this.deleteFriend, this.sendRequest]} funcName={["make close friend", "delete friend", "follow"]} username={this.props.username}/>
                </div>
            );
        }
        else if (this.props.userType === "CU"){
            return(
                <div >
                <UserItem  avatar={this.props.avatar}  funcArr={[this.acceptFriend, this.deleteFriend, this.sendRequest]} funcName={["make friend", "delete friend", "follow"]} username={this.props.username}/>
                </div>
            );
        }
        else if (this.props.userType === "SR")
        {
            return(
                <div >
                <UserItem  avatar={this.props.avatar}  funcArr={[this.cancelRequest]} funcName={["cancel request"]} username={this.props.username}/>
                </div>
            );
        }
        else if (this.props.userType === "PR"){
            return(
                <div >
                <UserItem  avatar={this.props.avatar}  funcArr={[this.acceptFriend,this.acceptCloseFriend, this.deleteFriend, this.cancelRequest]} funcName={["accept friend", "accept close friend", "delete pending", "cancel request"]} username={this.props.username}/>
                </div>
            );
        }
        else if (this.props.userType === "FR")
        {
            return(
                <div >
                <UserItem  avatar={this.props.avatar}  funcArr={[this.acceptCloseFriend, this.deleteFriend, this.cancelRequest]} funcName={["make close friend", "delete friend", "cancel request"]} username={this.props.username}/>
                </div>
            );
        }
        else if (this.props.userType === "CR"){
            return(
                <div >
                <UserItem  avatar={this.props.avatar}  funcArr={[this.acceptFriend, this.deleteFriend, this.cancelRequest]} funcName={["make friend", "delete friend", "cancel request"]}  username={this.props.username}/>
                </div>
            );
        }
        else if (this.props.userType === "SF")
        {
            return(
                <div >
                <UserItem  avatar={this.props.avatar}  funcArr={[this.cancelRequest]} funcName={["unfollow"]}  username={this.props.username}/>
                </div>
            );
        }
        else if (this.props.userType === "PF"){
            return(
                <div >
                <UserItem  avatar={this.props.avatar}  funcArr={[this.acceptFriend,this.acceptCloseFriend, this.deleteFriend, this.cancelRequest]} funcName={["accept friend", "accept close friend", "delete pending", "unfollow"]}username={this.props.username}/>
                </div>
            );
        }
        else if (this.props.userType === "FF")
        {
            return(
                <div >
                <UserItem  avatar={this.props.avatar}  funcArr={[this.acceptCloseFriend, this.deleteFriend, this.cancelRequest]} funcName={["make close friend", "delete friend", "unfollow"]}  username={this.props.username}/>
                </div>
            );
        }
        else //CF

        {
            return(
                
                <div>
                <UserItem avatar={this.props.avatar}  funcArr={[this.acceptFriend, this.deleteFriend, this.cancelRequest]} funcName={["make friend", "delete friend", "unfollow"]}  username={this.props.username}/>
                </div>
            )
        }

    }
    
}
	

export default UserDisplay