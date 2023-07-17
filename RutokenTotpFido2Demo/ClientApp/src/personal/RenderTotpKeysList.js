import React, {useEffect, useState} from "react";
import {useDispatch} from 'react-redux';

import {removeTotp} from "../actions";
import cn from "classnames";


const TotpKeyRow = ({totpkey}) => {
    const dispatch = useDispatch();
    return (
        <div onClick={() => dispatch(removeTotp(totpkey))}>Удалить OTP</div>
    );
}

const RenderTotpKeysList = ({keys}) => {

    return (
        <div>
            {keys.map((el, id) => <TotpKeyRow key={id} totpkey={el}></TotpKeyRow>)}
        </div>
    )
}


export default RenderTotpKeysList;
