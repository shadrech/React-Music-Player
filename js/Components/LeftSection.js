import React, { Component } from "react";
import noUiSlider from 'nouislider';

class LeftSection extends Component {
	componentDidMount() {
		noUiSlider.create(this.refs.slider, {
			start: 0,
			animate: true,
			range: {
				min: 0,
				max: this.props.dur || 100 //song duration or default value of 100
			}
		});
		this.refs.slider.noUiSlider.on('change', (values, handle) => {
			this.props.mediaEvent.seek.bind(this, parseFloat(values[0]))();
		});
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.dur !== nextProps.dur) {
			this.refs.slider.noUiSlider.updateOptions({
				range: {
					min: 0,
					max: nextProps.dur
				}
			});
		}
	}

	playEvent() {
		if (this.props.playing)
			this.props.mediaEvent.pause();
		else
			this.props.mediaEvent.play();
	}

	setSliderOptions() {
		const pos = this.props.player.howl.seek();
		this.refs.slider.noUiSlider.set(pos);
	}

	render() {
		let playlistStyle = {
			"marginLeft": (this.props.showPlaylist) ? "-200vw" : "0px"
		};

		if (this.props.player && this.props.player.playing()) {
			this.setSliderOptions.bind(this)();
		}

		return (
			<div className="section controls_section" style={playlistStyle}>
				<div className="row art">
					<img src={this.props.art_path} />
				</div>
				<div className="row slider">
					<div ref="slider" className="player-wrapper"></div>
				</div>
				<div className="row controls">
					<div className="song_info">
						<p className="title">{this.props.title}</p>
						<p className="artist">{this.props.artist}</p>
						<p className="album">{this.props.album}</p>
					</div>
					<div className="media_icons">
						<div className={"icon_sprite " + (this.props.vol ? "volume" : "volume_off")} onClick={this.props.mediaEvent.volumeToggle}></div>
						<div className="icon_sprite rewind" onClick={this.props.mediaEvent.backward}></div>
						<div className={"icon_sprite "+ (this.props.playing ? "pause" : "play")} onClick={this.playEvent.bind(this)}></div>
						<div className="icon_sprite fast_forward" onClick={this.props.mediaEvent.forward}></div>
						<div className="icon_sprite show_playlist" onClick={this.props.togglePlaylist}></div>
					</div>
					<p className="timer">{this.props.time}</p>
				</div>
			</div>
		);
	}
}

export default LeftSection;
