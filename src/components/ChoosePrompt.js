import React from 'react';

import '../styles/choosePrompt.css';


class ChoosePrompt extends React.Component {
	

	constructor(props){
		super(props);
		this.prompt = this.props.prompt

	}

	

	render() {
		return (
		
		<div>
            <h>{this.state.prompt}</h>
		</div>
		);
	}
} 

export default ChoosePrompt