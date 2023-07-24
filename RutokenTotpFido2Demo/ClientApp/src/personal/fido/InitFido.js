import React from "react";
import StepContainer from "../StepContainer";
import {useDispatch} from "react-redux";
import RegisterFidoModal from "./RegisterFidoModal";
import {showModal} from "../../actions";

const InitFido = () => {
    const dispatch = useDispatch();
    const stepId = 1;

    const registerFidoDevice = () => {
        dispatch(showModal(RegisterFidoModal))
    }

    return (
        <StepContainer
            stepId={stepId}
            header={"Подключите устройство"}
            currentStep={stepId}
            toNextStep={registerFidoDevice}
            btnTitle={"Добавить Рутокен MFA"}
        >
            <div>
                Подключите Рутокен MFA к компьютеру и нажмите добавить.
            </div>
            
        </StepContainer>
    );
};

export default InitFido;