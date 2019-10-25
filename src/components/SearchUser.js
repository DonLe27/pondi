import React from 'react';

import '../styles/searchuser.css';
import { Button} from "react-bootstrap"

class SearchUser extends React.Component {

	constructor(props)
	{
		super(props);
		this.state = {
            friendname: ""
        }
	}
    textInputHandler = event => {
        this.setState({friendname: event.target.value})
        console.log(this.state.friendname)
    }
	render(){
		return(
            <div className="searchuser">
                <h3>Search Form</h3>
                <textarea className="textarea"
                value={this.state.friendname}
                type="text"
                onChange={this.textInputHandler}
                placeholder="Search for users here"
                />
                <Button onClick={(i) => {this.props.searchUser(this.state.friendname)}}>Search</Button>
            </div>
            
		);
	}
}
	

export default SearchUser