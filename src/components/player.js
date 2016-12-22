import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Player extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.el = ReactDOM.findDOMNode(this.refs.audioplayer);
		console.log(this.el);
	}

	play(track) {
		this.el.src = track.stream_url + '?client_id=7e747f7d6f9eedfbf64282e8d5ef8673';
		this.el.play();
	}

	render() {
		return <div className="player">
			<audio ref="audioplayer" controls></audio>
		</div>
	}
}

export default Player;