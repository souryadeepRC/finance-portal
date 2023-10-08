// constants
import { UPDATE_INTEREST_RATE, UPDATE_LOAN_AMOUNT, UPDATE_LOAN_TENURE, RESET_LOAN_DETAILS } from "./home-loan-constants"
//types
import { HomeLoanReducerActionType } from "./home-loan-types";

export const updateLoanAmount = (payload: string): HomeLoanReducerActionType => {
    return {
        type: UPDATE_LOAN_AMOUNT,
        payload
    }
}
export const updateInterestRate = (payload: string): HomeLoanReducerActionType => {
    return {
        type: UPDATE_INTEREST_RATE,
        payload
    }
}
export const updateLoanTenure = (payload: string): HomeLoanReducerActionType => {
    return {
        type: UPDATE_LOAN_TENURE,
        payload
    }
}
export const resetLoanDetails = (): HomeLoanReducerActionType => {
    return {
        type: RESET_LOAN_DETAILS,
    }
}