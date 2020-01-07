import React from 'react';
import styled from 'styled-components';
import {SettingsInput, IconSelector } from '../formElements/index'

const SettingsBox = styled.div`
	background:#444;
	width:300px;
	margin:2rem auto; 
	padding: .7rem;
	@media(max-width:768px){
		 width:auto;
		}
`

	

export default class Settings extends React.Component {	
	//render function for each item in the IconPicker component
	//since this is using a custom icon set (i.e. not FontAwesome, icomoon, etc)
	renderSVG = (svg,props) => {
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
//TODO: set these up with a map function before return to clean up.
		return (
			
	    	<SettingsBox>    	
	    		<SettingsInput
	    			labelText='Metric'
	    			name='metric'
	    			{...this.props}
	    			/>
	    		<SettingsInput
	    			labelText='Subject'
	    			name='subject'
	    			{...this.props}			
	    			/>
	    		<SettingsInput
	    			labelText='Value'
	    			name='valueInput'
	    			{...this.props}    				    			
	    			/>
	    		<SettingsInput
	    			labelText='Unit'
	    			name='unit'
	    			{...this.props}	 			
	    			/>
	    		<IconSelector
	    			{...this.props}
				/>
	    	</SettingsBox>
			
		);
    }
}
