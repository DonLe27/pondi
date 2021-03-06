import React from 'react';
import '../styles/choosePrompt.css';
import Select from 'react-select'
import FilterPrompts from './FilterPrompts'
class ChoosePrompt extends React.Component {
	

	constructor(props){
		super(props);
		console.log(this.props.prompts)
		var promptsLength = this.props.prompts.length
		var prompts = []
		for(var i = promptsLength-1; i > -1; i--){
			var id = this.props.prompts[i].id
			var question = this.props.prompts[i].question
			prompts.push({value: id, label: question})
		}
		this.state = {
			selectedOption: {value: props.prompts[promptsLength-1].id, label: props.prompts[promptsLength-1].question},
			selectedPrompts: prompts,
			filtering: false
		}
		console.log(this.state.selectedOption)
		console.log(this.state.selectedPrompts)
	}
	

	checkCategory = (inputCategories) => {
		console.log(inputCategories)
		if (inputCategories.length > 0 && inputCategories[0] == "clear"){
			var promptsLength = this.props.prompts.length
			var prompts = []
			for(var i = promptsLength-1; i > -1; i--){
				var id = this.props.prompts[i].id
				var question = this.props.prompts[i].question
				prompts.push({value: id, label: question})
			}
			this.setState({
				selectedOption: {value: this.props.prompts[promptsLength-1].id, label: this.props.prompts[promptsLength-1].question},
				selectedPrompts: prompts,
			})
			return;
		}
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
	
	toggleFilter = () => {
		this.setState({filtering : !this.state.filtering})
	}
	componentWillMount(){
		document.addEventListener('mousedown', this.handleClick, false);
	}
	componentWillUnmount(){
		document.removeEventListener('mousedown', this.handleClick, false);
	}
	handleClick = (e) => {
		if (this.node.contains(e.target)){
			return;
		}
		this.setState({filtering: false})
	}
	render() {
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
		console.log("In render")
		console.log(this.state.selectedPrompts)
		return (
			<div>
		
			<div className="prompt-dropdown">	
			<Select
			styles={customStyles}
			className="custom-select"
			defaultValue={this.state.selectedOption}
			options={this.state.selectedPrompts}
			onChange={this.handleChange}
			maxMenuHeight="40vh"
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

		<span ref={node => this.node=node}>
		<span className="filter-toggle">
			<button  onClick={this.toggleFilter}>change depth</button>
		</span>
			{ this.state.filtering && <FilterPrompts filterPrompts={this.checkCategory.bind(this)}></FilterPrompts>}	
		</span>
		
		</div>
		);
	}
 
}

export default ChoosePrompt