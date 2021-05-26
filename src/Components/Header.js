import React, {useCallback} from 'react';
import "./Header.css";
import SendIcon from '@material-ui/icons/Send';
import {LogOutButton} from "./LogOutButton";
import Cookies from "js-cookie";

export function Header(props) {
    const onLogOut = useCallback(() => {
        Cookies.remove("userId");
        props.setIsVisible(true);
    }, [props]);

    return (
        <div className={"site-page-header"}>
            <div className={"site-page-header_container"}>
                <SendIcon className={"site-page-header_icon"}/>
                <p className={"site-page-header_text"}>
                    VK-SENDER
                </p>
            </div>
            <LogOutButton
                logOutFunc={onLogOut}
                isVisible={props.isVisible}
            />
        </div>
    );
}