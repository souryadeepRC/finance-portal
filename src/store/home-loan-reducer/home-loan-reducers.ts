// constants
import { RESET_LOAN_DETAILS, UPDATE_INTEREST_RATE, UPDATE_LOAN_AMOUNT, UPDATE_LOAN_TENURE } from "./home-loan-constants";
// types
import { HomeLoanReducerType } from "src/store/reducer-types";
import { HomeLoanReducerActionType } from "./home-loan-types";


const initialState: HomeLoanReducerType = {
    loanAmount: '10000',
    interestRate: '6.5',
    loanTenure: '5'
}
const HomeLoanReducer = (state = initialState, action: HomeLoanReducerActionType): HomeLoanReducerType => {
    const { type, payload } = action;
    switch (type) {
        case UPDATE_LOAN_AMOUNT: {
            return {
                ...state,
                loanAmount: payload || ''
            }
        }
        case UPDATE_INTEREST_RATE: {
            return {
                ...state,
                interestRate: payload || ''
            }
        }
        case UPDATE_LOAN_TENURE: {
            return {
                ...state,
                loanTenure: payload || ''
            }
        }
        case RESET_LOAN_DETAILS: {
            const { loanAmount,
                interestRate,
                loanTenure } = initialState
            return {
                ...state,
                loanAmount,
                interestRate,
                loanTenure
            }
        }
        default:
            return state;
    }

}
export { HomeLoanReducer };
