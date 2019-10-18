import React from 'react';
import '../styles/pendingfrienddisplay.css';
import { Button } from "react-bootstrap";
class PendingFriendDisplay extends React.Component {

	constructor(props)
	{
		super(props);
		
	}

	render(){
		return(
			<div className ="friend">
			<Button className="prompt_title" onClick={(i) => {this.props.acceptFriend(this.props.username)}}>{this.props.username}</Button>
			</div>
		);
	}
}
	

export default PendingFriendDisplay