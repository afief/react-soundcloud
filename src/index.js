import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PlayerWrapper from './musicplayer.js';

class Wrapper extends Component {
	render() {
		return <div className="container">
			<div className="main-title">
				React + Soundcloud
			</div>
			<PlayerWrapper />
		</div>
	}
}

ReactDOM.render(
	<Wrapper />, 
	document.getElementById('root')
);