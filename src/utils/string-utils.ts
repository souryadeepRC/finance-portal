export const isFloatingNumeric = (value: string): boolean => {
  const numericRegex = /^\d+\.?\d*$/;
  return numericRegex.test(value);
};
export const isNumeric = (value: string): boolean => {
  const numericRegex = /^[0-9]*$/;
  return numericRegex.test(value);
};
export const isValidData = (modifiedValue: string): boolean => {
  return modifiedValue === "" || isFloatingNumeric(modifiedValue);
};
export const getGrammaticalText = (value: number, label: String): string => {
  if (!value || value === 0) return "";
  const textNotion: string = value > 1 ? "s" : "";
  return `${value} ${label}${textNotion}`;
};
