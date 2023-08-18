import React, {useState} from "react";
import StepContainer from "../StepContainer";
import {Form, FormGroup, Input, Label} from "reactstrap";
import {useDispatch} from "react-redux";
import {cacheTotpParams, getSecret} from "../../actions";

const InitTotpStepTwo = ({currentStep, toNextStep}) => {
    const stepId = 2;
    const dispatch = useDispatch();
    const [hashMode, changeHashMode] = useState(0);
    const [timeStep, changeTimeStep] = useState(30);
    const [secret, changeSecret] = useState('PTCSFHAAXGA44KIEPYY5GVBCH7SZXCDA');
    
    const submit = () => {

        dispatch(
            cacheTotpParams({
                hashMode: Number(hashMode),
                timeStep: Number(timeStep),
                secret
            }))
            .then(() => toNextStep(stepId + 1));
    }

    const navigateBack = () => {
        toNextStep(stepId);
    }
    const generateSecret = () => {
        dispatch(getSecret())
            .then((generatedSecret) => {
                changeSecret(generatedSecret);
            });
    }
    
    const onSubmit = (evt) => {
        evt.preventDefault();
        submit();
    }

    return (
        <StepContainer
            stepId={stepId}
            header={"Выберите настройки"}
            currentStep={currentStep}
            toNextStep={submit}
        >
            <div>
                Выберите настройки здесь и продублируйте их в приложении.
            </div>
            <div disabled={stepId !== currentStep}>
                <Form className="mt-2" onSubmit={(evt) => onSubmit(evt)}>
                    <div className="row">
                        <FormGroup className="col-md-6">
                            <Label for="timeStep" className="mr-sm-2">Шаг времени</Label>
                            <Input type="select"
                                   className="form-control"
                                   name="select"
                                   value={timeStep}
                                   onChange={(evt) => changeTimeStep(evt.target.value)}
                            >
                                <option value={30}>30 секунд</option>
                                <option value={60}>60 секунд</option>
                                <option value={120}>120 секунд</option>
                            </Input>
                        </FormGroup>
                        <FormGroup className="col-md-6">
                            <Label for="hashMode">Алгоритм</Label>
                            <Input type="select"
                                   className="form-control"
                                   name="select"
                                   value={hashMode}
                                   onChange={(evt) => changeHashMode(evt.target.value)}
                            >
                                <option value={0}>SHA1</option>
                                <option value={1}>SHA256</option>
                            </Input>
                        </FormGroup>
                    </div>
                    <div className="row">
                        <FormGroup className="col-md-6">
                            <Label for="secret" className="mr-sm-2">Секретный ключ</Label>
                            <Input
                                type="text"
                                className="form-control"
                                name="select" value={secret}
                                autoFocus
                                onChange={(evt) => changeSecret(evt.target.value)}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-6  d-flex align-items-center">
                            <div className="text-center d-block mt-4">
                            <span className="register-toggle-link fw-bolder cursor-pointer"
                                  onClick={() => generateSecret()}
                            >
                                Сгенерировать
                            </span>
                            </div>
                        </FormGroup>
                    </div>
                </Form>
                <small className="text-secondary d-block">
                    Введите известный вам ключ для Рутокена OTP или сгенерируйте его.
                </small>
                <small className="text-secondary d-block">
                    Значение ключа должно быть представлено в кодировке base32 или в формате HEX.
                </small>
            </div>
            {
                stepId !== currentStep && (
                    <div className="d-block mt-4">
                        <span className="register-toggle-link fw-bolder cursor-pointer"
                              onClick={() => navigateBack()}
                        >
                            Изменить настройки
                        </span>
                    </div>
                )
            }


        </StepContainer>
    );
};

export default InitTotpStepTwo;
