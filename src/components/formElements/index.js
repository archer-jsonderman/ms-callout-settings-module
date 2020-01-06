import React from 'react';
import styled from 'styled-components';
import { SketchPicker } from 'react-color';
import FontIconPicker from '@fonticonpicker/react-fonticonpicker';
import '@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.base-theme.react.css';
import '@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.material-theme.react.css';
import './formElements.scss';

const Row = styled.div`
	width:100%;
	margin:1.3rem 0 0;
	display: grid;
	grid-template-columns: 73% 1fr;
	&:nth-child(1){
		margin:0;
		}
	`
const Popover = styled.div`
	position: absolute;
	z-index: 2;
    `
const Cover = styled.div`
	position: fixed;
	top: 0px;
	right: 0px;
	bottom: 0px;
	left:0px
	`
const StyledPicker = styled.div(props=>({
	padding: '.4rem',
      background: '#333',
      borderRadius: '1px',
      boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
      cursor: 'pointer',
	  margin: '0 0 0 10px',
	  display: 'grid',
	  gridTemplateColumns: 'auto 16px',
	  gridColumnGap:'0.4rem'

}))
const StyledSwatch = styled.div(props=>({
		width: '100%',
          height: '100%',
          borderRadius: '2px',
          background:props.color,
          border:'solid 1px #555'
          
}))
const StyledArrow = styled.div`
	width: 0; 
	height: 0; 
	border-left: 8px solid transparent;
	border-right: 8px solid transparent;
	border-top: 10px solid #fff;
	margin:3px 0 0;
	align-self:center;
`
export class SettingsInput extends React.Component{
	constructor(props) {
	    super(props);	    
		this.state={
			displayColorPicker:false
		}
  	}
	handleClose = (props) =>this.setState({displayColorPicker:false})
  	//using local state here, since this is the only component that cares about this setting
	handleColorClick = (e) =>this.setState({displayColorPicker:!this.state.displayColorPicker})
	
	//set props instead of state to life to parent state
	//TODO: single function, detect if it is a content or color change.
	handleColorChange =(color, event)=>this.props.onChange({[this.props.name]:{content:this.props.settings[this.props.name].content, color:color.hex}})
	handleTextChange=(event)=>this.props.onChange({[this.props.name]:{content:event.target.value, color:this.props.settings[this.props.name].color}})
	
	
	//TODO:create a character limit setting for each input field
	render(){
		const {settings, name} = this.props		
		return (
			<Row>
			<label>{this.props.labelText}</label>
			<input 
				type="text" 
				value={this.props.settings[name].content}
				name={this.props.name}
				onChange={this.handleTextChange}
			/>
			<StyledPicker onClick={ this.handleColorClick }>
				<StyledSwatch
					color={this.props.settings[name].color}
				/>
				<StyledArrow/>
			</StyledPicker>
			{ this.state.displayColorPicker ? 
				 <Popover className='pop'>
				 <Cover
				 className='cover'
				 	onClick={ this.handleClose }
				 />
				 	<SketchPicker 
				 		color={this.props.settings[name].color}
				 		presetColors={[]}
				 		onChangeComplete={this.handleColorChange}
				 		disableAlpha={true}
				 	/>
				 </Popover> : null 
			}
			</Row>
		)
	}
}


export class IconSelector extends React.Component {	
	constructor(props) {
	    super(props);	    
		this.state={
			displayColorPicker:false
			}
	}
	handleClose = (props) =>this.setState({displayColorPicker:false})
	handleColorClick = (e) =>{
		this.setState({displayColorPicker:!this.state.displayColorPicker})
	}
	handleColorChange =(color, event)=>{
		this.props.onChange({icon:{icon:this.props.settings.icon.icon, color:color.hex}})
		
	}
	handleTextChange=(event)=>{
		this.props.onChange({[this.props.name]:{content:event.target.value, color:this.props.settings[this.props.name].color}})
	}

	renderSVG = (svg,props) => {
		//create an initial-capped name for the name display in the picker
		const title = props.charAt(0).toUpperCase() + props.slice(1)
		return(
			<>
				<svg>
					<use xlinkHref={`#icon-${svg}`} />
				</svg>
				<p>{title}</p>
			</>
		)
	};
	handleIconChange=(val)=>this.props.onChange({icon:{icon:val, color:this.props.settings.icon.color}})
	  render(){ 
		return (
			<Row>
			<label>Icon</label>
	    		<FontIconPicker
						icons={['alarm','city','crime','home','police']}
						value={this.props.settings.icon.icon}
						onChange={this.handleIconChange}
						iconsPerPage={5}
						showSearch={false}
						showCategory={false}
						closeOnSelect={true}
						renderFunc={(svg)=>this.renderSVG(svg, this.props.settings.icon.icon)}
						/>
				<StyledPicker onClick={ this.handleColorClick }>
				<StyledSwatch
					color={this.props.settings.icon.color}
					 />
					 <StyledArrow/>
				</StyledPicker>
				{ this.state.displayColorPicker ? 
					 <Popover>
					 <Cover 
					 	onClick={ this.handleClose }
					 />
					 	<SketchPicker 
					 		color={this.props.settings.icon.color}
					 		presetColors={[]}
					 		onChangeComplete={this.handleColorChange}
					 		disableAlpha={true}
					 	/>
					 </Popover> : null 
				}
			</Row>
			
		);
    }
}

