'use strict';

let React = require('react');
let ScoreGraph = require('./ScoreGraph.jsx');
let ResultOptions = require('./ResultOptions.jsx');

let AllView = React.createClass({
	getInitialState() {
		return {};
	},
	render() {
		let resultsByApi = {};
		this.props.results.filter((r) => r.scoretypename === 'aggregate').forEach((result) => {
			let score = result.value;
			if (!resultsByApi[result.apitypename]) {
				resultsByApi[result.apitypename] = [
					{
						title: result.apiname,
						score
					}
				];
			} else {
				resultsByApi[result.apitypename].push({
					title: result.apiname,
					score
				});
			}
		});

		let scoreGraphs = Object.keys(resultsByApi).map((type) => {
			return (
				<ScoreGraph scores={resultsByApi[type]} showTitle={true} title={type}/>
			);
		});

		return (
			<div>
				{(scoreGraphs.length > 0) ? scoreGraphs : 'No result yet. Check back later.'}
			</div>
		);
	}

});

module.exports = AllView;
