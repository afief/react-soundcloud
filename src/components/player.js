import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Player extends Component {
	constructor(props) {
		super(props);

		this.state = {
			track: false
		}

		this.play = this.play.bind(this);
		this.doSeek = this.doSeek.bind(this);
	}

	componentDidMount() {
		let audio = ReactDOM.findDOMNode(this.refs.audioplayer);
		let seek = ReactDOM.findDOMNode(this.refs.seek);

		audio.addEventListener('timeupdate', (e) => {
			seek.style.width = Math.floor(e.target.currentTime / e.target.duration * 100).toString() + '%';
		});

		this.audio = audio;
	}

	play(track) {
		this.audio.src = track.stream_url + '?client_id=7e747f7d6f9eedfbf64282e8d5ef8673';
		this.audio.play();

		this.setState({track: track});
	}

	doSeek(event) {	
		let percent = (event.pageX - getOffsetLeft(event.target)) / event.target.width;
		this.audio.currentTime = percent * this.audio.duration;

		function getOffsetLeft( elem ) {
			var offsetLeft = 0;
			do {
				if ( !isNaN( elem.offsetLeft ) )
				{
					offsetLeft += elem.offsetLeft;
				}
			} while( elem = elem.offsetParent );
			return offsetLeft;
		}
	}

	openSoundcloud(track) {
		window.open(track.permalink_url, '_blank');
	}

	render() {
		let that = this;
		let track = this.state.track;
		let user = (this.state.track.user || {});
		let artwork = (this.state.track.artwork_url || user.avatar_url) || false;

		function renderArtwork() {
			if (artwork) {
				return <div className="artwork" style={{backgroundImage: 'url(' + artwork + ')'}}>
					<div className="user" onClick={() => that.openSoundcloud(track)}>
						<div className="avatar" style={{backgroundImage: 'url(' + user.avatar_url + ')'}}></div>
						<div className="name">{track.title}</div>
						<div className="permalink">{user.username}</div>
					</div>
				</div>
			}
		}

		return <div className="player">
			<audio ref="audioplayer"></audio>
			{renderArtwork()}
			<div className={'seekbar ' + (artwork ? 'show': '')}>
				<img src={track.waveform_url} className="bg" onClick={this.doSeek} />
				<div className="seek" ref="seek"></div>
				<div className="seekbg"></div>
			</div>
		</div>
	}
}

export default Player;