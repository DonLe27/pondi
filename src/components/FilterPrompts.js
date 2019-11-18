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
                        
                    </div>
                </span>
            </div>
        )
    }   
}

export default FilterPrompts