import React, {useState} from "react";
import {useDispatch} from 'react-redux';


import {signInOrUp, loginPasswordLess} from "../actions";
import PasswordInput from "../controls/PasswordInput";


const Login = () => {
    const [isRegisterView, setIsRegisterView] = useState(false);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState(null);

    const dispatch = useDispatch();

    const registerViewToggle = () => {
        setError(null);
        setUserName("");
        setPassword("");
        setRepeatPassword("");
        setIsRegisterView(!isRegisterView);
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

    return (
        <div className="register-form-container">
            <h4 className="text-center mb-4">
                {
                    isRegisterView
                        ? 'Регистрация'
                        : 'Вход в личный кабинет'
                }
            </h4>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <input
                        type="text" maxLength="20"
                        className="form-control" placeholder="Логин"
                        value={userName} onChange={handleUserNameChange}/>
                </div>

                <div className="form-group mb-3">
                    <PasswordInput
                        maxLength="20"
                        className="form-control" placeholder="Пароль"
                        value={password} onChange={handlePasswordChange}
                    />
                </div>


                {
                    !isRegisterView &&
                    <div className="form-group mb-3">
                        <a className="text-secondary cursor-pointer"
                           onClick={() => registerViewToggle()}>
                            <small>У меня нет учетной записи</small>
                        </a>
                    </div>
                }

                {
                    isRegisterView &&
                    <>
                        <div className="form-group mb-3">
                            <PasswordInput
                                maxLength="20"
                                className="form-control" placeholder="Повторите пароль"
                                value={repeatPassword} onChange={handleRepeatPasswordChange}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <small className="text-secondary">
                                Через <span className="fw-bolder">48 часов</span> личный
                                кабинет будет удален,
                                потребуется новая регистрация
                            </small>
                        </div>
                    </>

                }
                {
                    isRegisterView &&
                    <>
                        <button type="submit" className="btn btn-danger">
                            Зарегистрироваться
                        </button>
                        <div className="text-center d-block">
											<span className="
												register-toggle-link
												fw-bolder
												cursor-pointer"
                                                  onClick={() => registerViewToggle()}
                                            >
												У меня есть аккаунт
											</span>
                        </div>
                    </>
                }
                {
                    !isRegisterView &&
                    <>
                        <button type="submit" className="btn btn-danger">Продолжить</button>
                        <div className="text-center d-block">
											<span className="
												register-toggle-link
												fw-bolder
												cursor-pointer"
                                                  onClick={() => dispatch(loginPasswordLess())}
                                            >
												Войти без логина и пароля
											</span>
                        </div>

                    </>

                }
                {
                    error ?
                        <small className="d-block text-center text-danger">{error}</small>
                        : <></>
                }
            </form>
        </div>
    );

}


export default Login;