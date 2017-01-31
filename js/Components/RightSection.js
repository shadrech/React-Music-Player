import React, { Component } from "react";

import Song from "./Song";

class RightSection extends Component {
	render() {
		let Songs = this.props.songs.map((song, idx) => (
			<Song 
				key={song.id}
				{...song}
				mediaEvent={this.props.mediaEvent}
				active={song.id == this.props.activeSong.id}
				playing={this.props.playing} />
		));

		return (
			<div className="section section_playlist">
				<div className="row user_info">
					<h1 className="playlist_close" onClick={this.props.togglePlaylist}>X</h1>
					<div className="profile">
						<p>Tatenda Chawanzwa</p>
						<span className="icon_sprite user_icon"></span>
					</div>
					<div className="divider"></div>
					<div className="playlist_name">
						<p>My Playlist</p>
					</div>
				</div>
				<div className="row playlist">
					{Songs}
				</div>
				{/*<div className="row addSong">
					<input type="text" name="addSong" placeholder="Add Song " />
				</div>*/}
			</div>
		);
	}
}

export default RightSection;