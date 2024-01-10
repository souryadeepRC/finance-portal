import { memo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// library
import dayjs from "dayjs";
// icons
import SaveIcon from "@mui/icons-material/Save";
// common components
import { Button } from "src/components/common/button/Button";
import { DatePicker } from "src/components/common/date-picker/DatePicker";
import { LoanInput } from "src/components/common/loan-input/LoanInput";
import { SkeletonPrePayment } from "src/components/common/skeleton/HomeLoanSkeleton";
// actions
import { updatePrePaymentOptions } from "src/store/home-loan-reducer/home-loan-actions";
// selectors
import {
  selectMonthlyEmi,
  selectLoanAmount,
  selectLoanStartPeriod,
  selectPaymentYearDetails,
} from "src/store/home-loan-reducer/home-loan-selectors";
// types
import { AppDispatch } from "src/store/store";
import { LoanInputOnChangeType } from "src/components/common/loan-input/LoanInput";
import {
  LoanStartPeriodType,
  PaymentYearDetailsType,
} from "src/store/home-loan-reducer/home-loan-types";
// constants
import { PRE_PAYMENT_TYPES } from "src/store/home-loan-reducer/home-loan-constants";
// styles
import styles from "./PayByPrincipalEmi.module.scss";
type PayByPrincipalEmiProps = {
  onSave: () => void;
};
type PrePaidDetailsType = {
  amount: number;
  updatedEmi: number;
  month: number;
  year: number;
};
const INITIAL_STATE: PrePaidDetailsType = {
  amount: 1000,
  updatedEmi: 10,
  month: 0,
  year: 0,
};
const PayByPrincipalEmi = memo(
  ({ onSave }: PayByPrincipalEmiProps): JSX.Element => {
    // store
    const dispatch: AppDispatch = useDispatch();
    const monthlyEmi: number = Math.round(useSelector(selectMonthlyEmi));
    const loanAmount: number = useSelector(selectLoanAmount);
    const { maxYear, minYear }: PaymentYearDetailsType = useSelector(
      selectPaymentYearDetails
    );
    const loanStartPeriod: LoanStartPeriodType = useSelector(
      selectLoanStartPeriod
    );
    // state
    const [prePaidDetails, setPrePaidDetails] =
      useState<PrePaidDetailsType>(INITIAL_STATE);
    // fns
    const onEmiChange = ({ value }: LoanInputOnChangeType): void => {
      setPrePaidDetails((prePaidDetails: PrePaidDetailsType) => {
        return {
          ...prePaidDetails,
          updatedEmi: value,
        };
      });
    };
    const onPrePaidPrincipalMonthChange = (
      selectedDate: dayjs.Dayjs | null
    ): void => {
      setPrePaidDetails((prePaidDetails: PrePaidDetailsType) => {
        return {
          ...prePaidDetails,
          month: selectedDate?.month() || new Date().getMonth(),
          year: selectedDate?.year() || new Date().getFullYear(),
        };
      });
    };
    const onPrePaidPrincipalChange = ({
      id,
      value,
    }: LoanInputOnChangeType): void => {
      setPrePaidDetails((prePaidDetails: PrePaidDetailsType) => {
        return {
          ...prePaidDetails,
          [id]: value,
        };
      });
    };
    // effects
    useEffect(() => {
      if (!loanStartPeriod) return;

      const { month, year } = loanStartPeriod;
      if (year !== 0) {
        setPrePaidDetails((prePaidDetails: PrePaidDetailsType) => {
          return {
            ...prePaidDetails,
            updatedEmi: monthlyEmi,
            month,
            year,
          };
        });
      }
    }, [monthlyEmi, loanStartPeriod]);
    const onSaveBtnClick = (): void => {
      const { amount, updatedEmi, month, year } = prePaidDetails;

      if (amount === 0 || year === 0 || updatedEmi === 0) return;

      dispatch(
        updatePrePaymentOptions({
          type: PRE_PAYMENT_TYPES.PRINCIPAL_AND_EMI.value,
          params: {
            prePaidPrincipal: {
              amount,
              month,
              year,
            },
            updatedEmi:{
              amount:updatedEmi,
              month,
              year,
            }
          },
        })
      );
      onSave();
    };

    const { amount, updatedEmi, month, year } = prePaidDetails;
    if (year === 0 || updatedEmi === 0) {
      return <SkeletonPrePayment />;
    }
    // render fns
    return (
      <div className={styles["pay-by-principal-emi__container"]}>
        <div className={styles["amount__container"]}>
          <LoanInput
            id="amount"
            label="Pre-pay Principal every year"
            value={amount}
            minValue={INITIAL_STATE.amount}
            maxValue={loanAmount}
            adornmentPosition="start"
            adornmentIcon={<span>&#8377;</span>}
            onChange={onPrePaidPrincipalChange}
          />
          <DatePicker
            label="After this month"
            views={["year", "month"]}
            maxDate={dayjs(new Date(maxYear, 0))}
            minDate={dayjs(new Date(minYear, 0))}
            value={dayjs(new Date(year, month))}
            onChange={onPrePaidPrincipalMonthChange}
          />

          <LoanInput
            id="emi"
            label="Updated Monthly EMI"
            value={updatedEmi}
            minValue={monthlyEmi}
            maxValue={10000000}
            adornmentPosition="start"
            adornmentIcon={<span>&#8377;</span>}
            onChange={onEmiChange}
          />
        </div>
        <Button
          variant="contained"
          onClick={onSaveBtnClick}
          startIcon={<SaveIcon />}
          disabled={updatedEmi === monthlyEmi}
        >
          Save
        </Button>
      </div>
    );
  }
);
PayByPrincipalEmi.displayName = "PayByPrincipalEmi";
export { PayByPrincipalEmi };
