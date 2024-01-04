
export const isFloatingNumeric = (value: string): boolean => {
    const numericRegex = /^\d+\.?\d*$/
    return numericRegex.test(value);
}
export const isNumeric = (value: string): boolean => {
    const numericRegex = /^[0-9]*$/;
    return numericRegex.test(value);
}
export const isValidData = (modifiedValue: string): boolean => {
    return modifiedValue === "" || isFloatingNumeric(modifiedValue);
  };