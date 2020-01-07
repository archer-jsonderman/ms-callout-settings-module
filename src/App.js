import React from 'react';
import update from 'immutability-helper';
import Display from './components/display/index'
import Settings from './components/settings/index'
import WebFont from 'webfontloader';
import {ReactComponent as SvgSymbols} from './components/icons/defs/svg-defs.svg'
import styled from 'styled-components';

WebFont.load({
  google: {
    families: ['Montserrat:400,500,700,800', 'sans-serif']
  }
});

//Display component handles rendering and updating of the Callout visual box
//Settings component handles the form fields for the user to update the content and color of Display
//Color selection handled by react-color (https://github.com/casesandberg/react-color/)
//Icon Selection handled by react-fonticonpicker (https://github.com/fontIconPicker/react-fonticonpicker)

//fake initial data for state
const initState = {
	icon:{
		icon:'crime',
		color:'#07a'
	},
	metric:{
		content:'Crime Type: Property Crime',
		color:'#444'
	},
	subject:{
		content:'Kansas City, MO',
		color:'#444'
	},
	valueInput:{
		content:'21,236',
		color:'#07a'
	},
	unit:{
		content:'Offensives',
		color:'#444'
	}
	
}

const StyledSymbols = styled(SvgSymbols)`
	display:none;
`
const AppContainer = styled.div`
	padding:2rem;
	font-family:'Montserrat',sans-serif;
	input[type="text"]{
		font-family:'Montserrat',sans-serif;
	}
	@media(max-width: 768px){
		padding:.2rem;
		}
		
`
export class App extends React.Component {
	constructor(props){
		super(props);
		this.state = initState;
	}
	
	handleSettings = (props) =>this.setState({...props}, ()=>console.log(this.state, ' parent'))

//added svgdefs to top of body for use in the iconPicker component	
	render(){
	  return (
		<>
		  	<StyledSymbols/>
		    <AppContainer>
		    	<Display
		    		icon={{
			    		icon:this.state.icon.icon,
						color:this.state.icon.color
		    		}}
		    		metric={{
			    		content:this.state.metric.content,
			    		color:this.state.metric.color
		    		}}
		    		subject={{
			    		content:this.state.subject.content,
			    		color:this.state.subject.color
		    		}}
		    		value={{
			    		content:this.state.valueInput.content,
			    		color:this.state.valueInput.color
		    		}}
		    		unit={{
			    		content:this.state.unit.content,
			    		color:this.state.unit.color
		    		}}
		    		
		    	/>
				<Settings 
					settings={this.state}
					onChange={this.handleSettings}
					onColorChange={this.handleSettings}
					onIconChange={this.handleSettings}
					onClose={this.handleClose}
				/>
		    </AppContainer>
	    </>
	  );
    }
}

export default App;
