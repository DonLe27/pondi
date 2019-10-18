import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/transitions.css';
import '../styles/archive.css';
import PromptDisplay from './PromptDisplay.js'
import Categories from './Categories.js'
import HeaderBar from './HeaderBar.js'

class FriendProfile extends React.Component{
	constructor(props){
		super(props);
		// parse data from parent to get prompts
		this.state = {
			friendName: "",

		}
		this.avatar=this.props.avatar;
		this.prompts = [];
		this.allprompts = this.props.prompts

		for (var i = 0; i < this.props.friendProfilePosts.length; i++){
			var p = this.props.friendProfilePosts[i];
			var question;
			for (var j = 0; j < this.props.prompts.length; j++){

				if(this.allprompts[j].id == this.props.friendProfilePosts[i].prompt){
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
			if (newProps.friendProfilePosts != this.props.friendProfilePosts || newProps.prompts != this.props.prompts)
			{
				this.avatar=newProps.avatar;
				this.prompts = [];
				this.allprompts = newProps.prompts

				for (var i = 0; i < newProps.friendProfilePosts.length; i++){
					var p = newProps.friendProfilePosts[i];
					var question;
					for (var j = 0; j < newProps.prompts.length; j++){

						if(this.allprompts[j].id == newProps.friendProfilePosts[i].prompt){
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
		<HeaderBar header={this.props.friendName}/>
		{this.prompts}
		</div>
		);
	}
}
export default FriendProfile