//This page will render the chosen prompt and allow it to be edited
//Need to pass down prompt ID 
//Make a new menu that does that passing down
//for now put in random ID
import React from "react";
import { Link } from "react-router-dom";
import {  Button } from "react-bootstrap";
import "../styles/prompt.css";
import "./ChoosePrompt.js"
import { connect } from "react-redux";
import { auth } from "../actions";
import ChoosePrompt from "./ChoosePrompt.js";
class Prompt extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imagefile: null,
      body: "",
      theme: "love",
      privacy: "p",
      prompt: this.props.prompts[this.props.prompts.length-1].question,
      promptId: this.props.prompts.length,
      myposts: this.props.myposts,
    };
  }
  componentWillReceiveProps(newProps)
	{
			if (newProps.myposts != this.props.myposts || newProps.prompts != this.props.prompts){
				this.setState({
          myposts: newProps.myposts
        })
        console.log("Rendering archive again")
      }
  }
  promptChangeHandler = (newPrompt) => {
    //newPrompt holds id of prompt which is +1 the index value
    var exist = false;
    let postIndex = -1;
    var i;
    for (i = 0; i < this.state.myposts.length; i++) 
    {
      if (this.state.myposts[i].prompt == newPrompt)
      //If the user already had a post written for that prompt
      {//Don't break and get the last one
        console.log("Exists")
        postIndex = i
        exist = true;
      }
    }
    //LOOKS LIKE THE UPDATES DONT UPDATE THE STATE--SEE HOW ARCHIVE STATE GETS UPDATED
    if (exist)
    {
      this.setState({
        body: this.state.myposts[postIndex].body,
        theme: this.state.myposts[postIndex].theme,
        privacy: this.state.myposts[postIndex].privacy,
        prompt: this.props.prompts[newPrompt-1].question,
        promptId: newPrompt,
      });
    }
    else
    {
      this.setState({
        body: "",
        theme: "",
        privacy: "p",
        promptId: newPrompt,
        prompt: this.props.prompts[newPrompt-1].question
      });
    }
  }
  fileChangedHandler = event => {
    this.setState({ imagefile: event.target.files[0] });
  };

  textInputHandler = event => {
    this.setState({ body: event.target.value });
    console.log(this.state.body)
  };

  uploadHandler = () => {
    var i;
    var postId;
    let exist = false
    for (i = 0; i < this.props.myposts.length; i++)
    {
      if (this.props.myposts[i].prompt == this.state.promptId)
      {
        exist = true;
        postId = this.props.myposts[i].id;
        console.log(postId);
      }
    }
    if (exist)
    {
      console.log(this.state.body);
      console.log(this.props.postUpdate(postId, this.state.body, this.props.id, this.state.theme, this.state.privacy));
      this.props.getMyPosts();
    }
    else
    {
    console.log(this.state.body);
    console.log(this.props.post(this.state.promptId, this.state.body, this.props.id, this.state.theme, this.state.privacy));
    this.props.getMyPosts();
    
    }
  };
  privacyHandler = (privacy) => {
    if (this.state.privacy == "p"){
      this.setState({
        privacy: "c"
      })
    }
    if (this.state.privacy == "c"){
      this.setState({
        privacy: "f"
      })
    }
    if (this.state.privacy == "f"){
      this.setState({
        privacy: "o"
      })
    }
    if (this.state.privacy == "o"){
      this.setState({
        privacy: "p"
      })
    }
  }


  componentDidMount() {
    var exist = false;
    let postIndex = -1;
    var i;
    for (i = 0; i < this.state.myposts.length; i++) 
    {
      if (this.state.myposts[i].prompt == this.state.promptId)
      //If the user already had a post written for that prompt
      {//Don't break and get the last one
        console.log("Exists")
        postIndex = i
        exist = true;
      }
    }
    if (exist)
    {
      this.setState({
        body: this.state.myposts[postIndex].body,
        theme: this.state.myposts[postIndex].theme,
        privacy: this.state.myposts[postIndex].privacy,
        prompt: this.props.prompts[this.state.promptId-1].question
      });
    }
  }
//code for file submission
/*          <input
            type="file"
            id="file"git 
            className="inputfile"
            accept="image/*"
            onChange={this.fileChangedHandler}
          />
          <label for="file" className="Upload">
            <img src="https://images.vexels.com/media/users/3/153834/isolated/preview/d0679e2704e98a8041508fba4c332d49-paper-clip-stroke-icon-by-vexels.png" />
          </label>
          */
  render() {
    //Make buttons for changing prompts
    var i;
    return (
      <div>
        <div className="choice-container">
  
          <ChoosePrompt prompts={this.props.prompts} changePrompt={this.promptChangeHandler.bind(this)} />
        </div>
        

        <div className="Container">
          <textarea
            type="text"
            value={this.state.body}
            onChange={this.textInputHandler}
            placeholder="Type your response here"
          />

          <inputchangePromptchangePrompt
            type="image"
            className="Visibility"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Globe_icon.svg/768px-Globe_icon.svg.png"
          />
        <div className="privacy-container">
        {this.state.privacy == "p" && <button className="privacy-button" onClick={()=> {this.privacyHandler()}}>Private</button>}
        {this.state.privacy == "c" && <button className="privacy-button" onClick={()=> {this.privacyHandler()}}>Close Friends</button>}
        {this.state.privacy == "f" && <button className="privacy-button" onClick={()=> {this.privacyHandler()}}>Friends</button>}
        {this.state.privacy == "o" && <button className="privacy-button" onClick={()=> {this.privacyHandler()}}>Ocean</button>}
        </div>
        </div>
        <div className="post-container">
          <button className="Post" onClick={this.uploadHandler}>
            Save
          </button>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => {
    let errors = [];
    if (state.auth.errors) {
        errors = Object.keys(state.auth.errors).map(field => {
            return { field, message: state.auth.errors[field] };
        });
    }
    return {
        errors,
        isAuthenticated: state.auth.isAuthenticated,
        token: state.auth.token

    };
}

const mapDispatchToProps = dispatch => {
    return {
        loadUser: () => dispatch(auth.loadUser()),
        post: (prompt, body, profile, theme, privacy) => 
            dispatch(auth.post(prompt, body, profile, theme, privacy)),
        postUpdate: (postId, body, profile, theme, privacy) => 
            dispatch(auth.postUpdate(postId, body, profile, theme, privacy)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Prompt);