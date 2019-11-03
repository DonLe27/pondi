import React from 'react';
import '../styles/choosePrompt.css';
import Select from 'react-select'
class ChoosePrompt extends React.Component {
	

	constructor(props){
		super(props);
		var promptsLength = this.props.prompts.length
		this.state = {
			selectedOption: {value: promptsLength, label: this.props.prompts[this.props.prompts.length-1].question}
		}
		this.prompts = []
		for(var i = promptsLength-1; i > -1; i--){
			var question = this.props.prompts[i].question
			var id = this.props.prompts[i].id
			this.prompts.push({value: id, label: question})
		}
	}


	
	handleChange = (newOption) => {
		this.setState({ selectedOption: newOption });
		this.props.changePrompt(newOption["value"])
		console.log(`Option selected:`, newOption);
	  }
	  
	render() {
		return (
			<Select
			className="custom-select"
			defaultValue={this.state.selectedOption}
			options={this.prompts}
			onChange={this.handleChange}
		  />
		);
	}
} 

export default ChoosePrompt