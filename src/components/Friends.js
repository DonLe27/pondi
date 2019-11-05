import React from 'react';
import UserDisplay from './UserDisplay'
import SearchUser from './SearchUser'
import {auth}  from "../actions";
import { connect } from "react-redux";
import "../styles/searchUser.css"
class FriendPage extends React.Component{
	constructor(props){
		super(props);
		var friendDisplays = [];
		var closeFriendDisplays = [];
		var pendingFriendDisplays = [];
		for(var i = 0; i < props.friends.length; i++)
		{
			friendDisplays.push(
				<UserDisplay key={this.props.friends[i]["username"] + ' f'} userType="friend" deleteFriend={this.deleteFriendHandler.bind(this)} username={this.props.friends[i]["username"]} avatar={this.props.friends[i]["avatar"]}/>
			)
		}
		for(var i = 0; i < props.closeFriends.length; i++)
		{
			closeFriendDisplays.push(
				<UserDisplay key={this.props.closeFriends[i]["username"] + ' c'} userType="closeFriend" deleteFriend={this.deleteFriendHandler.bind(this)} username={this.props.closeFriends[i]["username"]} avatar={this.props.closeFriends[i]["avatar"]}/>
			)
		}
		for(var i = 0; i < props.pendingFriends.length; i++)
		{
			pendingFriendDisplays.push(
				<UserDisplay key={this.props.pendingFriends[i]["username"] + ' p'} userType="pendingFriend" acceptFriend={this.acceptFriendHandler.bind(this)} username={this.props.pendingFriends[i]["username"]} avatar={this.props.pendingFriends[i]["avatar"]}/>
			)
		}
		this.state = {
			friendDisplays : friendDisplays,
			closeFriendDisplays : closeFriendDisplays,
			pendingFriendDisplays : pendingFriendDisplays,
			searchedUser : null, 
			searchedUserType: null,
			searching: this.props.searching

		}
	}
	isFriend = (friendname) => {
		var res = false;
		for(var i = 0; i < this.props.friends.length; i++)
		{
			if(this.props.friends[i]["username"] == friendname){
				res = true;
				break;
			}
		}
		return res;
	}
	isCloseFriend = (friendname) => {
		var res = false;
		for(var i = 0; i < this.props.closeFriends.length; i++)
		{
			if(this.props.closeFriends[i]["username"] == friendname){
				res = true;
				break;
			}
		}
		return res;
	}
	isPendingFriend = (friendname) => {
		var res = false;
		for(var i = 0; i < this.props.pendingFriends.length; i++)
		{
			if(this.props.pendingFriends[i]["username"] == friendname){
				res = true;
				break;
			}
		}
		return res;
	}
	acceptFriendHandler = (friendname) => {
		this.props.acceptFriend(friendname)
		this.props.getMyFriends();
	}

