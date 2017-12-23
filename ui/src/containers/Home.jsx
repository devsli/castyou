import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Dropzone from 'react-dropzone';

export default class Home extends React.Component {
	state = {
		files: [],
	};

	upload = () => {
		const config = {
			headers: { 'content-type': 'multipart/form-data' }
		};

		this.state.files.forEach((file) => {
			const data = new FormData();
			data.append('cast', file, file.name);
			axios.post('http://localhost:8765/upload', data, config)
		});
	};

	onDrop = (acceptedFiles) => {
		this.setState({ files: [ ...this.state.files, ...acceptedFiles ] });
	};

	render() {
		return (
			<div>
				Drop files here to upload

				<Dropzone
					onDrop={ this.onDrop }
				/>

				<ol>
					{ this.state.files.map((i, idx) => <li key={idx}>{ i.name }</li>) }
				</ol>

				<a className="button" onClick={ this.upload }>
					<span className="file-icon">
						<i className="fa fa-upload" />
					</span>

					Upload
				</a>

				<form style={{display: 'none'}} action="http://localhost:8765/upload" method="post" encType="multipart/form-data">
					<div className="field">
						<div className="file is-primary">
							<label className="file-label">
								<input className="file-input" type="file" name="cast" />
								<span className="file-cta">
                                    <span className="file-icon">
                                        <i className="fa fa-upload" />
                                    </span>
                                    <span className="file-label">
                                        Primary file…
                                    </span>
                                </span>
							</label>
						</div>
					</div>
					<input type="submit" />
				</form>
			</div>
		);
	}
}
