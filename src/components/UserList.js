import React from 'react';
import '../styles/userList.css'
class UserList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            displayList: this.props.friendDisplays,
            userType: 'f'
        }
    }

    displayFriends() {
        console.log("displaying friends")
        this.setState({ 
            displayList : this.props.friendDisplays,
            userType: 'f'
        })
    }
    displayCloseFriends() {
        console.log("displaying close friends")
        this.setState({ 
            displayList : this.props.closeFriendDisplays,
            userType: 'c'})
    }
    displayPendingFriends() {
        console.log("displaying pending friends")
        this.setState({ 
            displayList : this.props.pendingFriendDisplays,
            userType: 'p'
        })
    }
    componentWillReceiveProps(newProps) {
        if (this.state.userType == 'f' && this.props.friendDisplays !== newProps.friendDisplays) {
            console.log("Updating friends")
          this.setState({
              displayList : newProps.friendDisplays
          })
        }
        if (this.state.userType == 'c' && this.props.closeFriendDisplays !== newProps.closeFriendDisplays) {
            console.log("Updating close friends")
            this.setState({
                displayList : newProps.closeFriendDisplays
            })
          }
          if (this.state.userType == 'p' && this.props.pendingFriendDisplays !== newProps.pendingFriendDisplays) {
              console.log("Updating pending friend")
            this.setState({
                displayList : newProps.pendingFriendDisplays
            })
          }
      }
    render(){
        console.log("Rendering UserList.js")
        console.log(this.state.displayList)
        return(
            <div className="list-container">
                <h1>Connections</h1>
                <hr/>
                <div className="buttonsContainer">
                    <button className={this.state.userType === 'f' ? "list-clickedButton" :"list-unclickedButton"} onClick={()=>{this.displayFriends()}}>friends</button>
                    <button className={this.state.userType === 'c' ? "list-clickedButton" :"list-unclickedButton"} onClick={()=>{this.displayCloseFriends()}}>close friends</button>
                    <button className={this.state.userType === 'p' ? "list-clickedButton" :"list-unclickedButton"} onClick={()=>{this.displayPendingFriends()}}>pending friends</button>
                </div>
                {this.state.displayList}
            </div>
        )
    }
}

export default UserList