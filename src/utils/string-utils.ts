
export const isNumeric = (value: string): boolean => {
    var numericRegex = /^\d+\.?\d*$/
    return numericRegex.test(value);
}