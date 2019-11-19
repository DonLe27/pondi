    import React from 'react';
import '../styles/filterPrompts.css';
import Select from 'react-select'

class FilterPrompts extends React.Component {
	

	constructor(props){
		super(props);
	
	}

	render() {
        return(
            <div className="filter-container">
                <span className="label-container">
                    <h>Filters</h>
                </span>
                <span className="depth-container">
                    <h>Depth</h>
                    <div className="depth-bar">
                        <div style={{top:"15%"}} className="depth-button"> <span className="depth-dot"/></div>
                        <div style={{top:"50%"}} className="depth-button"></div>
                        <div style={{top:"85%"}} className="depth-button"></div>
                    </div>
                </span>
            </div>
        )
    }   
}

export default FilterPrompts