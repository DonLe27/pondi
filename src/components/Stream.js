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
		for (var i = 0; i < this.props.friendPosts.length; i++){
			var p = this.props.friendPosts[i];
			var question;
			for (var j = 0; j < this.props.prompts.length; j++){

				if(this.allprompts[j].id == this.props.friendPosts[i].prompt){
					question = this.props.prompts[j].question
				}
			}
			this.prompts.push(
					<PromptDisplay key={i} title={question} content={p["body"]} date={p["timestamp"]} avatar={this.avatar}/>
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