import React, {Component} from 'react';
import axios from 'axios';
import {randomInteger} from "./MessegeSender";
import {UploadWarning} from "./UploadWarning";
import "./FileUploader.css";
import {getUploadMessageServerUrl} from "./MainPage";


async function saveDocs(token, file) {
    let result = '';
    const tokenId = `access_token=${token}`
    const fileName = `file=${file}`;
    const params = `title=doc${randomInteger(1, 100000)}`;
    const version = "v=5.130";
    const request = 'https://api.vk.com/method/docs.save' + "?" + fileName + '&' + params + "&" + tokenId + "&" + version
    await axios.get(request)
        .then((response) => {
            result = response.data
        })
    return result
}

export class FileUploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            loaded: 0,
            isSuccess: false
        }

    }

    onChangeHandler = event => {
        let files = event.target.files
        this.setState({
            selectedFile: files,
            loaded: 0,
            isSuccess: false
        })
        setTimeout(() => this.onClickHandler(), 3000);

    }
    onClickHandler = () => {
        const data = new FormData()
        let href = "";
        for (let x = 0; x < this.state.selectedFile.length; x++) {
            getUploadMessageServerUrl(this.props.token, '176622518')
                .then((response) => {
                    href = response;
                    data.append('file', this.state.selectedFile[x])
                    axios.post(href, data)
                        .then( (response) => {
                            saveDocs(this.props.token, response.data.file)
                                .then((response) => {
                                    this.props.docIds.push({
                                        owner_id: response.response?.doc.owner_id,
                                        id: response.response?.doc.id
                                    })
                                    if (this.props.docIds.length === this.state.selectedFile.length) {
                                        this.setState({
                                            isSuccess: true
                                        })
                                    }
                                })
                        })
                })
        }
    }


    render() {
        if (this.props.isVisible) {
            return null;
        }

        return (
            this.state.isSuccess ?
                <UploadWarning/> :
                    <div className={"container_upload"}>
                        <p>Загрузка файлов во вложения к сообщению(можно выбрать несколько), дождитесь успешной загрузки, только потом отправляйте сообщение</p>
                        <div className={"upload_button_container"}>
                            <input type="file" className={"form-control_upload"} multiple onChange={this.onChangeHandler}/>
                        </div>
                    </div>
        );
    }
}