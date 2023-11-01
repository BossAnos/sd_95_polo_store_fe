import {Select} from "antd";

const SelectSearch = ({options, onChange, ...props}) => {
    return <Select showSearch
                    onChange={onChange}
                    options={options}
                    {...props}
                   filterOption={(input, option) => (option?.label?.toLocaleLowerCase() ?? '').includes(input.toLowerCase())}
    />
}

export {
    SelectSearch
}