import React from 'react';
import { Input } from 'reactstrap';
import cl from './CustomSwitch.module.scss'

const CustomSwitch = ({checked, setChecked}) => {
    return (
        <label className={cl.Switch}>
            <Input type="checkbox"
                checked={checked}
                onChange={() => setChecked(!checked)}>
            </Input>
            <span className={[cl.Slider, cl.Round].join(' ')}></span>
        </label>
    );
};

export default CustomSwitch;