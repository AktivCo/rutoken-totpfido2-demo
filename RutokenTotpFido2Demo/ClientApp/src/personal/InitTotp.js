import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';

import {registerTotp} from "../actions";


const InitTotp = () => {

    const dispatch = useDispatch();

    return (
        <div>
            <button 
                className="btn btn-danger"
                onClick={() => dispatch(registerTotp())}>Зарегистрировать OTP</button>
        </div>
    );

}


export default InitTotp;
