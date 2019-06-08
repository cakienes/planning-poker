const required: any = (value: any) => (value ? undefined : 'Please fill');

const onlyNumber: any = (value: any) => {
    return value && value !== '0' && parseInt(value, 10) ? undefined : 'Must be a number';
};

export { required, onlyNumber };
