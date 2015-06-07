'use strict';

let React = require('react');
let ScoreSet = require('./ScoreSet.jsx');

class Results extends React.Component {
	constructor() {
		super();
		this.state = {};
	}
	changeView({apiType}){

	}
	render(){
		let results = Object.keys(this.props.results).map((k) => {
			return (
				<ScoreSet
					result={this.props.results[k]}
					resultName={k}
					showAllScores={this.props.showAllScores}
					changeView={this.changeView}/>
			);
		});

		return (
			<div>
				<h1>Apapi</h1>
				{results}
			</div>
		);
	}

}
module.exports = Results;
