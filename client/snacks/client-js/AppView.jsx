'use strict';

let React = require('react');
let Results = require('./Results.jsx');

class AppView extends React.Component {
	constructor() {
		super();
		this.state = {};
	}
	render() {
		let paneStyle = {
			width: '95%',
			height: '95%',
			marginRight: '2.5%',
			marginLeft: '2.5%'
		};

		return (
			<div style={{width: '100%', height: '100%'}}>
				<div style={paneStyle}>
					<Results results={this.props.results}/>
				</div>
			</div>
		);
	}

}
module.exports = AppView;
