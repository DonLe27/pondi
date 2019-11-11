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
		//console.log("In chose prompts")
		//console.log(this.props.prompts)
		this.prompts = []
		for(var i = promptsLength-1; i > -1; i--){
			var question = this.props.prompts[i].question
			console.log(this.props.prompts[i].category)
			var id = this.props.prompts[i].id
			this.prompts.push({value: id, label: question})
		}
	}

	sortIntoCategories = (chosenCategories) => {
		var questionsThatSatisfyChosenCategories = [];
		for(var i = promptsLength - 1; i > -1; i--){
			var question = this.props.prompts[i].question
			for (var j = chosenCategories.length - 1; j > -1; j--){
				if (question.category == chosenCategories[j]){
					questionsThatSatisfyChosenCategories.push(question)
				}
			}
		}
		return <div></div>
	}

	handleChange = (newOption) => {
		this.setState({ selectedOption: newOption });
		this.props.changePrompt(newOption["value"])
	  }
	  arrowRenderer = () => {
		return <div></div>
	  }
	render() {
		const DropdownIndicator = props => {
			return (
				<div></div>  
			);
		  };
		const customStyles = {
			option: (provided, state) => ({
				...provided,
				color: 'black',
				backgroundColor: state.isSelected ? '#F0F8FF' :  state.isFocused ? '#F0F8FF' : 'white',
			  }),
			dropdownIndicator: defaultStyles => ({
				...defaultStyles,
				'& svg': { marginBottom: "0px", marginTop: "20px" }
			  }),
			indicatorsContainer: (provided, state) => ({
				...provided,
				visibility: "visible",
				height: "5vh",
				width:"5vh"
			}),
			indicatorSeparator: (provided,state) => ({
				...provided,
				height: "4vh",
				marginBottom: "0px",
    			marginTop: "16px"
			}),			
			singleValue: (provided,state) => ({
				whiteSpace: "normal"
			}),
			control: (provided, state) => ({
				...provided,
			  borderWidth: '1px',
			  height: '7.5vh'
			})}
		return (
			<div>	
			<Select
			styles={customStyles}
			className="custom-select"
			defaultValue={this.state.selectedOption}
			options={this.prompts}
			onChange={this.handleChange}
			maxMenuHeight="45vh"
			isSearchable={false}
			theme={theme => ({
				...theme,
				borderRadius: '12px',
				colors: {
				  ...theme.colors,
				primary: 'gray'
				},
			  })}
		  />
		  </div>
		);
	}
} 

export default ChoosePrompt