import React from 'react';
import "./Header.css";
import VK, {Auth} from "react-vk";
import {WarningWidget} from "./WarningWidget";

export function AuthorizationButton(props) {
    if (!props.isVisible) {
        return null;
    }

    return (
        <VK apiId={7835983}>
            <Auth options={{
                onAuth: user => {
                    props.onAuthorization(user)
                },
            }}/>
            {props.isError && <WarningWidget/>}
        </VK>
    );
}