import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/transitions.css';
import '../styles/archive.css';
import PromptDisplay from './PromptDisplay.js'
import Categories from './Categories.js'
import HeaderBar from './HeaderBar.js'
import '../styles/searchVector.css';
import vec1 from "../styles/vectors/vector2.1.png"

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
		const textStyle = {
			textAlign: "center",
			fontFamily: "Barlow",
			fontStyle: "normal",
			fontWeight: "bold",
			fontSize: "2vw",
			lineHeight: "194px",
			color: "rgb(152, 170, 187)"
		}
		if (this.prompts.length > 0){
		return (
		
		<div className="Archive">
		<HeaderBar header="Pond"/>
	
		{this.prompts}
		</div>
		);
		}
		else{
			return(
				<div className="Archive">
				<HeaderBar header="Pond"/>
				<h1 style={textStyle}>These are uncharted waters. Visit the prompts and explore.</h1>
				<img className="search-vector" src={vec1} alt="vector1" />
				</div>
			);
		}
	}
}
export default Archive