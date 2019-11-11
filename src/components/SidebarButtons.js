import React from 'react';
import "../styles/sidebarButtons.css";
import settingsSearch from "../styles/vectors/settings-search.png";
import settingsGear from "../styles/vectors/settings.png";
class SidebarButtons extends React.Component{
    constructor(props)
    {
        super(props);
        
    }

    render(){
        const imgStyle = {
            paddingLeft: "11px",
            paddingTop: "8px",
            height: "3vh",
            width: "3vh"

        }
        return(
            <div padding="10px">
                <img  style={imgStyle} onClick={i => this.props.addFriends()}  src={settingsSearch} />
                <img style={imgStyle} onClick={i => this.props.addSettings()} src={settingsGear} />
            </div>
            
        )
    }
}

export default SidebarButtons
