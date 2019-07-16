import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../styles/transitions.css";
import "../styles/sidebar.css";
import vec1 from "../styles/vectors/vector1.png";
import vec2 from "../styles/vectors/vector2.png";

import ProfPic from "./ProfPic.js";

class Username extends React.Component {
  constructor(props) {
    super(props);

    this.username = this.props.username;
    
  }
  
  render() {
    console.log("Rendering username:", this.props.username)
    return <div className="Username">{this.props.username}</div>;
  }
}

class SideBar extends React.Component {
  constructor(props) {
    super(props);

   // this.userData = this.props.userData;
    this.avatar = this.props.avatar;
    this.username = this.props.username

  }

  componentWillReceiveProps (nextProps) {
    this.setState({ data: nextProps.data });  
  }

  render() {

    var addStream = this.props.addStream;
    var addOcean = this.props.addOcean;
    var addarchive = this.props.addarchive;
    var addPrompt = this.props.addPrompt;
    return (
      <div className="SideBar">
        <ProfPic classType="avatar" avatar={this.props.avatar} />

        <Username username={this.props.username} />
        <Button
          className="Button"
          block
          bsSize="large"
       //   addStream={this.props.addStream}
          onClick={i => this.props.addStream("somevar")}
        >
          stream
        </Button>
        <Button
          className="Button"
          block
          bsSize="large"
         // addOcean={this.props.addOcean}
          onClick={i => this.props.addOcean("somevar")}
        >
          ocean
        </Button>
        <Button
          className="Button"
          block
          bsSize="large"
         // addarchive={this.props.addarchive}
          onClick={i => this.props.addarchive("somevar")}
        >
          archive
        </Button>
        <Button
          className="Button"
          block
          bsSize="large"
        //  addarchive={this.props.addPrompt}
          onClick={i => this.props.addPrompt("somevar")}
        >
          prompt
        </Button>
        <Button
          className="Button"
          block
          bsSize="large"
        //  addarchive={this.props.addPrompt}
          onClick={i => this.props.addFriends("somevar")}
        >
          friends
        </Button>

        <img className="sidebar-vector1" src={vec1} alt="vector1" />
        <img className="sidebar-vector2" src={vec2} alt="vector1" />
      </div>
    );
  }
}

export default SideBar;