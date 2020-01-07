import React from 'react';
import styled from 'styled-components';
import * as Icons from '../icons/icons'

const defaultColor = '#333';

const DisplayBox = styled.div`
	width: auto;
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
	@media(max-width:768px){
		padding:.5rem;
		grid-template: 1fr auto/37% 1fr;
		}

`
const CalloutIcon = styled.div`
	grid-row: 1/5;
	@media(max-width:768px){
		grid-row:1/3;
		width:107px;
		}
	svg {
	    width: 100%;
	    height: auto;
	}
	`
const Subject = styled.p`
	color:${props=>props.color || defaultColor};
	font-size:1.2rem;
	@media(max-width:768px){
		 font-size:4.3vw;
		 grid-column: 1/3;
		 text-align: center;
		 line-height: 9vw;
	 }
	`  
const Metric = styled.h1`
	color: ${props=>props.color || defaultColor};
	font-size: 1.6rem;
	font-weight: 800;
	@media(max-width:768px){
		 font-size:6vw;
		 grid-column: 1/3;
		 text-align: center;
		 margin-top: 1rem;
		}
	`
const Unit = styled.h3`
	color:${props=> props.color || defaultColor};
	font-weight: 800;
    font-size: 1.2rem;
    @media(max-width:768px){
		font-size:7vw;
		}
	`
const Value = styled.h2`
	color:${props=>props.color || defaultColor};
	font-size: 2.3rem;
    font-weight: 800;
    @media(max-width:768px){
		font-size:14vw;
		}
	`

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
