import React, {useCallback, useEffect, useMemo, useState} from 'react';
import "./MainPage.css";
import {AuthorizationButton} from "./AuthorizationButton";
import Cookies from "js-cookie";
import {MessageSender} from "./MessegeSender";
import {FileUploader} from "./FileUploader";
import axios from "axios";
import {TemplateUploader} from "./TemplateUploader";

export async function getUploadMessageServerUrl(token, id,) {
    let result = '';
    const tokenId = `access_token=${token}`
    const params = `type=doc&peer_id=${id}`;
    const version = "v=5.130";
    const request = 'https://api.vk.com/method/docs.getMessagesUploadServer' + "?"+ params +"&"+ tokenId + "&" + version
    await axios.get(request)
        .then((response) => {
            result = response.data.response?.upload_url
        })
    return result;
}

export function MainPage(props) {
    const [isError, setIsError] = useState(false);
    const [csvArray, setCsvArray] = useState([]);
    const [textTemplate, setTextTemplate] = useState('');
    const [accessToken, setAccessToken] = useState("");
    const admin = process.env.ADMIN_ID;
    const group = process.env.GROUP_ID;
    const url = 'http://192.168.1.81/';
    const docIds = [];
    const appId = '7835983';
    const isAdmin = useCallback((id) => {
        return admin.includes(id);
    }, [admin])
    const regex = useMemo(() => {
        return /\d=(.+?)$/
    }, []);

    useEffect(async() => {
        Cookies.get("userId") ? props.setIsVisible(false) : props.setIsVisible(true);
        if (window.location.href.includes("access")) {
            setAccessToken(window.location.href.match(regex)[1])
        }
    },[props, regex, accessToken])

    const onAuthorization = useCallback((user) => {
        if (isAdmin(user.uid)) {
            Cookies.set('userId', user.uid, { expires: 1 });
            window.location = `https://oauth.vk.com/authorize?client_id=${appId}&group_ids=${group}&display=page&redirect_uri=${url}&scope=messages,photos,docs&response_type=token&v=5.130`;
        } else {
            setIsError(true);
            setTimeout(() => setIsError(false), 3000)
        }
    }, [isAdmin]);

    return (
        <div className={"main-page"}>
            <AuthorizationButton
                onAuthorization={onAuthorization}
                isError={isError}
                isVisible={props.isVisible}
            />
            <MessageSender
                token={accessToken}
                isVisible={props.isVisible}
                docs={docIds}
                csvArray={csvArray}
                textTemplate={textTemplate}
            />
            <FileUploader
                token={accessToken}
                docIds={docIds}
                isVisible={props.isVisible}
            />
            <TemplateUploader
                setCsvArray={setCsvArray}
                setTextTemplate={setTextTemplate}
                isVisible={props.isVisible}
            />
        </div>
    );
}