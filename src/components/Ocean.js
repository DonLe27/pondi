import React from 'react';
import '../styles/transitions.css';
import '../styles/ocean.css';
import PromptDisplay from './PromptDisplay.js'
import Categories from './Categories.js'
import HeaderBar from './HeaderBar.js'


class Ocean extends React.Component {
	

	constructor(props){
		super(props);
		// parse data from parent to get prompts
		console.log(this.props.oceanPosts)
		this.prompts = [];
		this.allprompts = this.props.prompts
		for (var i = 0; i < this.props.oceanPosts.length; i++){
			var p = this.props.oceanPosts[i];

			this.prompts.push(
				<PromptDisplay key={i} title={p.prompt.question} content={p["body"]} date={p["timestamp"]} avatar={p.profile.animal}/>
				);
		}
	}

	

	render() {
		return (
		
		<div className="Archive">
		<HeaderBar header="Ocean"/>
	
		{this.prompts}
		</div>
		);
	}
} 

export default Ocean