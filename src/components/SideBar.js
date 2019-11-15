import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../styles/transitions.css";
import "../styles/sidebar.css";
import SidebarButtons from "./SidebarButtons.js"
import vec1 from "../styles/vectors/vector1.png";
import vec2 from "../styles/vectors/vector2.png";


import ProfPic from "./ProfPic.js";

class Username extends React.Component {
  constructor(props) {
    super(props);

    this.username = this.props.username;
    
  }
  
  render() {
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
    var displayName = this.props.first_name
    return (
      <div className="SideBar">
        <SidebarButtons addSettings={this.props.addSettings} addFriends={this.props.addFriends}/>
        <ProfPic classType="avatar" color={this.props.color} avatar={this.props.avatar} />

        <Username username={displayName} />
        <Button
          className="Button"
          block
          bsSize="large"
         // addarchive={this.props.addarchive}
          onClick={i => this.props.addarchive("somevar")}
        >
          pond
        </Button>
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
        //  addarchive={this.props.addPrompt}
          onClick={i => this.props.addPrompt("somevar")}
        >
          prompt
        </Button>


        <img className="sidebar-vector1" src={vec1} alt="vector1" />
        <img className="sidebar-vector2" src={vec2} alt="vector1" />
      </div>
    );
  }
}

export default SideBar;