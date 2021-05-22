import React from 'react';
import ReactDOM from 'react-dom';
import {hot} from 'react-hot-loader';
import Loadable from 'react-loadable';

// const LoadableBar = Loadable({
// 	loader: () => import('react组件模块路径'),
// 	loading() {
// 		return <div>Loading...</div>
// 	}
// });

// class MyComponent extends React.Component {
// 	render() {
// 		return <LoadableBar/>;
// 	}
// }

// import('模块路径').then(mod => {
// 	someOperate(mod); //mod是module的简写，表示加载成功后的异步组件
// });

const App = () => {
	return (
		<div>
			<p style={{color:'red'}}>React here dd!</p>
		</div>
	);
};
export default hot(module)(App);

ReactDOM.render(<App />, document.getElementById("app"));