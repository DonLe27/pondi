import React from 'react';

import '../styles/searchuser.css';
import searchIcon from "../Images/search.png";

class SearchUser extends React.Component {

	constructor(props)
	{
		super(props);
		this.state = {
            friendname: ""
        }
	}
    textInputHandler = event => {
        const isEnterPressed = event.which === 13 || event.keyCode === 13;
        if (isEnterPressed) {
          console.log("Enter pressed!")
          this.props.searchUser(this.state.friendname)
        }
        else{
            console.log(event.target.value)
            this.setState({friendname: event.target.value})
        }

        
    }
	render(){
		return(
            <div className="searchuser-container ">
                <input className="searcharea"
                value={this.state.friendname}
                type="text"
                onChange={this.textInputHandler}
                onKeyPress={this.textInputHandler}
                placeholder="search user"
                />
                <img src={searchIcon} className="search-img" alt="search icon" ></img>
            </div>
            
		);
	}
}
	

export default SearchUser