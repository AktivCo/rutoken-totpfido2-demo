import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';

import {getUserInfo, registerTotp, signOut} from "../actions";
import Layout from "../common/Layout";
import cn from "classnames";


const InitFido = () => {
    return (
        <div>
            <button className="btn btn-danger">Зарегистрировать MFA</button>
        </div>
    );
}


export default InitFido;
