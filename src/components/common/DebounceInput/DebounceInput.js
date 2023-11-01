import {Input} from 'antd';
import {useState, useRef} from 'react';


export const DebounceInput = ({onSubmit, debounceTime,...props}) => {
    const [value, setValue] = useState();
    const timeOutRef = useRef(null)

    const valueChangeHandle = (e) => {
        const value = e.target.value;
        const _e = {
            ...e
        }
        setValue(value);

        if (timeOutRef.current) {
            clearTimeout(timeOutRef.current);
        }

        timeOutRef.current = setTimeout(() => {
            if (onSubmit) {
                onSubmit(_e);
            }
        }, debounceTime || 500);

    }

    return <Input value={value} onChange={valueChangeHandle} {...props}/>
}