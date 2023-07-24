import React, {useState} from "react";

import InitTotpStepOne from "./InitTotpStepOne";
import InitTotpStepTwo from "./InitTotpStepTwo";
import InitTotpStepThree from "./InitTotpStepThree";
import InitTotpStepFour from "./InitTotpStepFour";


const InitTotp = () => {
    const [step, setStep] = useState(1);
    const toNextStep = (toStep) => {
        setStep(toStep);
    }

    return (
        <>
            <InitTotpStepOne currentStep={step} toNextStep={toNextStep}/>
            <InitTotpStepTwo currentStep={step} toNextStep={toNextStep}/>
            <InitTotpStepThree currentStep={step} toNextStep={toNextStep}/>
            <InitTotpStepFour currentStep={step} toNextStep={toNextStep}/>
        </>

    );

}


export default InitTotp;
