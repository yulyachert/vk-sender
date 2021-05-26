import React from 'react';
import "./UploadWarning.css";

export function UploadWarning() {
    return (
        <div className={"upload_file_success_container"}>
            <p className={"upload_file"}>
                Файлы загружены, вы можете отправить сообщение
            </p>
        </div>
    );
}