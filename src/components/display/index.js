import React from 'react';
import styled from 'styled-components';
import * as Icons from '../icons/icons'

const defaultColor = '#333';

const DisplayBox = styled.div`
	width: 100%;
	max-width:700px;
    padding: 1rem 2rem;
    border: solid 1px #ccc;
    margin: 0 auto;
    display: grid;
    grid-template: auto/9% 1fr;
    grid-column-gap: 1rem;
    align-items: start;
    align-content: start;
	    * {
	    margin: 0;
	}

`
const CalloutIcon = styled.div`
	grid-row: 1/5;
	svg {
	    width: 100%;
	    height: auto;
	}
	`
const Subject = styled.p(props=>({
	color: props.color || defaultColor,
	fontSize:'1.2rem'
	}))	  
const Metric = styled.h1(props=>({
	color: props.color || defaultColor,
	fontSize: '1.6rem',
	fontWeight: 800
	}))
const Unit = styled.h3(props=>({
	color: props.color || defaultColor,
	fontWeight: 800,
    fontSize: '1.2rem'
	}))
const Value = styled.h2(props=>({
	color: props.color || defaultColor,
	fontSize: '2.3rem',
    fontWeight: 800
	}))

export class Display extends React.Component {		
	render(){
		const {icon, metric,subject,value,unit} = this.props;//map props for simpler syntax
		const IconTag = icon.icon.charAt(0).toUpperCase() + icon.icon.slice(1);//convert icon string to title case
		const StyledIcon = Icons[IconTag]//dynamically access the right object property from the Icons Object
		return (
	    	<DisplayBox>
	    		<CalloutIcon>
	    			<StyledIcon fill={icon.color} />
    			</CalloutIcon>
	    		<Value style={{color:value.color}}>{value.content}</Value>
	    		<Unit style={{color:unit.color}}>{unit.content}</Unit>
	    		<Metric color={metric.color}>{metric.content}</Metric>
	    		<Subject color={subject.color}>{subject.content}</Subject>
	    	</DisplayBox>
			
		);
    }
}

export default Display;
