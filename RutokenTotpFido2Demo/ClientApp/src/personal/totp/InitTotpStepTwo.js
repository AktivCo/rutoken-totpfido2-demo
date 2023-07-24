import React from "react";
import StepContainer from "../StepContainer";
import {Form, FormGroup, Input, Label} from "reactstrap";

const InitTotpStepTwo = ({currentStep, toNextStep}) => {
    const stepId = 2;

    const generateSecret = () => {
        alert();
    }
    return (
        <StepContainer
            stepId={stepId}
            header={"Выберите настройки"}
            currentStep={currentStep}
            toNextStep={toNextStep}
        >
            <div>
                Выберите настройки здесь и продублируйте их в приложении.
            </div>
            <Form className="mt-2">
                <div className="row">
                    <FormGroup className="col-md-6">
                        <Label for="exampleEmail" className="mr-sm-2">Шаг времени</Label>
                        <Input type="select" className="form-control" name="select" id="exampleSelect">
                            <option>30 секунд</option>
                            <option>60 секунд</option>
                            <option>120 секунд</option>
                        </Input>
                    </FormGroup>
                    <FormGroup className="col-md-6">
                        <Label for="examplePassword">Алгоритм</Label>
                        <Input type="select" className="form-control" name="select" id="exampleSelect">
                            <option>SHA1</option>
                            <option>SHA256</option>
                            <option>SHA512</option>
                        </Input>
                    </FormGroup>
                </div>
                <div className="row">
                    <FormGroup className="col-md-6">
                        <Label for="exampleEmail" className="mr-sm-2">Секретный ключ</Label>
                        <Input type="text" className="form-control" name="select" id="exampleSelect"/>
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
        </StepContainer>
    );
};

export default InitTotpStepTwo;