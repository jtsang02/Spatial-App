function valueFormatterPercentage(param: { value: number; }) {
    if (param.value) {
        return param.value.toLocaleString() + '%';
    } else {
        return '';
    }
}

export default valueFormatterPercentage;
