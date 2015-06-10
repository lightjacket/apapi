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
			if(!resultsByCategory[result.scoretypename]){
				resultsByCategory[result.scoretypename] = [{title: result.apiname, score: result.value}];
			}else{
				resultsByCategory[result.scoretypename].push({title: result.apiname, score: result.value});
			}
		});

		let scoreGraphs = Object.keys(resultsByCategory).map((type) => {
			return (<ScoreGraph showTitle={true} title={type} scores={resultsByCategory[type]} />);
		});

		return (
			<div>
				{(scoreGraphs.length > 0) ? scoreGraphs : 'No result yet. Check back later.'}
			</div>
		);
	}

}
module.exports = ApiView;
