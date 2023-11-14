

export const transformSearchSelectData = (data, key, name) => {
    if (!data){
        return [];
    }
    return [...data.map(v => {
        return {
            value: v[key],
            label: v[name]
        }
    })]
}