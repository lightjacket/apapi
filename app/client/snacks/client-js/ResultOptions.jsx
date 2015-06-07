'use strict';

let React = require('react');
let Link = require('react-router').Link;

class ResultOptions extends React.Component {
	constructor() {
		super();
		this.state = {
			open: false,
			selected: []
		};
	}
	componentDidMount(){
		this.setState({open: this.props.open});
	}
	toggleOpen(){
		this.setState({open: !this.state.open});
	}
	getSelectedViews(refTag){
		return Array.prototype.map.call(React.findDOMNode(this.refs[refTag]).getElementsByTagName('option'),
			(c) => (c.selected) ? c.value : null)
			.filter((c) => c);
	}
	changeView(){
		let selected = this.getSelectedViews('api');
		let params = {displayOpen: true};
		if(selected.length === 1 && selected[0] === 'all'){
			params.view = 'all';
		}else{
			params.view = 'api';
			params.api = selected[0];
		}
		params.categories = this.getSelectedViews('categories').join(',');
		params.providers = this.getSelectedViews('providers').join(',');
		if(this.props.id){
			params.id = this.props.id;
		}
		this.props.changeView(params);
	}
	render() {
		console.log('ResultOptions render');
		let controls = null;
		if(this.state.open){
			controls = (
				<div>
					<select ref='api' value={(this.props.api) ? [this.props.api] : ['all']} multiple="multiple" onChange={(e)=>this.changeView(e)}>
						<option value='all'>All</option>
						<option value='OCR'>OCR</option>
						<option value='Image Tagging'>Image tagging</option>
						<option value='Speech Recognition'>Speech to text</option>
					</select>
					<select ref='categories' value={(this.props.api) ? this.props.categories : ['aggregate']} multiple="multiple" onChange={(e)=>this.changeView(e)}>
						<option value='aggregate'>Aggregate</option>
						<option value='accuracy'>Accuracy</option>
						<option value='speed'>Speed</option>
					</select>
					<select ref='providers' value={(this.props.provider) ? this.props.provider : this.props.providers} multiple="multiple" onChange={(e)=>this.changeView(e)}>
						{this.props.providers.map((p) => {
							return (<option value={p}>{p}</option>);
						})}
					</select>
				</div>
			);
		}

		return (
			<div>
				<div onClick={()=>(this.toggleOpen())}>Display Options {(this.state.open) ? 'v' : '>'}</div>
				<div>
					{controls}
				</div>
			</div>
		);
	}

}
module.exports = ResultOptions;
