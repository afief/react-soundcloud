import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Player extends Component {
	constructor(props) {
		super(props);

		this.state = {
			track: false
		}
	}

	componentDidMount() {
		this.el = ReactDOM.findDOMNode(this.refs.audioplayer);
	}

	play(track) {
		this.el.src = track.stream_url + '?client_id=7e747f7d6f9eedfbf64282e8d5ef8673';
		this.el.play();

		this.setState({track: track});
	}

	render() {
		let user = (this.state.track.user || {});
		let artwork = (this.state.track.artwork_url || user.avatar_url) || false;

		function renderArtwork() {
			if (artwork) {
				return <div className="artwork" style={{backgroundImage: 'url(' + artwork + ')'}}>
					<div className="user">
						<div className="avatar" style={{backgroundImage: 'url(' + user.avatar_url + ')'}}></div>
						<div className="name">{user.username}</div>
						<div className="permalink">@{user.permalink}</div>
					</div>
				</div>
			}
		}

		return <div className="player">
			<audio ref="audioplayer" controls></audio>
			{renderArtwork()}
		</div>
	}
}

export default Player;