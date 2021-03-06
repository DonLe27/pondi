import React from 'react';
import '../styles/userButton.css';
import {  Button } from "react-bootstrap";

// Dropdown component accepts an array of functions and an array of names as props

class UserButton extends React.Component{
    constructor(props){
        super(props)
        console.log(this.props.buttonTitles)
        console.log(this.props.buttonFunctions)
        console.log(props.username)
    }

        render(){
            const buttonStyle = {
                backgroundColor: "white",
                borderRadius: "12px",
                fontSize:"0.75vw",
                fontFamily: "Barlow"
            }
                return(
                    <div>
                        <Button style={buttonStyle} variant="outline-secondary" className="button-header" onClick={()=>{this.props.buttonFunctions[0](this.props.username)}}>
                            {this.props.buttonTitles[0]}
                        </Button>
                    </div>
                )
            }
        
    }
//onClick={()=> {this.privacyHandler()}}

export default UserButton