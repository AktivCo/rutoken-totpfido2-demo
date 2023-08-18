import React, {useEffect, useState} from "react";
import StepContainer from "../StepContainer";
import {Form, FormGroup, Input, Label} from "reactstrap";
import {useDispatch} from "react-redux";
import {checkTotp, registerTotp} from "../../actions";


const RenderError = ({error}) => {
    console.log(error);
    if (!error) return null;
    if (!error.hasOwnProperty('message')) {
        return (
            <span className="text-danger">
                Неверный одноразовый пароль.
                    <br/>
                Повторите попытку ввода.
            </span>
        )
    }

    return (
        <span className="text-danger">
            {error.message}
        </span>
    )

}
const InitTotpStepFour = ({currentStep}) => {
    const dispatch = useDispatch();

    const [totpPassword, changeTotpPassword] = useState('');
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setError(null);
        setVerified(false);
        changeTotpPassword('');

    }, [currentStep])

    const check = () => {
        setError(null);
        setVerified(false);

        dispatch(checkTotp(totpPassword))
            .then(() => {
                setVerified(true);
            })
            .catch(() => {
                setError({});
            });
    }

    const onSubmit = (evt) => {
        evt.preventDefault();
        if (!verified) {
            check();
            return;
        }
        register();
    }

    const register = () => {
        dispatch(registerTotp())
            .catch((err) => {
                setVerified(false);
                setError(err.response.data);
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
            <Form className="mt-2" onSubmit={(evt) => onSubmit(evt)}>
                <div className="row">
                    <FormGroup className="col-md-6">
                        <Label for="secret" className="mr-sm-2">Одноразовый пароль</Label>
                        <Input
                            maxLength={6}
                            type="text"
                            className="form-control"
                            name="select" value={totpPassword}
                            autoFocus
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
                        <RenderError error={error}></RenderError>
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
                    onClick={() => register()}
                >
                    Добавить Рутокен OTP
                </button>
            </div>
        </StepContainer>

    );
};

export default InitTotpStepFour;