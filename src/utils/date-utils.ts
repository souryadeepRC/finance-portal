export const getMonthDifference = (startDate: Date, endDate: Date): number => {
  return (
    endDate.getMonth() -
    startDate.getMonth() +
    12 * (endDate.getFullYear() - startDate.getFullYear())
  );
};
