import React from 'react';
import styled from 'styled-components';
import { SketchPicker } from 'react-color';
import FontIconPicker from '@fonticonpicker/react-fonticonpicker';
import '@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.base-theme.react.css';
import '@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.material-theme.react.css';

import './formElements.scss';//Since we can't control the elements created by react-color and react-fonticonpicker, we'll need scss to override settings instead of styled components

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
const StyledInput = styled.input`
	background: #333;
	border: none;
	padding: .5rem .4rem;
	font-size: 14px;
	font-weight:700;
	color: white;

`
const StyledLabel = styled.label`
	display: block;
	font-size: 13px;
	color: white;
	margin: 0 0 2px;
	grid-column:1/3;

`
export class SettingsInput extends React.Component{
	constructor(props) {
	    super(props);	    
		this.state={displayColorPicker:false}
  	}
  	//using local state here, since this is the only component that cares about this setting
  	
	handleClose = (props) =>this.setState({displayColorPicker:false})
	

	handleColorClick = (e) =>this.setState({displayColorPicker:!this.state.displayColorPicker})
	
	//set props instead of state to life to parent state

	handleChange =(color,event)=>{
		const changeObj = {content:this.props.settings[this.props.name].content,color:this.props.settings[this.props.name].color}
		
		if(!event){
			changeObj.color = color.hex
		}else{
			changeObj.content = event.target.value;
		}
		this.props.onChange({[this.props.name]:changeObj})
	}
	
		render(){
		const {settings, name} = this.props		
		return (
			<Row>
				<StyledLabel>{this.props.labelText}</StyledLabel>
				<StyledInput 
					type="text" 
					value={this.props.settings[name].content}
					name={this.props.name}
					onChange={(e)=>this.handleChange(null,e)}
					maxLength='26'
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
					 		onChangeComplete={(color)=>this.handleChange(color,null)}
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
		this.state={ displayColorPicker:false }
	}
	
	handleClose = (props) =>this.setState({displayColorPicker:false})
	
	handleColorClick = (e) =>this.setState({displayColorPicker:!this.state.displayColorPicker})
	
	handleChange =(color,val)=>{
		const changeObj = {icon:this.props.settings.icon.icon,color:this.props.settings.icon.color}
		if(!val){
			changeObj.color = color.hex
		}else{
			changeObj.icon = val;
		}
		this.props.onChange({icon:changeObj})
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

	  render(){ 
		return (
			<Row>
				<StyledLabel>Icon</StyledLabel>
		    		<FontIconPicker
							icons={['alarm','city','crime','home','police']}
							value={this.props.settings.icon.icon}
							onChange={(val)=>this.handleChange(null,val)}
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
						 		onChangeComplete={(color)=>this.handleChange(color,null)}
						 		disableAlpha={true}
						 	/>
						 </Popover> : null 
					}
			</Row>
			
		);
    }
}

