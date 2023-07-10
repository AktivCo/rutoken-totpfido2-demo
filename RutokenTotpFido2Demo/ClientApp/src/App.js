import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginState } from './actions';

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
		<div className="container">
			<div className="d-flex flex-row justify-content-center align-items-center vh-100">
				<div className="register-form-container">
					<h2 className="text-center">Регистрация</h2>
					<form>
						<div className="form-group">
							<input type="text" className="form-control" placeholder="Логин" />
						</div>
						<div className="form-group">
							<input type="password" className="form-control" placeholder="Пароль" />
						</div>
						<div className="form-group">
							<input type="password" className="form-control" placeholder="Повторите пароль" />
						</div>
						<button type="submit" className="btn btn-danger">Зарегистрироваться</button>
						<span className="
							font-color-surfie-green 
							font-size-18px 
							text-center d-block
							fw-bold
						">
							У меня есть аккаунт
						</span>
					</form>
				</div>

			</div>
		</div>

	);
}

export default App;
