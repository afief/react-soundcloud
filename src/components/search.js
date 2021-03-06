import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Search extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searchText: '',
			isLoading: false,
			searchResults: []
		};		

		this.onSearch = this.onSearch.bind(this);
		this.onSearchTextChange = this.onSearchTextChange.bind(this);

		this.onTrackClicked = this.onTrackClicked.bind(this);
	}

	onTrackClicked(track) {
		console.log(track);
		this.props.onTrackPicked(track);
	}

	onSearch(event) {
		event.preventDefault();

		var that = this;
		if (this.state.searchText.length >= 3) {
			that.setState({isLoading: true});
			SC.get('/tracks', {
				q: this.state.searchText
			}).then((tracks) => {
				var pickedTracks = [];
				tracks.map((track) => {
					if (track.stream_url) {
						pickedTracks.push(track);
					}
				});
				if (pickedTracks.length) {
					that.setState({
						isLoading: false,
						searchResults: pickedTracks
					});
				} else {
					that.setState({
						isLoading: false,
						searchResults: false
					})
				}
			});
		}
	}

	onSearchTextChange(event) {
		this.setState({searchText: event.target.value});
	}

	componentDidMount() {
		ReactDOM.findDOMNode(this.refs.searchInput).focus();
	}

	render() {
		let isLoading = this.state.isLoading;
		let searchEls = null;
		if (this.state.searchResults === false) {
			searchEls = <div className="noresult">No Result</div>
		} else {
			searchEls = this.state.searchResults.map((track, i) => {
				let user = (track.user || {});
				let artwork = (track.artwork_url || user.avatar_url);

				return <li className="track" key={i} onClick={() => this.onTrackClicked(track)}>
					<div className="artwork" style={{backgroundImage: 'url(' + artwork + ')'}}></div>
					<div className="title">{track.title}</div>
					<div className="username">{track.user.username}</div>
				</li>
			});
		}

		return <div className="search">
			<form onSubmit={this.onSearch}>
				<input type="text" value={this.state.searchText} onChange={this.onSearchTextChange} placeholder="Your Favorite Song" ref="searchInput" />
				<button type="submit">
					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
					<path fill="#ffffff" d="M18.869 19.162l-5.943-6.484c1.339-1.401 2.075-3.233 2.075-5.178 0-2.003-0.78-3.887-2.197-5.303s-3.3-2.197-5.303-2.197-3.887 0.78-5.303 2.197-2.197 3.3-2.197 5.303 0.78 3.887 2.197 5.303 3.3 2.197 5.303 2.197c1.726 0 3.362-0.579 4.688-1.645l5.943 6.483c0.099 0.108 0.233 0.162 0.369 0.162 0.121 0 0.242-0.043 0.338-0.131 0.204-0.187 0.217-0.503 0.031-0.706zM1 7.5c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5-2.916 6.5-6.5 6.5-6.5-2.916-6.5-6.5z"></path>
					</svg>
				</button>
			</form>
			{
				(() => {
					if (isLoading) {
						return <div className="loading-bar">
							<span></span>
							<span></span>
						</div>
					}
				})()
			}
			<ul className="search-result">
				{searchEls}
			</ul>
		</div>
	}
}

export default Search;