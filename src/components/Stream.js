import React from 'react';
import PromptDisplay from './PromptDisplay.js'
import HeaderBar from './HeaderBar.js'
import '../styles/transitions.css';
import '../styles/stream.css';
import '../styles/searchVector.css';
import vec1 from "../styles/vectors/vector2.1.png";


class Stream extends React.Component{
	constructor(props){
		super(props);
		// parse data from parent to get prompts
		this.avatar=this.props.avatar;
		this.prompts = [];
		this.allprompts = this.props.prompts
		var dupDic = {}
		console.log(this.props.friendPosts)
		for (var i = this.props.friendPosts.length - 1; i >= 0; i--){
			var p = this.props.friendPosts[i];
			if (!((p.prompt.question + p.profile.first_name + p.profile.last_name + p["timestamp"]) in dupDic)){
				dupDic[p.prompt.question + p.profile.first_name + p.profile.last_name + p["timestamp"]] = 1;
				this.prompts.push(
					<PromptDisplay key={i} title={p.prompt.question} content={p["body"]} date={p["timestamp"]} avatar={p.profile.animal} first_name={p.profile.first_name} last_name={p.profile.last_name}/>
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
		
		<div className="Stream">
		<HeaderBar header="Stream"/>
		
		{this.prompts}
		</div>
		);
		}
		else{
			return(
				<div className="Stream">
				<HeaderBar header="Stream"/>
				<h1 style={textStyle}>These are uncharted waters. Connect with other users and explore.</h1>
				<img className="search-vector" src={vec1} alt="vector1" />
				</div>
			);
		}
	}
}


export default Stream