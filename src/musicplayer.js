import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Player from './components/player.js';
import Search from './components/search.js';
import './styles/index.scss';

class PlayerWrapper extends Component {
	constructor(props) {
		super(props);	

		SC.initialize({
			client_id: '7e747f7d6f9eedfbf64282e8d5ef8673'
		});

		this.onTrackPicked = this.onTrackPicked.bind(this);
	}

	onTrackPicked(track) {
		this.refs.player.play(track);
	}

	render() {
		let player = this.player;
		return <div className="player-wrapper">
			<Player ref="player" />
			<Search ref="search" onTrackPicked={this.onTrackPicked} />

			<div className="attribution">
				crafted with&nbsp;
				<a href="https://facebook.github.io/react" target="_blank">react</a>,&nbsp;
				<a href="https://soundcloud.com" target="_blank">soundcloud</a>, and&nbsp;
				<a href="http://afief.net" target="_blank">love</a> in Bandung
			</div>
		</div>
	}
}

export default PlayerWrapper;
