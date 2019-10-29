import React from 'react';
import '../styles/settings.css';
import Dropdown from './Dropdown.js'

class Settings extends React.Component {
	

	constructor(props){
		super(props);
		this.hi = this.hi.bind(this);
		this.bye = this.bye.bind(this);
	}

	hi(){
		console.log('hi');
	}
	bye(){
		console.log('bye');
	}
	render() {
		const buttonTitles = [ "hi" , "bye"];
		const buttonFunctions = [ this.hi, this.bye ];

		return (
		
		<div className="Settings">
            <h>Hi Porcupines</h>
			<Dropdown buttonTitles={buttonTitles} buttonFunctions={buttonFunctions}/>
		</div>
		);
	}
} 

export default Settings