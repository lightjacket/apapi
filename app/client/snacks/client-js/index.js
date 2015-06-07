/*eslint-env node*/

'use strict';

let _ = require('underscore');

let aggregateResults = (results) => {
   results.forEach((result) => {
      if(result.scoretypename === 'speed'){
         result.value = Math.floor(Math.max(Math.min(100, 100 - result.value / 100), 0));
      }
   });
   let aggregatedResults = {};
   results.forEach((result) => {
      let key = result.apiname + '/////' + result.testdataid;
      if(!aggregatedResults[key]){
         aggregatedResults[key] = {
            value: result.value,
            scoretypename: 'aggregate',
            apiname: result.apiname,
            apitypename: result.apitypename,
            constituentCount: 1,
            testdataid: result.testdataid
         };
      }else{
         aggregatedResults[key].value += result.value;
         aggregatedResults[key].constituentCount++;
      }
   });
   Object.keys(aggregatedResults).forEach((k) => {
      aggregatedResults[k].value = Math.floor(aggregatedResults[k].value / aggregatedResults[k].constituentCount);
      results.push(aggregatedResults[k]);
   });
   return results;
};

let getResults = function(id){
   return fetch('http://localhost:3000/getResult' + ((id) ? '/' + id : '')).then((r) => {
      return r.json().then((result) => {
         return aggregateResults(result);
      });
   });
};

let React = require('react');
let AllView = require('./AllView.jsx');
let ApiView = require('./ApiView.jsx');

var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;
let ResultOptions = require('./ResultOptions.jsx');

class SuperAppView extends React.Component {
   render(){

      let paneStyle = {
         width: '95%',
         height: '95%',
         marginRight: '2.5%',
         marginLeft: '2.5%'
      };

      return (
         <div style={paneStyle}>
            <RouteHandler/>
         </div>
      );
   }
}


let AppView = React.createClass({
   mixins: [Navigation],
   getInitialState(){
      return {
         header: '',
         results: [],
         refreshCount: 0
      };
   },
   componentDidMount(){
      this.filterResults();
   },
   componentDidUpdate(prevProps){
      if(prevProps !== this.props){
         this.filterResults();
      }
   },
   filterResults(){
      let {query} = this.props;
      getResults().then((results) => {
         if(query.id){
            results = results.filter((result) => {
               return result.testdataid + '' === query.id;
            });
         }
         if(!query.view){
            query.view = 'all';
         }
         if(query.view === 'api'){
            if(!query.api){
               query.api = results[0].apitypename;
            }
            results = results.filter((result) => {
               return result.apitypename === query.api;
            });
         }
         if(query.categories){
            if(!(query.categories instanceof Array)){
               query.categories = query.categories.split(',');
            }
            results = results.filter((result) => query.categories.indexOf(result.scoretypename) !== -1);
         }
         this.setState({results});
         this.setHeader(query.api || 'Aggregate Results');
      });
   },
   changeView(q){
      this.transitionTo('/', {}, q);
      if(q.view === 'api'){
         this.setHeader(q.api);
      }else{
         this.setHeader('Aggregate Results');
      }
   },
   setHeader(text){
      this.setState({header: text});
   },
   render(){
      console.log('App view render');
      let query = this.props.query || {};
      let results = this.state.results;
      console.log('app view results: ', results);
      if(query.providers){
         if(!(query.providers instanceof Array)){
            query.providers = query.providers.split(',');
         }
         results = results.filter((result) => query.providers.indexOf(result.apiname) !== -1);
      }
      let view = {
         api: (<ApiView results={results} query={query} changeView={(q)=>this.changeView(q)}/>),
         all: (<AllView results={results} query={query} changeView={(q)=>this.changeView(q)}/>)
      }[query.view || 'all'];
      if(this.state.results.length === 0){
         view = null;
      }
      let possibleProviders = this.state.results.reduce((p, c) => {
         if(p.indexOf(c.apiname) === -1){
            p.push(c.apiname);
         }
         return p;
      }, []);
      return (
			<div>
				<div className="about">
					<div className="container">
						<section className="title-section">
							<h1 className="title-header">{this.state.header}</h1>
						</section>
					</div>
				</div>
				<div className="contact">
					<ResultOptions
                  id={query.id}
                  api={query.api}
                  categories={query.categories}
                  providers={possibleProviders}
                  provider={_.intersection(query.providers, possibleProviders)}
                  open={query.displayOpen === 'true'}
                  changeView={(q)=>this.changeView(q)}/>
					{view}
				</div>
			</div>
      );
   }
});

var routes = (
  <Route path='/' handler={SuperAppView}>
    <DefaultRoute handler={AppView}/>
  </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
   React.render(<Root/>, document.getElementById('app'));
   setInterval(()=>React.render(<Root/>, document.getElementById('app')), 3000);
});
