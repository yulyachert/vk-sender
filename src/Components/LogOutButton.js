import React from 'react';
import "./Header.css";
import Button from "@material-ui/core/Button";

export function LogOutButton(props) {
    if (props.isVisible) {
        return null
    }

    return (
        <Button variant="contained" color="primary" onClick={props.logOutFunc}>
            Выйти
        </Button>
    );
}