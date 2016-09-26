import * as React from "react";
import { browserHistory, Router, Route, IndexRoute } from "react-router";
import ContainerComp from './components/app'
import HomeComp from './components/home'
import PageAndPostComp from './components/container'
import SinglePageOrPost from './components/single'
import ErrorComp from './components/error'

export default(
	<Router history={browserHistory}>
		<Route path="/" component={ContainerComp}>
			<IndexRoute component={HomeComp}/>
			<Route path="/pages" component={PageAndPostComp}>
				<Route path=":page" component={SinglePageOrPost}/>
			</Route>
			<Route path="/posts" component={PageAndPostComp}>
				<Route path=":post" component={SinglePageOrPost}/>
			</Route>
		</Route>
		<Route path="*" component={ErrorComp}/>
	</Router>
);
