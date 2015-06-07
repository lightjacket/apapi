'use strict';

let React = require('react');

class ScoreLine extends React.Component {
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
		return (
			<div className={'apiRow'}>
				<div className={'scoreHolder'} >
						<div className={'resultScore'} style={{
								width: ((this.state.animated) ? this.props.score : 0) + '%'
							}}></div>
				</div>
				<div className={'providerName'}>{this.props.title}</div>
				<div className={'scoreLabel'} style={{
						color: (this.props.score < 40) ? '#d9534f' : 'green'
					}}>{this.props.score}</div>
			</div>
		);
	}

}
module.exports = ScoreLine;
