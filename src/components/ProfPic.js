import React from 'react';
//import { Link } from 'react-router-dom';
//import { Button } from "react-bootstrap"
import '../styles/transitions.css';
import crabPic from '../Images/crab.png'
import turtlePic from '../Images/turtle.png'
import stingrayPic from '../Images/stingray.png'
import butterfliesPic from '../Images/butterflies.png'

class ProfPic extends React.Component {
    constructor(props) {
       // console.log(pic)
        super(props);
        this.pallette = "#98AABB";
        if (this.props.color)
            this.pallette = this.props.color;
        this.classType = this.props.classType;
    }
    render() {
        console.log(this.props.avatar)
        var pic = turtlePic
        if (this.props.avatar == "crab")
            pic = crabPic
        if (this.props.avatar == "turtle")
            pic = turtlePic
        if (this.props.avatar == "stingray")
            pic = stingrayPic
        if (this.props.avatar == "butterflies")
            pic = butterfliesPic
        return (
            <div className={this.classType} >
		    <img src={pic} style={{'backgroundColor' : this.pallette}}/>
        </div>
        );
    }
}

export default ProfPic