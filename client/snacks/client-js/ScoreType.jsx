'use strict';

let React = require('react');

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
		let scoreRows = Object.keys(this.props.result).map((k2) => {
			return (
				<div className={'apiRow'}>
					<div className={'scoreHolder'} >
							<div className={'resultScore'} style={{
									width: ((this.state.animated) ? this.props.result[k2][this.props.type] : 0) + '%'
								}}>{k2}</div>
					</div>
					<div className={'scoreLabel'} style={{
							color: (this.props.result[k2][this.props.type] < 40) ? 'red' : 'green'
						}}>{this.props.result[k2][this.props.type]}</div>
				</div>
			);
		});

		let title = null;
		if(this.props.showTitle){
			title = (<h3>{this.props.type}</h3>);
		}

		return (
			<div>
				{title}
				{scoreRows}
			</div>
		);
	}

}
module.exports = ScoreSet;
