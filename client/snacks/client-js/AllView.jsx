'use strict';

let React = require('react');
let ScoreGraph = require('./ScoreGraph.jsx');

class AllView extends React.Component {
	constructor() {
		super();
		this.state = {};
	}
	render() {
		let resultsByApi = {};
		this.props.results.forEach((result) => {
			let score = result.scores.filter((s) => s.type === 'aggregate')[0].value;
			if(!resultsByApi[result.api.apitype.name]){
				resultsByApi[result.api.apitype.name] = [{title: result.api.name, score}];
			}else{
				resultsByApi[result.api.apitype.name].push({title: result.api.name, score});
			}
		});

		let scoreGraphs = Object.keys(resultsByApi).map((type) => {
			return (<ScoreGraph showTitle={true} title={type} scores={resultsByApi[type]} />);
		});

		return (
			<div>
				<h2>Aggregate Results</h2>
				{scoreGraphs}
			</div>
		);
	}

}
module.exports = AllView;
