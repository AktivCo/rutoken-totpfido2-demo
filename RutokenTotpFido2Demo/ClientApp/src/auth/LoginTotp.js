import React, { useState } from "react";
import { useDispatch } from 'react-redux';

import { setLoginState, loginWithoutTwoFactor, verifyTotp } from "../actions";
import { Button, Form, FormFeedback, FormGroup, Input } from "reactstrap";

const LoginTOTP = () => {
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isVerified, setIsVerified] = useState(null);
    const [code, setCode] = useState("");

    const handleCodeChange = (e) => {
        const value = e.target.value;

        if (/^[0-9]*$/.test(value)) {
            setCode(value);
        }
    }; 

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        dispatch(verifyTotp(code))
            .then((response) => {
                setIsVerified(response.data);

                if (response.data) {
                    dispatch(setLoginState(true));
                }
            })
            .catch(() => setIsError(true))
            .finally(() => setIsLoading(false));
    }
    
    return (
        <>
            <div className="position-absolute d-flex flex-column align-items-center text-center" style={{left: 0, right: 0, top: "100px"}}>
                <h2>Двухфакторная аутентификация</h2>
                <span>Нажмите кнопку на корпусе Рутокен OTP и введите<br/>отобразившиеся цифры в поле.</span>
            </div>
            <div className="register-form-container">
                <h5 className="text-center mb-4">
                    Одноразовый пароль
                </h5>
                <Form onSubmit={handleSubmit}>
                    {isError && <div className='invalid-feedback d-block mb-2 mx-3' style={{fontSize: "14px"}}>Внутренняя ошибка.<br/>Повторите запрос позже</div>}
                    <FormGroup>
                        <Input
                            type="text" 
                            maxLength="6"
                            name="totpCode"
                            placeholder="Одноразовый пароль"
                            value={code} 
                            onChange={handleCodeChange}
                            onFocus={() => setIsVerified(null)}
                            invalid={isVerified === false}
                            style={{backgroundImage: "none"}}
                            disabled={isLoading}
                        />
                        <FormFeedback className="mx-3" style={{fontSize: "14px"}}>
                            Введен неверный одноразовый пароль.<br/>Повторите попытку
                        </FormFeedback>
                    </FormGroup>
                    <Button type="submit" color="danger" className="mt-3" disabled={isLoading}>
                        Продолжить
                    </Button>
                </Form>
                <div className="d-flex justify-content-center">
                    <span className="register-toggle-link fw-bolder cursor-pointer" onClick={() => dispatch(loginWithoutTwoFactor(null))}>Назад</span>
                </div>
            </div>
        </>
    )
}

export default LoginTOTP;
