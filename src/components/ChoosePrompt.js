import React from 'react';

import '../styles/choosePrompt.css';


class ChoosePrompt extends React.Component {
	

	constructor(props){
		super(props);

	}

	

	render() {
		return (
		
		<div>
            <h className="title">{this.props.prompt}</h>
		</div>
		);
	}
} 

export default ChoosePrompt