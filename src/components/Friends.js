import React from 'react';
import UserDisplay from './UserDisplay'
import SearchUser from './SearchUser'
import UserList from './UserList'
import {auth}  from "../actions";
import { connect } from "react-redux";
import "../styles/searchPage.css"
import '../styles/userDisplay.css';
import vec1 from "../styles/vectors/vector2.1.png";
class FriendPage extends React.Component{
	constructor(props){
		super(props);
		var friendDisplays = [];
		var closeFriendDisplays = [];
		var pendingFriendDisplays = [];
		var followingDisplays = [];
		this.userFunctions = {
			acceptFriend: this.acceptFriendHandler.bind(this),
			acceptCloseFriend: this.acceptCloseFriendHandler.bind(this),
			deleteFriend: this.deleteFriendHandler.bind(this),
			sendRequest: this.requestFriendHandler.bind(this),
			cancelRequest: this.cancelRequestHandler.bind(this),
		}
		console.log(this.props.requesting)
		console.log(this.props.following)
		for(var i = 0; i < props.friends.length; i++)
		{
			var followingType = this.getFollowingType(this.props.friends[i]["username"])
			friendDisplays.push(
				<UserDisplay key={this.props.friends[i]["username"] + ' f'} userType={"F"+followingType} userFunctions={this.userFunctions} username={this.props.friends[i]["username"]} avatar={this.props.friends[i]["avatar"]}/>
			)
		}
		for(var i = 0; i < props.closeFriends.length; i++)
		{
			var followingType = this.getFollowingType(this.props.closeFriends[i]["username"])
			closeFriendDisplays.push(
				<UserDisplay key={this.props.closeFriends[i]["username"] + ' c'} userType={"C"+followingType} userFunctions={this.userFunctions}  username={this.props.closeFriends[i]["username"]} avatar={this.props.closeFriends[i]["avatar"]}/>
			)
		}
		for(var i = 0; i < props.pendingFriends.length; i++)
		{
			var followingType = this.getFollowingType(this.props.pendingFriends[i]["username"])
			pendingFriendDisplays.push(
				<UserDisplay key={this.props.pendingFriends[i]["username"] + ' p'} userType={"P"+followingType} userFunctions={this.userFunctions}  username={this.props.pendingFriends[i]["username"]} avatar={this.props.pendingFriends[i]["avatar"]}/>
			)
		}
		/*I 
		for(var i = 0; i < props.following.length; i++)
		{
			
			followingDisplays.push(
				<UserDisplay key={this.props.following[i]["username"] + ' r'} userType={"F"+followingType} userFunctions={this.userFunctions} username={this.props.following[i]["username"]} avatar={this.props.following[i]["avatar"]}/>
			)
		}
		*/
		
		this.state = {
			friendDisplays : friendDisplays,
			closeFriendDisplays : closeFriendDisplays,
			pendingFriendDisplays : pendingFriendDisplays,
			followingDisplays : followingDisplays,
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
	getFollowingType = (friendname) => {
		var following = false;
		var requesting = false;
		for(var i = 0; i < this.props.requesting.length; i++)
		{
			if(this.props.requesting[i]["username"] == friendname){
				requesting = true;
				break;
			}
		}
		for(var i = 0; i < this.props.following.length; i++)
		{
			if(this.props.following[i]["username"] == friendname){
				following = true;
				break;
			}
		}
		return following ? "F" : (requesting ? "R" : "U")

	}
	getFollowingTypeNewProps = (friendname, newProps) => {
		for(var i = 0; i < newProps.requesting.length; i++)
		{
			if(newProps.requesting[i]["username"] == friendname){
				return "R";
			}
		}
		for(var i = 0; i < newProps.following.length; i++)
		{
			if(newProps.following[i]["username"] == friendname){
				return "F"
			}
		}
		return "U"

	}
	searchUserHandler = (friendname) => {
		console.log("Searching for: " + friendname)
		var followingType = this.getFollowingType(friendname)
		this.props.searchUser(friendname).then((result) => {
			if (result["status"] < 500){
				let searchedUsername = result["data"]["friendObject"]["username"]
				console.log("Searched and found:" + searchedUsername)
				var searchType = ""
				if (this.isFriend(searchedUsername)){
					searchType = "F"+followingType
				}
				else if (this.isPendingFriend(searchedUsername)){
					searchType = "P"+followingType
				}
				else if (this.isCloseFriend(searchedUsername)){
					searchType = "C"+followingType
				}
				else
				{
					searchType = "S"+followingType
				}

				this.setState({
					searchedUser : searchedUsername,
					searchedUserType: searchType
				})
			}
			else{
				console.log("User not found")
				this.setState({
					searchedUser : null
				})
			}
		})
	}
	acceptFriendHandler = (friendname) => {
		this.props.acceptFriend(friendname)
		this.props.getMyFriends();
	}
	acceptCloseFriendHandler = (friendname) => {
		this.props.acceptCloseFriend(friendname)
		this.props.getMyFriends();
	}

	deleteFriendHandler = (friendname) => {
		this.props.deleteFriend(friendname)
		this.props.getMyFriends();
	}
	requestFriendHandler = (friendname) => {
		this.props.sendRequest(friendname);
		this.props.getSentRequests();
	}
	cancelRequestHandler = (friendname) => {
		this.props.cancelRequest(friendname);
		this.props.getSentRequests();
	}
	sendRequestHandler = (friendname) => {
		console.log("SENT FRIEND REQUEST TO " + friendname)
	}
	componentWillReceiveProps(newProps)
	{
		console.log(newProps.requesting)
		console.log(newProps.following)
		var first = "S";
		if (newProps.friends != this.props.friends){
			var newFriendDisplays = []
			for(var i = 0; i < newProps.friends.length; i++)
			{
				var followingType = this.getFollowingTypeNewProps(newProps.friends[i].username, newProps)
				//Update searched friend
				if (this.state.searchedUser && newProps.friends[i].username === this.state.searchedUser){
					first = "F"
				}
				newFriendDisplays.push(
					<UserDisplay key={newProps.friends[i]["username"] + ' c'} userType={"F"+followingType} userFunctions={this.userFunctions}  username={newProps.friends[i]["username"]} avatar={newProps.friends[i]["avatar"]}/>
				)
			}
			this.setState({
				friendDisplays: newFriendDisplays,
			})
	
		}
		if (newProps.pendingFriends != this.props.pendingFriends){
			var newPendingFriendDisplays = []
			for(var i = 0; i < newProps.pendingFriends.length; i++)
			{
				var followingType = this.getFollowingTypeNewProps(newProps.pendingFriends[i].username, newProps)
				//Update searched friend
				if (this.state.searchedUser && newProps.pendingFriends[i].username === this.state.searchedUser){
					first = "P"
				}
				newPendingFriendDisplays.push(
					<UserDisplay key={newProps.pendingFriends[i]["username"] + ' c'} userType={"P"+followingType}  userFunctions={this.userFunctions}  username={newProps.pendingFriends[i]["username"]} avatar={newProps.pendingFriends[i]["avatar"]}/>
				)
			}
			this.setState({
				pendingFriendDisplays: newPendingFriendDisplays,
			})
			console.log(newProps.pendingFriends)
		}	
		if (newProps.closeFriends != this.props.closeFriends){
			var newCloseFriendDisplays = []
			for(var i = 0; i < newProps.closeFriends.length; i++)
			{
				var followingType = this.getFollowingTypeNewProps(newProps.closeFriends[i].username, newProps)
				//Update searched friend
				if (this.state.searchedUser && newProps.closeFriends[i].username === this.state.searchedUser){
					first = "C"
				}
				newCloseFriendDisplays.push(
					<UserDisplay key={newProps.closeFriends[i]["username"] + ' c'} userType={"C"+followingType} userFunctions={this.userFunctions}  username={newProps.closeFriends[i]["username"]} avatar={newProps.closeFriends[i]["avatar"]}/>
				)
			}
			this.setState({
				closeFriendDisplays: newCloseFriendDisplays,
			})
		
		}	
		if(this.state.searchedUser){
			var followingType = this.getFollowingTypeNewProps(this.state.searchedUser, newProps)
		}
		console.log("Setting new state " + first + followingType)
		this.setState({
			searchedUserType: first + followingType
		})	
		/*
		if (newProps.following != this.props.following){
			var newSentRequestDisplays = [];
			for(var i = 0; i < newProps.following.length; i++)
			{
				var followingType = this.getFollowingTypeNewProps(newProps.following[i].username, newProps)
				//Update searched friend	
			
				/*
				newSentRequestDisplays.push(
					<UserDisplay key={newProps.following[i]["username"] + ' c'} userType={first+followingType} userFunctions={this.userFunctions} username={newProps.following[i]["username"]} avatar={newProps.following[i]["avatar"]}/>
				)
				
			}

			this.setState({
				sentRequestDisplays: first+followingType,
			})
		}

		*/



		
	}
	
	render() {
		console.log("Rendering Friends.js")
		const searchCenter = {
			position:"relative"
		  }
		  const userCenter = {
			margin: 0,
			position: "relative",
			top: "40%",
			position: "absolute",
			top: "35%",
			left: "37%",
		  }

		if (this.state.searching){
			return (
			<div className="FriendContainer">
				<div className="searchCenter">
					<SearchUser searchUser={this.searchUserHandler.bind(this)}/>
				</div>
				<div style={userCenter}>
						{ this.state.searchedUser && <UserDisplay userType={this.state.searchedUserType} key={this.state.searchedUser + "s"} userFunctions={this.userFunctions}  username={this.state.searchedUser} /> }
				</div>
				<img className="search-vector" src={vec1} alt="vector1" />
			</div>
			)
		}
		else{
			return (
				<div className="FriendContainer">
					<UserList friendDisplays={this.state.friendDisplays} closeFriendDisplays={this.state.closeFriendDisplays} pendingFriendDisplays={this.state.pendingFriendDisplays} sentRequestDisplays={this.state.sentRequestDisplays}></UserList>

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
		acceptCloseFriend: (friendName) => 
			dispatch(auth.acceptCloseFriend(friendName)),
		deleteFriend: (friendName) => 
			dispatch(auth.deleteFriend(friendName)),
		searchUser: (friendName) => 
			dispatch(auth.searchUser(friendName)),
		sendRequest: (friendName) => 
			dispatch(auth.sendRequest(friendName)),
		cancelRequest: (friendName) =>
			dispatch(auth.cancelRequest(friendName)),
	};
	
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendPage);
