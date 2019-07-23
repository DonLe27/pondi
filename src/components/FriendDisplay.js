import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/frienddisplay.css';
import ProfPic from './ProfPic.js'
import { Button } from "react-bootstrap";
class FriendDisplay extends React.Component {

	constructor(props)
	{
		super(props);
		
	}

	render(){
		return(
			<div className ="friend">
			<h6 className="prompt_title">{this.props.username}</h6>
			</div>
		);
	}
}
	

export default FriendDisplay