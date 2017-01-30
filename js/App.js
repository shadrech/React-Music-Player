import React from "react";
import { render } from "react-dom";
import "whatwg-fetch";

import LeftSection from "./Components/LeftSection";
import RightSection from "./Components/RightSection";
import Player from "./Components/Player";

import "nouislider/src/nouislider.less";
import "../sass/style.scss";

class App extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			songs: [],
			activeSong: {},
			player: null,
			currTime: "00:00",
			currSecs: 0,
			currDur: 0,
			playing: false,
			volume: true,
			showPlaylist: false
		};
	}

	componentDidMount() {
		fetch("/assets/data/songs.json")
		.then((response) => response.json())
		.then((responseData) => {
			responseData = responseData.map((song) => {
				song.howl = null;
				return song;
			});

			this.setState({
				songs: responseData,
				activeSong: responseData[0],
				player: new Player(responseData[0], this.timeUpdateCallback.bind(this), this.forward.bind(this)),
				currTime: "00:00", //current time (formated)
				currSecs: 0, // current seconds
				currDur: responseData[0].dur, //duration of current song
				playing: false,
				volume: true,
				showPlaylist: false
			});
		});
	}

	changeActiveSong(id) {
		this.state.player.unloadHowl();

		const idx = this.state.songs.findIndex((s) => s.id == id);
		const song = this.state.songs[idx];

		this.setState({
			activeSong: song,
			playing: true,
			currDur: song.dur,
			currSecs: 0,
			currTime: "00:00"
		});

		this.state.player.play(song.file_path);	
	}

	togglePlaylist() {
		this.setState({showPlaylist: !this.state.showPlaylist});
	}

	//========================> Media Controls
	timeUpdateCallback() {
		let player = this.state.player;

		this.setState({
			currTime: player.formatTime(player.currentTime()),
			currSecs: player.currentTime(),
			currDur: player.duration()
		});
	}
	play() {
		this.state.player.play();

		this.setState({playing: true});
	}
	pause() {
		this.state.player.pause();

		this.setState({playing: false});
	}
	seek(time) {
		this.state.player.currentTime(time);
	}
	forward() {
		this.state.player.unloadHowl();

		const idx = this.state.songs.findIndex((s) => s.id == this.state.activeSong.id) + 1;
		const song = (idx == this.state.songs.length) ? this.state.songs[0] : this.state.songs[idx];

		this.setState({
			activeSong: song,
			playing: true,
			currDur: song.dur,
			currSecs: 0,
			currTime: "00:00"
		});

		this.state.player.play(song.file_path);
	}
	backward() {
		this.state.player.unloadHowl();

		const idx = this.state.songs.findIndex((s) => s.id == this.state.activeSong.id) - 1;
		const song = (idx < 0) ? this.state.songs[this.state.songs.length - 1] : this.state.songs[idx];

		this.setState({
			activeSong: song,
			playing: true,
			currDur: song.dur,
			currSecs: 0,
			currTime: "00:00"
		});

		this.state.player.play(song.file_path);
	}
	volumeToggle() {
		if (!this.state.volume)
			this.state.player.volume(1);
		else
			this.state.player.volume(0);
		
		this.setState({volume: !this.state.volume});
	}

	render() {

		return (
			<div className="container">
				<div className="container-bg" style={{background: "url("+this.state.activeSong.art_path+")"}}></div>
				<div className="flex-container"> 
					<LeftSection 
						{...this.state.activeSong}
						time={this.state.currTime}
						seconds={this.state.currSecs}
						player={this.state.player}
						playing={this.state.playing}
						vol={this.state.volume}
						togglePlaylist={this.togglePlaylist.bind(this)}
						showPlaylist={this.state.showPlaylist}
						mediaEvent={{
							play: this.play.bind(this),
							pause: this.pause.bind(this),
							seek: this.seek.bind(this),
							forward: this.forward.bind(this),
							backward: this.backward.bind(this),
							vol: this.state.volume,
							volumeToggle: this.volumeToggle.bind(this)
						}} />
					<RightSection 
						songs={this.state.songs}
						activeSong={this.state.activeSong}
						playing={this.state.playing}
						togglePlaylist={this.togglePlaylist.bind(this)}
						mediaEvent={{
							changeSong: this.changeActiveSong.bind(this),
							pause: this.pause.bind(this),
							play: this.play.bind(this)
						}} />
				</div>
			</div>
		);
	}
}

render(<App />, document.querySelector('#root'));
