import React from 'react';
import "./WarningWidget.css";

export function WarningWidget() {
    return (
        <div className={"site-page-warning"}>
            <p className={"site-page-warning_text"}>
                Вы не являетесь админом этого сервиса, поэтому у вас нет доступа к отправке сообщений!
            </p>
        </div>
    );
}