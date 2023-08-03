import React from "react";
import LoginFIDO from "./LoginFido";
import LoginTOTP from "./LoginTotp";


const TwoFactorContainer = ({type}) => {
    if (type === 'FIDO') return <LoginFIDO/>;
    if (type === 'TOTP') return <LoginTOTP/>;

    return null;
};


export default TwoFactorContainer;