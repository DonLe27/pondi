import React, { Component } from "react";
import LoginButton from './LoginButton';
import { Button, FormGroup, FormControl, Alert } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import '../styles/register.css'
import { connect } from "react-redux";
import { auth } from "../actions";
import RegisterAvatarColor from "./RegisterAvatarColor";

// const Register = () => (
//   <div>
//     <LoginButton />
//     <h1 className="Register-H1">Registration</h1>
//     <div className="Register" >
//         <RegisterForm className="RegisterForm" />
//     </div>
//   </div>
// )

// const LoginLink = () => (
//     <div>
//         <div>Already have an account?</div>
//         <Link to='/login'>Log in</Link>
//     </div>
// )

//////////////////////////////////////////////////////

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            username: "",
            email: "",
            password: "",
            show_error: false,
            error_message: "",
            register_requested: false
        };


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);

    }

    validateForm() {
        return this.state.first_name.length > 0 &&
            this.state.last_name.length > 0 &&
            this.state.username.length > 0 &&
            this.state.email.length > 0 &&
            this.state.password.length > 0;
        //&& this.state.repeated_password.length > 0;
    }

    setAvatar(item) {
        this.setState({ avatar: { item } });
    }


    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.props.register(
            this.state.username,
            this.state.password,
            this.state.first_name,
            this.state.last_name,
            this.state.email,
        ));

        // somehow check whether or not the user was registered

        this.register_requested();
    }

    showAlert(event) {
        return (
            <Alert bsStyle="danger">
            <p>{this.props.error_message}</p>
          </Alert>
        );
    }

    register_requested() {
        this.setState({
            register_requested: true,
        })
    }

    componentDidMount() {
        document.body.style.backgroundColor = "#D6E4EE";
    }

    componentWillUnmount() {
        document.body.style.backgroundColor = null;
    }

    render() {
        // if (this.props.isAuthenticated) {
        //     return <Redirect to="/home" />
        // }

        return (

            <div>
       {!this.state.register_requested ?
       	<div>
 
      <LoginButton />
      <h1 className="Register-H1">Registration</h1>
    <div className="Register" >    
      <form onSubmit={this.handleSubmit} className="RegisterForm">
        <FormGroup controlId="first_name" bsSize="large">
            <FormControl className="register-fname"
            autoFocus
            type="text"
            placeholder="first name"
            value={this.state.first_name}
            onChange={this.handleChange}
            />
        </FormGroup>
        <FormGroup controlId="last_name" bsSize="large">
            <FormControl className="register-lname"
            autoFocus
            type="text"
            placeholder="last name"
            value={this.state.last_name}
            onChange={this.handleChange}
            />
        </FormGroup>

        <FormGroup controlId="username" bsSize="large">
            <FormControl className="register-wide"
            autoFocus
            type="text"
            placeholder="username"
            value={this.state.username}
            onChange={this.handleChange}
            />
        </FormGroup>

        <FormGroup controlId="email" bsSize="large">
            <FormControl className="register-wide"
            placeholder="email"
            autoFocus
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
            />
        </FormGroup>

        <FormGroup controlId="password" bsSize="large">
            <FormControl className="register-wide"
            placeholder="password"
            autoFocus
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
            />
        </FormGroup>



        <Button className="register-button"
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
        >next
        </Button>
    </form>

    
</div>
</div>   
:
     <RegisterAvatarColor data={this.state}/> }
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
        register: (username, password, first_name, last_name, email) => 
            dispatch(auth.register(username, password, first_name, last_name, email)),
        updateAvatarColor: (first_name, last_name, animal, color) => dispatch(auth.updateAvatarColor(first_name, last_name, animal, color))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);