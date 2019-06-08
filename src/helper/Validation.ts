const required: any = (value: any) => (value ? undefined : 'Please fill');

const onlyNumber: any = (value: any) => {
    return value && parseInt(value, 10) > 0 ? undefined : 'Must be a number';
};

export { required, onlyNumber };
