import React from 'react';
import '../styles/pendingfrienddisplay.css';
import '../styles/archive.css';
import { Button } from "react-bootstrap";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
class MoreOptions extends React.Component {

	constructor(props)
	{
		super(props);
		
	}

	render(){
            return(
                <div className="Archive">
        <IconButton 
            color="primary" 
            aria-label="Edit"
        >
            <EditIcon style={{ fontSize: '20px' }} />
        </IconButton >
            </div>
        );
    }
}



export default MoreOptions