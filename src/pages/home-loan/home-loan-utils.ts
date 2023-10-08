export const calculateEMI = (loanAmount: number, interestRate: number, loanTenure: number): number => {
    const tenureInMonth = loanTenure * 12;
    if (interestRate === 0) {
        return Math.round(loanAmount / tenureInMonth);
    }
    const monthlyRate = interestRate / (12 * 100);
    return Math.round(
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureInMonth)) /
        (Math.pow(1 + monthlyRate, tenureInMonth) - 1)
    );
};