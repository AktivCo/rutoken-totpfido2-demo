import React, { useState } from "react";
import { useDispatch } from 'react-redux';


import { signInOrUp } from "../actions";


const Login = () => {

	const [isRegisterView, setIsRegisterView] = useState(false);
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	const [error, setError] = useState(null);

	const dispatch = useDispatch();


	const registerViewToggle = () => {
		setIsRegisterView(!isRegisterView);
		setUserName('');
		setPassword('');
		setRepeatPassword('');
		setError(null);
	}
	const handleSubmit = (evt) => {
		evt.preventDefault();
		setError(null);

		dispatch(signInOrUp(isRegisterView, userName, password, repeatPassword))
			.catch(err => {
				setError(err);
			});
	}

	const handleUserNameChange = (evt) => setUserName(evt.target.value);
	const handlePasswordChange = (evt) => setPassword(evt.target.value);
	const handleRepeatPasswordChange = (evt) => setRepeatPassword(evt.target.value);
	
	console.log('render');
	return (
		<div className="register-background">
				<div className="container">
					<div className="d-flex flex-row justify-content-center align-items-center vh-100">
						<div className="register-form-container">
							<h3 className="text-center mb-5">
								{
									isRegisterView
										? 'Регистрация'
										: 'Вход в личный кабинет'
								}
							</h3>
							<form onSubmit={handleSubmit}>
								<div className="form-group mb-4">
									<input type="text" className="form-control" placeholder="Логин"
										onChange={handleUserNameChange} />
								</div>
								<div className="form-group mb-4">
									<input
										type="password"
										className="form-control"
										placeholder="Пароль"
										onChange={handlePasswordChange}
									/>
								</div>

								{
									!isRegisterView &&
									<div className="form-group mb-4">
										<a className="text-secondary cursor-pointer"
											  onClick={() => registerViewToggle()}>
											У меня нет учетной записи
										</a>
									</div>

								}

								{
									isRegisterView &&
									<>
										<div className="form-group mb-4">
											<input
												type="password"
												className="form-control"
												placeholder="Повторите пароль"
												onChange={handleRepeatPasswordChange}
											/>
										</div>
										<div className="form-group mb-4">
											<span className="text-secondary">
												Через <span className="fw-bolder">48 часов</span> личный 
												кабинет будет удален, 
												потребуется новая регистрация
											</span>
										</div>
									</>
									
								}
								{
									isRegisterView &&
									<>
										<button type="submit" className="btn btn-danger">
											Зарегистрироваться
										</button>
										<span className="
											font-color-surfie-green 
											font-size-18px 
											text-center d-block
											fw-bolder
											cursor-pointer"
											onClick={() => registerViewToggle()}
										>
											У меня есть аккаунт
										</span>
									</>
								}
								{
									!isRegisterView &&
									<>
										<div className="form-group mb-3">
											<button type="submit" className="btn btn-danger">Продолжить</button>
										</div>
										<span className="
											font-color-surfie-green 
											font-size-18px 
											text-center d-block
											fw-bolder
											cursor-pointer" 
											  onClick={() => registerViewToggle()}
										>
											Войти без логина и пароля
										</span>
									</>

								}
								{
									<div className="d-block text-center">
										{ error ? 
											<span className="text-danger">{error}</span> : 
											<span>&nbsp;</span>}
									</div>
								}
							</form>
						</div>

					</div>
				</div>
		</div>


	);

}


export default Login;