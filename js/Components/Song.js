import React, { Component } from "react";

class Song extends Component {
	changeSong() {
		if (this.props.active)
			if (this.props.playing)
				this.props.mediaEvent.pause();
			else
				this.props.mediaEvent.play();
		else
			this.props.mediaEvent.changeSong(this.props.id);
	}

	render() {
		let activeStyle = this.props.active && this.props.playing ? {background: "rgba(0, 0, 0, 0.5)"} : {};

		return (
			<div className="song" style={activeStyle}>
				<div className="p-section icon">
				<span className={'icon_sprite ' + (this.props.active && this.props.playing ? 'pause' : 'headphones')} onClick={this.changeSong.bind(this)}></span>
				</div>
				<div className="p-section song_info">
					<p className="title">{this.props.title}</p>
					<p className="artist">{this.props.artist}</p>
				</div>
				<div className="p-section artwork">
					<img src={this.props.art_path} alt="cover art" />
				</div>
			</div>
		);
	}
}

export default Song;