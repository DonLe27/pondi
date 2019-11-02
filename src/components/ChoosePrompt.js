import React from 'react';

import '../styles/choosePrompt.css';


class ChoosePrompt extends React.Component {
	

	constructor(props){
		super(props);
		this.prompts = []
		for(var i = 0; i < this.props.prompts.length; i++){
			this.prompts.push(<option value="dog">{this.props.prompts[i].question}</option>)
		}
	}

	

	render() {
		return (
			<div>
				<select id="prompt-select">
					{this.prompts}
				</select>
			</div>
		);
	}
} 

export default ChoosePrompt