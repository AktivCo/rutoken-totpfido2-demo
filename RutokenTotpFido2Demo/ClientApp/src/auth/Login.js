import React, {useState} from "react";
import {useDispatch} from 'react-redux';


import {signInOrUp, loginPasswordLess} from "../actions";
import PasswordInput from "../controls/PasswordInput";
import {FormFeedback, Input} from "reactstrap";


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
                    <Input 
                        type="text" 
                        maxLength="20"
                        className="form-control" 
                        placeholder="Логин"
                        value={userName}
                        invalid={error && error.payload && error.payload.name === 'login'}
                        onChange={handleUserNameChange}
                        style={{backgroundImage: "none"}}
                    />
                    <FormFeedback>
                        {error && error.payload && error.message}
                    </FormFeedback>
                </div>

                <div className="form-group mb-3">
                    <PasswordInput
                        maxLength="20"
                        className="form-control" 
                        placeholder="Пароль"
                        value={password}
                        style={{backgroundImage: "none"}}
                        invalid={error && error.payload && error.payload.name === 'password'}
                        onChange={handlePasswordChange}
                        feedback={error && error.payload && error.message}
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
                                className="form-control" 
                                placeholder="Повторите пароль"
                                style={{backgroundImage: "none"}}
                                value={repeatPassword} 
                                invalid={error && error.payload && error.payload.name === 'repeatPassword'}
                                onChange={handleRepeatPasswordChange}
                                feedback={error && error.payload && error.message}
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
                    (error && !error.payload) ?
                        <small className="d-block text-center text-danger">{error.message}</small>
                        : <></>
                }
            </form>
        </div>
    );

}


export default Login;