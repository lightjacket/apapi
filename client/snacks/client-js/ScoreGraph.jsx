'use strict';

let React = require('react');
let ScoreLine = require('./ScoreLine.jsx');

class ScoreGraph extends React.Component {
	constructor() {
		super();
		this.state = {};
	}
	render() {
		let scoreRows = this.props.scores.map((score) => {
			return (<ScoreLine title={score.title} score={score.score} />);
		});

		let title = null;
		if(this.props.showTitle){
			title = (<h3>{this.props.title}</h3>);
		}

		return (
			<div>
				{title}
				{scoreRows}
			</div>
		);
	}

}
module.exports = ScoreGraph;
