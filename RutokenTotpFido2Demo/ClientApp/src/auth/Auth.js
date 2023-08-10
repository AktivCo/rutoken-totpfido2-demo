import React from "react";
import {useSelector} from 'react-redux';

import Login from "./Login";
import TwoFactorContainer from "./TwoFactor";

const AuthRenderer = ({twoFactorType}) =>
    (twoFactorType && <TwoFactorContainer type={twoFactorType}/>) || <Login/>;

const Auth = () => {

    const twoFactorType = useSelector(state => state.twoFactorType);

    return (
        <div className="register-background">
            <div className="container">
                <div className="d-flex flex-row justify-content-center align-items-center vh-100">
                    <AuthRenderer twoFactorType={twoFactorType}></AuthRenderer>
                </div>
            </div>
        </div>
    );

}


export default Auth;