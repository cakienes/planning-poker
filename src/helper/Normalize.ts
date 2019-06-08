const maxLength: any = (max: number) => (value: string) => (value && value.length > max ? value.slice(0, max) : value);

const maxNumLength: any = (max: number) => (value: string) => {
    if (value === 'e' || value === '0') {
        return null;
    }

    if (!value) {
        return value;
    }
    const numbers = value.replace(/[^\d]/g, '');
    if (Number.isNaN(Number(numbers))) {
        return numbers.slice(0, -1);
    }
    return maxLength(max)(numbers);
};

export { maxLength, maxNumLength };
