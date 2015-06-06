'use strict';

let React = require('react');

class Results extends React.Component {
	constructor() {
		super();
		this.state = {
			animated: false
		};
	}
	componentDidMount(){
		setTimeout(() => this.setState({animated: true}), 17);
	}
	render(){
		let results = Object.keys(this.props.results).map((k) => {
			return (
				<div>
					<p>Current best-performers:</p>
					<h2>{k}<a onClick={() => this.props.changeView({apiType: 'ocr'})} className={'learnmore'}>&gt;&gt; More details</a></h2>
					{Object.keys(this.props.results[k]).map((k2) => {
						return (
							<div className={'apiRow'}>
								<div className={'scoreHolder'} >
										<div className={'resultScore'} style={{
												width: ((this.state.animated) ? this.props.results[k][k2] : 0) + '%'
											}}>{k2}</div>
								</div>
								<div className={'scoreLabel'} style={{
										color: (this.props.results[k][k2] < 40) ? 'red' : 'green'
									}}>{this.props.results[k][k2]}</div>
							</div>
						);
					})}
				</div>
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
