import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginState } from './actions/setLoginState';

const App = () => {
	const loginState = useSelector(state => state.loginState);

	const dispatch = useDispatch();

	useEffect(() => {
		console.log("log");
		// dispatch(setLoginState());
	}, [])

	const changeLogin = (isLoggedIn) => {
		dispatch(setLoginState(isLoggedIn))
			.catch(err => {
				console.log(err);
			});
	}

	return (
		<div className="App">
			{
				loginState ?
					<>
						<h1>Hello, </h1>
						<button onClick={() => changeLogin(false)}>Logout</button>
					</>
					:
					<>
						<h1>Login</h1>
						<button onClick={() => changeLogin(true)}>Logined</button>
					</>
			}
		</div>
	);
}

export default App;
