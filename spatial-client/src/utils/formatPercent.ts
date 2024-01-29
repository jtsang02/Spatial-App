export default function valueFormatterPercentage(param: { value: number }) {
    if (param.value === null || param.value === undefined) {
        return '';
    }
    return `${param.value} %`;
}