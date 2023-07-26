import React, {useEffect, useState} from "react";
import StepContainer from "../StepContainer";
import {Form, FormGroup, Input, Label} from "reactstrap";
import {useDispatch} from "react-redux";
import {checkTotp, registerTotp} from "../../actions";

const InitTotpStepFour = ({currentStep}) => {
    const dispatch = useDispatch();

    const [totpPassword, changeTotpPassword] = useState('');
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        setError(false);
    }, [currentStep])

    const check = () => {
        setError(false);
        setVerified(false);

        dispatch(checkTotp(totpPassword))
            .then(() => {
                setVerified(true);
            })
            .catch(() => {
                setError(true);
            });
    }
    return (
        <StepContainer
            stepId={4}
            header={"Проверьте одноразовый пароль"}
            currentStep={currentStep}
        >
            <div>
                Нажмите кнопку на корпусе Rutoken OTP <br/>
                и введите отобразившиеся цифры в поле.
            </div>
            <Form className="mt-2">
                <div className="row">
                    <FormGroup className="col-md-6">
                        <Label for="secret" className="mr-sm-2">Одноразовый пароль</Label>
                        <Input
                            maxLength={6}
                            type="text"
                            className="form-control"
                            name="select" value={totpPassword}
                            onChange={(evt) => changeTotpPassword(evt.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="col-md-6  d-flex align-items-center">
                        <div className="text-center d-block mt-4">
                            <span className="register-toggle-link fw-bolder cursor-pointer"
                                  onClick={() => check()}
                            >
                                Проверить
                            </span>
                        </div>
                    </FormGroup>
                </div>
            </Form>
            {
                error && (
                    <>
                        <span className="text-danger">
                            Неверный одноразовый пароль. 
                            <br/> 
                            Повторите попытку ввода. 
                        </span>
                        <div className="d-block mt-2">
                            <a className="fw-bolder cursor-pointer"
                               href="https://dev.rutoken.ru/"
                               target="_blank"
                            >
                                Подробнее о возможных ошибках
                            </a>
                        </div>
                    </>


                )
            }
            {
                verified && (
                    <span className="text-success">
                        Одноразовый пароль верный.
                    </span>
                )
            }
            <div className="col-sm-5 mt-4">
                <button
                    disabled={error || !verified}
                    type="button"
                    className="btn btn-danger"
                    onClick={() => dispatch(registerTotp())}
                >
                    Добавить Рутокен OTP
                </button>
            </div>
        </StepContainer>

    );
};

export default InitTotpStepFour;