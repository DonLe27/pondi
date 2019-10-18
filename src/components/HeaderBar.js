import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/friends.css';


class HeaderBar extends React.Component{
	constructor(props)
	{
		console.log(props.header)
		super(props);
		this.header = props.header
		this.state = {
			categories : [ this.header],
		}
		
	}
	componentWillReceiveProps(newProps)
	{
		if (newProps.header != this.props.header)
		{
			this.setState({
				categories : newProps.header
			})
		}
	}

	render(){
		return (
		<div className="friend-holder">
		{		
			this.state.categories.map((item,i) =><div key={i} className="friend">{item}</div>)	
		}	
		</div>	
);
	}
}

export default HeaderBar