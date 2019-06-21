import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/transitions.css';
import '../styles/ocean.css';
import PromptDisplay from './PromptDisplay.js'
import Categories from './Categories.js'


class Ocean extends React.Component {
	

	constructor(props){
		super(props);
		// parse data from parent to get prompts
		console.log(this.props.oceanPosts)
		this.avatar=this.props.avatar;
		this.prompts = [];
		this.allprompts = this.props.prompts
		console.log(this.allprompts)
		console.log(this.allprompts[0])
		for (var i = 0; i < this.props.oceanPosts.length; i++){
			var p = this.props.oceanPosts[i];
			var question;
			for (var j = 0; j < this.props.prompts.length; j++){

				if(this.allprompts[j].id == this.props.oceanPosts[i].prompt){
					question = this.props.prompts[j].question
				}
			}
			this.prompts.push(
					<PromptDisplay title={question} content={p["body"]} date={p["timestamp"]} avatar={this.avatar}/>
					);
		}
		console.log("Rendering archive")
	}

	

	render() {
		return (
		
		<div className="Archive">
		<Categories />
		{this.prompts}
		</div>
		);
	}
} 

export default Ocean