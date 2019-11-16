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
		var sentRequestDisplays = [];
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
		/*
		for(var i = 0; i < props.reqAndFollowing.length; i++)
		{
			sentRequestDisplays.push(
				<UserDisplay key={this.props.pendingFriends[i]["username"] + ' r'} userType="sentRequest" cancelRequest={this.cancelRequestHandler.bind(this)} username={this.props.pendingFriends[i]["username"]} avatar={this.props.pendingFriends[i]["avatar"]}/>
			)
		}
		*/
		this.state = {
			friendDisplays : friendDisplays,
			closeFriendDisplays : closeFriendDisplays,
			pendingFriendDisplays : pendingFriendDisplays,
			sentRequestDisplays : sentRequestDisplays,
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
		//this.props.getSentRequests();
	}
	cancelRequestHandler = (friendname) => {
		this.props.cancelRequest(friendname);
		//this.props.getSentRequests();
	}
	sendRequestHandler = (friendname) => {
		console.log("SENT FRIEND REQUEST TO " + friendname)
	}
	componentWillReceiveProps(newProps)
	{
		var newSearchedUserType = "SU"
		if (newProps.friends != this.props.friends){
			var newFriendDisplays = []
			for(var i = 0; i < newProps.friends.length; i++)
			{
				var followingType = this.getFollowingType(newProps.friends[i].username)
				//Update searched friend
				if (this.state.searchedUser && newProps.friends[i].username === this.state.searchedUser.username){
					newSearchedUserType = "F"+followingType
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
				var followingType = this.getFollowingType(newProps.pendingFriends[i].username)
				//Update searched friend
				if (this.state.searchedUser && newProps.pendingFriends[i].username === this.state.searchedUser.username){
					newSearchedUserType = "P"+followingType
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
				var followingType = this.getFollowingType(newProps.closeFriends[i].username)
				//Update searched friend
				if (this.state.searchedUser && newProps.closeFriends[i].username === this.state.searchedUser.username){
					newSearchedUserType = "C"+followingType
				}
				newCloseFriendDisplays.push(
					<UserDisplay key={newProps.closeFriends[i]["username"] + ' c'} userType={"C"+followingType} userFunctions={this.userFunctions}  username={newProps.closeFriends[i]["username"]} avatar={newProps.closeFriends[i]["avatar"]}/>
				)
			}
			this.setState({
				closeFriendDisplays: newCloseFriendDisplays,
			})
		
		}	
		/*
		if (newProps.following != this.props.following){
			var newSentRequestDisplays = [];
			for(var i = 0; i < newProps.sentRequests.length; i++)
			{
				//Update searched friend
				if (newProps.sentRequests[i].username === this.state.searchedUser.username){
					newSearchedUserType = "sentRequest"
				}
				newSentRequestDisplays.push(
					<UserDisplay key={newProps.sentRequests[i]["username"] + ' c'} userType="sentRequest" cancelRequest={this.cancelRequestHandler.bind(this)} username={newProps.sentRequests[i]["username"]} avatar={newProps.sentRequests[i]["avatar"]}/>
				)
			}
			this.setState({
				sentRequestDisplays: newSentRequestDisplays,
			})
		}
		*/
		this.setState({
			searchedUserType: newSearchedUserType
		})
		
		
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
