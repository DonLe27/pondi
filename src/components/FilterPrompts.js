    import React from 'react';
import '../styles/filterPrompts.css';
import Select from 'react-select'

class FilterPrompts extends React.Component {
	

	constructor(props){
        super(props);
        this.chosenColor = "#808080"
        this.state={
            color1: "#C4C4C4",
            color2: "#C4C4C4",
            color3: "#C4C4C4"
        }
    }
    
    handleClick = (inputCategories) => {
        console.log(inputCategories)
        this.props.filterPrompts(inputCategories)
        if (inputCategories[0] === "1"){
            this.setState({
                color1: this.chosenColor,
                color2: "#C4C4C4",
                color3: "#C4C4C4"
            })
        }
        else  if (inputCategories[0] === "2"){
            this.setState({
                color2: this.chosenColor,
                color1: "#C4C4C4",
                color3: "#C4C4C4"
            })
        }
        else  if (inputCategories[0] === "3"){
            this.setState({
                color3: this.chosenColor,
                color1: "#C4C4C4",
                color2: "#C4C4C4"
            })
        }
        else{
            this.setState({
                color1: "#C4C4C4",
                color2: "#C4C4C4",
                color3: "#C4C4C4"
            })
        }

    }
	render() {
        return(
            <div className="filter-container">
                <span className="depth-container">
                    <span className="depth-description-container">
                            <h>depth</h>
                            <p>1 - surface: chill, fun questions about light topics</p>
                            <p>2 - medium: getting a bit heavier</p>
                            <p>3 - deep: big questions about life and yourself</p>
                            <button style={{width:"4.5vw"}} onClick={i => this.handleClick(["clear"])}>clear filter</button>
                    </span>
                    <span className="bar-container">
                        <div className="depth-bar">
                            <div onClick={i => this.handleClick(["1"])}  style={{top:"15%", position: "absolute", right:"10%"}} className="depth-button-wrapper">
                                <div style={{background:this.state.color1}} className="depth-button"><div className="depth-dot" style={{background:this.state.color1}}/> </div>
                            </div>
                            <div onClick={i => this.handleClick(["2"])}  style={{top:"50%", position: "absolute", right:"10%"}} className="depth-button-wrapper">
                                <div  style={{background:this.state.color2}} className="depth-button"> <div className="depth-dot" style={{background:this.state.color2}}/></div>
                            </div>
                            <div onClick={i => this.handleClick(["3"])} style={{top:"85%", position: "absolute", right:"10%"}} className="depth-button-wrapper">
                                <div  style={{background:this.state.color3}} className="depth-button"> <div className="depth-dot" style={{background:this.state.color3}}/></div>
                            </div>
                        </div>
                    </span>
                </span>
            </div>
        )
    }   
}

export default FilterPrompts