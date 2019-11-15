import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/transitions.css';
import '../styles/archive.css';
import PromptDisplay from './PromptDisplay.js'
import Categories from './Categories.js'
import HeaderBar from './HeaderBar.js'

class Archive extends React.Component{
	constructor(props){
		super(props);
		// parse data from parent to get prompts

		this.avatar=this.props.avatar;
		this.prompts = [];
		this.allprompts = this.props.prompts

		for (var i = 0; i < this.props.myposts.length; i++){
			var p = this.props.myposts[i];
			var question;
			for (var j = 0; j < this.props.prompts.length; j++){
				if(this.allprompts[j].id == this.props.myposts[i].prompt){
					question = this.props.prompts[j].question
				}
			}
			this.prompts.push(
					<PromptDisplay key={i} title={question} content={p["body"]} date={p["timestamp"]} avatar={this.avatar}/>
					);
		}

	}
	componentWillReceiveProps(newProps)
	{
			if (newProps.myposts != this.props.myposts || newProps.prompts != this.props.prompts)
			{
				this.avatar=newProps.avatar;
				this.prompts = [];
				this.allprompts = newProps.prompts

				for (var i = 0; i < newProps.myposts.length; i++){
					var p = newProps.myposts[i];
					var question;
					for (var j = 0; j < newProps.prompts.length; j++){

						if(this.allprompts[j].id == newProps.myposts[i].prompt){
							question = newProps.prompts[j].question
							break;
						}
					}
					
					this.prompts.push(
							<PromptDisplay key={i} title={question} content={p["body"]} date={p["timestamp"]} avatar={this.avatar}/>
							);
			}
		
		}
	}

	

	render() {
		return (
		
		<div className="Archive">
		<HeaderBar header="Pond"/>
	
		{this.prompts}
		</div>
		);
	}
}
export default Archive