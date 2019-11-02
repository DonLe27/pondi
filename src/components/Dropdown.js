import React from 'react';
import '../styles/dropdown.css';
 
// Dropdown component accepts an array of functions and an array of names as props

class Dropdown extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            listOpen: false
        }
 
        this.buttonTitles = this.props.buttonTitles;
        this.buttonFunctions = this.props.buttonFunctions;
 
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.toggleList = this.toggleList.bind(this);
        
    }
    toggleList(){
        this.setState( prevState => ({
            listOpen: !prevState.listOpen
        }))
    }
    handleClickOutside(){
        this.setState({
            listOpen: false
        });
    }
    render(){
        const dropdownselections = this.props.buttonFunctions.map((f, index) => {
            return (<button onClick={f}>{this.props.buttonTitles[index]}</button>)
        });

        if (this.state.listOpen) {
            return (
                <div>
                    <div className="dropdown-header" onClick={this.toggleList}>
                        
                    </div>
                    <ul className="dropdown-content" >{dropdownselections}</ul>        
                </div>
            );
        }
        else {
            return (
                <div>
                    <div className="dropdown-header" onClick={this.toggleList}>
                        
                    </div>
                </div>
            )
        }
    }
}

export default Dropdown