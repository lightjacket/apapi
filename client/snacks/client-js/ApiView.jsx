'use strict';

let React = require('react');
let ScoreGraph = require('./ScoreGraph.jsx');

class ApiView extends React.Component {
	constructor() {
		super();
		this.state = {};
	}
	render() {
		let resultsByCategory = {};
		this.props.results.forEach((result) => {
			result.scores.forEach((score) => {
				if(!resultsByCategory[score.type]){
					resultsByCategory[score.type] = [{title: result.api.name, score: score.value}];
				}else{
					resultsByCategory[score.type].push({title: result.api.name, score: score.value});
				}
			});
		});

		let scoreGraphs = Object.keys(resultsByCategory).map((type) => {
			return (<ScoreGraph showTitle={true} title={type} scores={resultsByCategory[type]} />);
		});

		return (
			<div>
				<h2>{(this.props.results[0]) ? this.props.results[0].api.apitype.name : ''}</h2>
				{scoreGraphs}
			</div>
		);
	}

}
module.exports = ApiView;
