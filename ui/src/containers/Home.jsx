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

		const tasks = this.state.files.map((file) => {
			const data = new FormData();
			data.append('cast', file, file.name);
			console.log(process.env.API_URL);
			return axios.post(`${process.env.API_URL}/upload`, data, config);
		});

		Promise.all(tasks).then(() => {
			this.setState({ files: [] });
		});
	};

	onDrop = (acceptedFiles) => {
		this.setState({ files: [ ...this.state.files, ...acceptedFiles ] }, () => {
			if (this.state.autoUpload) {
				this.upload()
			}
		});
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

				<label className="checkbox">
					<input
						value={ this.state.autoUpload }
						onChange={ (e) => this.setState({ autoUpload: e.target.checked }) }
						type="checkbox" />
					Auto-upload
				</label>
			</div>
		);
	}
}
