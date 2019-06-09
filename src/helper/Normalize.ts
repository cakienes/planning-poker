const maxLength: any = (max: number) => (value: string) => (value && value.length > max ? value.slice(0, max) : value);

export { maxLength };
