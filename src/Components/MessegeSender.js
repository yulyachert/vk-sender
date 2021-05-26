import React, {useCallback, useState} from 'react';
import "./Header.css";
import Button from "@material-ui/core/Button";
import axios from "axios";

export function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

export function createAttachments(docs) {
    // if (Object.assign(docs).length === 0) {
    //     return ""
    // }
    let result = '&attachment=';
    for(let doc of docs) {
        result += `doc${doc.owner_id}_${doc.id},`
    }
    console.log(result,docs)
    return result;
}

export function createMessageText(template, csvObject) {
    let formatTemplate = template;
    for (let key of Object.keys(csvObject)) {
        const regex = new RegExp(`{{ ${key} }}`, 'gi')
        formatTemplate = formatTemplate.replace(regex, csvObject[key])
    }

    return formatTemplate
}

export function createMessageRequest(text, userId, token, docs) {
    const randomId = String(randomInteger(1000, 100000000000));
    const params = `user_id=${userId}&random_id=${randomId}&message=${text}`;
    const method = "messages.send";
    const tokenUser = `access_token=${token}`
    const attachments = createAttachments(docs)
    const version = "v=5.130"
    return "https://api.vk.com/method/"+ method +"?"+ params +"&"+ tokenUser + attachments + "&" + version;
}

export function createResultFile(successResults, failedResults) {
    return `successResults: ${[...successResults]}
    failedResults${[...failedResults]}`
}

export function MessageSender(props) {
    const [failedUsers, setFailedUsers] = useState([]);
    const [successUsers, setSuccessUsers] = useState([]);
    const sendMessageToOneUser = useCallback(async (request, userId) => {
        await axios.get(request)
            .then((response) => {
                if (response.data.error) {
                    failedUsers.push(userId);
                    setFailedUsers(failedUsers);
                } else {
                    successUsers.push(userId);
                    setSuccessUsers(successUsers);
                }
            });
    },[failedUsers, successUsers])

    const downloadFile = useCallback(() => {
        const element = document.createElement("a");
        const file = new Blob([createResultFile(successUsers, failedUsers)], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = "results.txt";
        document.body.appendChild(element);
        element.click();
    },[failedUsers, successUsers])

    const sendAllMessages = useCallback(() => {
        for (let user of props.csvArray) {
            const text = createMessageText(props.textTemplate, user)
            const request = createMessageRequest(text, user.id, props.token, props.docs)
            sendMessageToOneUser(request, user.id)
                .then(() => console.log(''))
        }
        setTimeout(() => downloadFile(), 3000);
    },[props, sendMessageToOneUser, downloadFile])

    if (props.isVisible) {
        return null;
    }

    return (
        <Button variant="contained" color="primary" onClick={sendAllMessages}>
            Отправить сообщение
        </Button>
    );
}