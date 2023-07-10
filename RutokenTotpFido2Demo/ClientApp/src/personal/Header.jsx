
import React from 'react';

import { useDispatch } from 'react-redux';

import { signOut } from "../actions";

const Header = ({ children }) => {

    const dispatch = useDispatch();

    return (
        <div className="personal-container d-flex flex-column">
            <header className="d-flex flex-row justify-content-between">
                <div className="header__img">
                    <a><span className="img__logo" /></a>
                </div>
                <div className="header__menu">
                    <ul className="d-flex flex-row justify-content-end">
                        <li>
                            <a
                                onClick={() => dispatch(signOut())}
                                role="button"
                                tabIndex={0}
                            >
                                Выход
                            </a>
                        </li>
                    </ul>
                </div>
            </header>
            <>
                {children}
            </>
        </div>
    );
};

export default Header;