	deleteFriendHandler = (friendname) => {
		this.props.deleteFriend(friendname)
		this.props.getMyFriends();
	}
	requestFriendHandler = (friendname) => {
		this.props.sendRequest(friendname)
	}
	searchUserHandler = (friendname) => {
		console.log("Searching for: " + friendname)
		this.props.searchUser(friendname).then((result) => {
			if (result["status"] < 500){
				console.log(result["data"]["friendObject"]["username"])
				let searchedUsername = result["data"]["friendObject"]["username"]
				console.log("Searched and found:" + searchedUsername)
				var searchType = ""
				if (this.isFriend(searchedUsername)){
					searchType = "friend"
				}
				else if (this.isPendingFriend(searchedUsername)){
					searchType = "pendingFriend"
				}
				else if (this.isCloseFriend(searchedUsername)){
					searchType = "closeFriend"
				}
				else //send request to
				{
					searchType = "stranger"
				}

				this.setState({
					searchedUser : searchedUsername,
					searchedUserType: searchType
				})
			}
			else{
				this.setState({
					searchedUser : null
				})
			}
		})
	}
	componentWillReceiveProps(newProps)
	{
		if (newProps.friends != this.props.friends){
			var newFriendDisplays = []
			for(var i = 0; i < newProps.friends.length; i++)
			{
				newFriendDisplays.push(
					<UserDisplay key={newProps.friends[i]["username"] + ' c'} userType="friend" deleteFriend={this.deleteFriendHandler.bind(this)} username={newProps.friends[i]["username"]} avatar={newProps.friends[i]["avatar"]}/>
				)
			}
			this.setState({
				friendDisplays: newFriendDisplays
			})
	
		}
		if (newProps.pendingFriends != this.props.pendingFriends){
			var newPendingFriendDisplays = []
			for(var i = 0; i < newProps.pendingFriends.length; i++)
			{
				newPendingFriendDisplays.push(
					<UserDisplay key={newProps.pendingFriends[i]["username"] + ' c'} userType="friend" acceptFriend={this.acceptFriendHandler.bind(this)} username={newProps.pendingFriends[i]["username"]} avatar={newProps.pendingFriends[i]["avatar"]}/>
				)
			}
			this.setState({
				pendingFriendDisplays: newPendingFriendDisplays
			})
			console.log("RECEIVED NEW PENDING FRIENDS")
			console.log(newProps.pendingFriends)
		}	
		if (newProps.closeFriends != this.props.closeFriends){
			var newCloseFriendDisplays = []
			for(var i = 0; i < newProps.closeFriends.length; i++)
			{
				newCloseFriendDisplays.push(
					<UserDisplay key={newProps.closeFriends[i]["username"] + ' c'} userType="closeFriend" deleteFriend={this.deleteFriendHandler.bind(this)} username={newProps.closeFriends[i]["username"]} avatar={newProps.closeFriends[i]["avatar"]}/>
				)
			}
			this.setState({
				closeFriendDisplays: newCloseFriendDisplays
			})
		
		}	
		
	}
	
	render() {
		const searchCenter = {
			margin: 0,
			position: "relative",
			top: "30%",
			msTransform: "translateY(-50%)",
			transform: "translateY(-50%)",
			width: "80%"
		  }
		  const userCenter = {
			margin: 0,
			position: "relative",
			top: "40%",
			msTransform: "translateY(-50%)",
			transform: "translateY(-50%)",
			width: "60%",
			left:"20%"
		  }
		console.log(this.isFriend(this.state.searchedUser))
		console.log(this.state.searching)
		if (this.state.searching){
			return (
			<div className="SearchUser">
				<div style={searchCenter}>
					<SearchUser searchUser={this.searchUserHandler.bind(this)}/>
				</div>
				<div style={userCenter}>
						{ this.state.searchedUser && <UserDisplay userType={this.state.searchedUserType} key={this.state.searchedUser + "s"} acceptFriend={this.acceptFriendHandler.bind(this)} deleteFriend={this.deleteFriendHandler.bind(this)} getFriendProfile={this.props.getFriendProfile} requestFriend={this.requestFriendHandler.bind(this)} username={this.state.searchedUser} /> }
				</div>
			</div>
			)
		}
		else{
			return (
				<div >
					<h1 align="center" >friends</h1>
				{this.state.friendDisplays}
				<h1 align="center" >close friends</h1>
				{this.state.closeFriendDisplays}
				<h1 align="center" >pending friends</h1>
				{this.state.pendingFriendDisplays}

				</div>
				);
			}
		}
}
const mapStateToProps = state => {
    let errors = [];
    if (state.auth.errors) {
        errors = Object.keys(state.auth.errors).map(field => {
            return { field, message: state.auth.errors[field] };
        });
    }
    return {
        errors,
        isAuthenticated: state.auth.isAuthenticated,
        token: state.auth.token

    };
}
const mapDispatchToProps = dispatch => {
    return {
        loadUser: () => dispatch(auth.loadUser()),
        acceptFriend: (friendName) => 
			dispatch(auth.acceptFriend(friendName)),
		deleteFriend: (friendName) => 
			dispatch(auth.deleteFriend(friendName)),
		searchUser: (friendName) => 
			dispatch(auth.searchUser(friendName)),
		sendRequest: (friendName) => 
			dispatch(auth.sendRequest(friendName)),
	};
	
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendPage);
