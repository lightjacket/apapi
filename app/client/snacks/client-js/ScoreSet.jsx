'use strict';

let React = require('react');
let ScoreType = require('./ScoreType.jsx');

class ScoreSet extends React.Component {
	constructor() {
		super();
		this.state = {
			animated: false
		};
	}
	componentDidMount(){
		setTimeout(() => this.setState({animated: true}), 17);
	}
	render() {
		let types = Object.keys(this.props.result[Object.keys(this.props.result)[0]]);
		let scoreSections = null;
		if(this.props.showAllScores){
			scoreSections = types.map((k2) => {
				return (<ScoreType
					type={k2}
					showTitle={this.props.showAllScores}
					result={this.props.result} />
				);
			});
		}else{
			scoreSections = (<ScoreType
				type={'aggregate'}
				showTitle={this.props.showAllScores}
				result={this.props.result} />
			);
		}

		return (
			<div>
				<h2>{this.props.resultName}<a onClick={() => this.props.changeView({apiType: 'ocr'})} className={'learnmore'}>Additional Scores &gt;&gt;</a></h2>
				{scoreSections}
			</div>
		);
	}

}
module.exports = ScoreSet;
