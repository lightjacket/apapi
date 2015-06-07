/*eslint-env node*/

'use strict';

let testResults = [
   {
      scores: [
         {
            type: 'speed',
            value: 90
         },
         {
            type: 'accuracy',
            value: 30
         }
      ],
      api: {name: 'HP OCR', apitype: {name: 'OCR'}}
   },
   {
      scores: [
         {
            type: 'speed',
            value: 20
         },
         {
            type: 'accuracy',
            value: 40
         }
      ],
      api: {name: 'IBM OCR', apitype: {name: 'OCR'}}
   },
   {
      scores: [
         {
            type: 'speed',
            value: 90
         },
         {
            type: 'accuracy',
            value: 30
         }
      ],
      api: {name: 'HP Image Tagging', apitype: {name: 'Image Tagging'}}
   },
   {
      scores: [
         {
            type: 'speed',
            value: 20
         },
         {
            type: 'accuracy',
            value: 40
         }
      ],
      api: {name: 'IBM Image Tagging', apitype: {name: 'Image Tagging'}}
   }
];

let aggregateResults = (results) => {
   results.forEach((result) => {
      let scores = result.scores;
      scores.push({
         type: 'aggregate',
         value: scores.reduce(((p, c) => p + c.value), 0) / scores.length
      });
   });
   return results;
};

let getResults = function(){
   return new Promise((resolve) => {
      resolve(aggregateResults(testResults));
   });
};

let React = require('react');
let AllView = require('./AllView.jsx');
let ApiView = require('./ApiView.jsx');

var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;

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

class AppView extends React.Component{
   render(){
      let {query} = this.props;
      let view = {
         api: (<ApiViewWithResults query={query} />),
         all: (<AllViewWithResults query={query} />)
      }[query.view];
      return (
         view
      );
   }
}

class ViewWithResults extends React.Component{
   constructor(){
      super();
      getResults().then((results) => {
         let {query} = this.props;
         if(query.view === 'api' && !query.api){
            query.api = results[0].api.apitype.name;
         }
         results = results.filter((result) => {
            return result.api.apitype.name === query.api;
         });
         if(query.categories){
            query.categories = query.categories.split(',');
            results.forEach((result) => {
               result.scores = result.scores.filter((score) => query.categories.indexOf(score.type) !== -1);
            });
         }
         this.setState({results});
      });
      this.state = {results: []};
   }
}

class ApiViewWithResults extends ViewWithResults{
   render(){
      return (
         <ApiView results={this.state.results} />
      );
   }
}

class AllViewWithResults extends ViewWithResults{
   render(){
      return (
         <AllView results={this.state.results} />
      );
   }
}

var routes = (
  <Route path='index.html' handler={SuperAppView}>
    <DefaultRoute handler={AppView}/>
  </Route>
);

Router.run(routes, Router.HistoryLocation, (Root) => {
  React.render(<Root/>, document.body);
});
