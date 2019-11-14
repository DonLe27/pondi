import React from 'react';
import '../styles/choosePrompt.css';
import Select from 'react-select'
class ChoosePrompt extends React.Component {
	

	constructor(props){
		super(props);
		var promptsLength = this.props.prompts.length
		var prompts = []
		for(var i = promptsLength-1; i > -1; i--){
			var id = this.props.prompts[i].id
			var question = this.props.prompts[i].question
			prompts.push({value: id, label: question})
		}
		console.log(this.prompts)
		this.state = {
			selectedOption: {value: promptsLength, label: this.props.prompts[this.props.prompts.length-1].question},
			selectedPrompts: prompts
		}
	}
	

	checkCategory = (inputCategories) => e => {
		var specifiedThemeList = []; //
		for(var i = this.props.prompts.length-1; i > -1; i--){
			var promptCategories = this.props.prompts[i].category
			var isCategory = true;
			for (var j = inputCategories.length - 1; j > -1; j--){
				if (promptCategories.indexOf(inputCategories[j]) < 0){
					isCategory = false;
				}
			}
			if (isCategory == true){
				specifiedThemeList.push({value: this.props.prompts[i].id, label: this.props.prompts[i].question});
			}	
		}
		console.log(specifiedThemeList);
		this.setState({selectedOption: {value: specifiedThemeList.length, label: specifiedThemeList[specifiedThemeList-1]},
					   selectedPrompts: specifiedThemeList})
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
				<div>
				 <button onClick={this.checkCategory(["funny"])}>Private</button>
			</div>
			<div>	
			<Select
			styles={customStyles}
			className="custom-select"
			defaultValue={this.state.selectedOption}
			options={this.state.selectedPrompts}
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
		  </div>
		);
	}
 
}

export default ChoosePrompt