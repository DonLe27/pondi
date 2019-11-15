import React, { Component } from "react";
import LoginButton from './LoginButton';
import { Button, FormGroup, FormControl, Alert } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import '../styles/register.css'
import { connect } from "react-redux";
import { auth } from "../actions";


class RegisterAvatarColor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: this.props.data["first_name"],
            last_name: this.props.data["last_name"],
            
            avatar: "",
            selected_avi: 0,
            color: "",
            selected_color: "#AAAAAA",

            redirect : false
        }

        // Avatars:
        this.avatars = [
            "crab",
            "turtle",
            "stingray",
            "butterflies"
        ]

        this.colors = [
            "#7F91A8",
            "#BFD9A9",
            "#9895C1",
            "#A0A0A0",
            "#7AA1A4",
            "#ECA586",
            "#EBD08C",
            "#DC8282"
        ]

        this.handleSubmit = this.handleSubmit.bind(this);
        this.redirectToHome = this.redirectToHome.bind(this);
    }


    validate() {
        return this.state.first_name.length > 0 &&
            this.state.last_name.length > 0 &&
            this.state.avatar !== "" 
           // && this.state.color !== "";
        //&& this.state.repeated_password.length > 0; 
    }

    handleSubmit(event) {
        console.log("handle submit fired")
        this.setState({redirect: true}) 
        event.preventDefault();
        console.log(this.props.updateAvatarColor(
            this.state.first_name,
            this.state.last_name,
            this.state.avatar,
            this.state.color
        ));
    }	

    redirectToHome() {
        this.setState({redirect: true})    
    }

    render() {
        console.log("yes" + process.env.PUBLIC_URL)
        if (this.state.redirect === true) {
            return (<Redirect to='/home'></Redirect>)
        }
        return (
<div>
        	      <h1 className="Register-H1">Registration</h1>

            <div className="Register">
            <form onSubmit={this.handleSubmit} className="RegisterForm">

  			<p className="register-wide-label"> Choose your avatar </p>
  			{this.avatars.map((avatar, index) => 
       			<Button key={index} className="avatar-button" onClick={() => (this.setState({avatar: avatar, selected_avi: index}))}>
       			<img src={process.env.PUBLIC_URL + avatar + ".png"} />
       			</Button>
  				)
      		}

      		<hr />

       { (this.state.avatar != "" ) &&  <p className="avatar-final" style={{background: "#98AABB"}}>{<img src={process.env.PUBLIC_URL + this.state.avatar + ".png"} />}</p>}
       {/* 
     <hr />

        <p className="register-wide-label"> Choose a Color </p>

			{this.colors.map((this_color, index) => 
       			<Button key={index} style={{background: this_color}} className="color-button" onClick={() => (this.setState({color: this_color, selected_color: this_color}))}>
       			</Button>
  				)
      		}
        -->
        */}
		
<Button className="register-button"
            block
            bsSize="large"
            disabled={!this.validate()}
            type="submit"
           // onClick={this.redirectToHome}
      
        >next
        </Button>
</form>
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
        isAuthenticated: state.auth.isAuthenticated
    };
}

const mapDispatchToProps = dispatch => {
    return {
        updateAvatarColor: (first_name, last_name, animal, color) => 
            dispatch(auth.updateAvatarColor(first_name, last_name, animal, color))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterAvatarColor);