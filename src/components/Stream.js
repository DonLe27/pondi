import React from 'react';
import PromptDisplay from './PromptDisplay.js'
import HeaderBar from './HeaderBar.js'
import Categories from './Categories.js'
import '../styles/transitions.css';
import '../styles/stream.css';


class Stream extends React.Component{
	constructor(props){
		super(props);
		// parse data from parent to get prompts
		this.avatar=this.props.avatar;
		this.prompts = [];
		this.allprompts = this.props.prompts
		console.log(this.props.friendPosts)
		for (var i = 0; i < this.props.friendPosts.length; i++){
			var p = this.props.friendPosts[i];
			this.prompts.push(
				<PromptDisplay key={i} title={p.prompt.question} content={p["body"]} date={p["timestamp"]} avatar={p.profile.animal} first_name={p.profile.first_name} last_name={p.profile.last_name}/>
					);
		}
	}

	render() {
		return (
		
		<div className="Stream">
		<HeaderBar header="Stream"/>
	
		{this.prompts}
		</div>
		);
	}
}


export default Stream