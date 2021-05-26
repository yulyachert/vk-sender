import React, {useCallback} from 'react';
import "./TemplateUploader.css";
import CSVReader from 'react-csv-reader'

export function TemplateUploader(props) {
    const onInputChange = useCallback((event) => {
        props.setTextTemplate(event.target.value)
    }, [props])

    const papaparseOptions = {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: header =>
            header
                .toLowerCase()
                .replace(/\W/g, '_')
    }

    if (props.isVisible) {
        return null;
    }

    return (
        <div className={'csv_container'}>
            <CSVReader
                cssClass="csv-reader-input"
                label="Выберите CSV файл с данными участников.Колонка с id должна всегда называться: id"
                onFileLoaded={(data) => props.setCsvArray(data)}
                onError={() => console.log('')}
                parserOptions={papaparseOptions}
                inputId="ObiWan"
                inputName="ObiWan"
                inputStyle={{color: 'black'}}
            />
            <div className={'template_input_container'}>
                <p>Введите сюда шаблон сообщения в формате(не забывайте про пробелы!!!):</p>
                <p>{'Привет, {{ name }}! Ты записался на олимпиаду. Твой логин для входа: {{ login }}'}</p>
                <textarea className={'template_input'} onChange={onInputChange}/>
            </div>
        </div>

    );
}