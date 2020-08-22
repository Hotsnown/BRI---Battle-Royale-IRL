import React from 'react';

export const Player = (props) => {
	const greatPlaceStyle = {
		position: 'absolute' as 'absolute',
		transform: 'translate(-50%, -100%)'
		
	  }
	  
		return (
		  <div style={greatPlaceStyle}>
		  	<img src = "/location.svg"></img>
		  </div>
		);
	}
