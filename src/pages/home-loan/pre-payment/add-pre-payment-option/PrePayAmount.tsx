import dayjs from "dayjs";
import { memo } from "react";
import { useSelector } from "react-redux";
// common components
import { DatePicker } from "src/components/common/date-picker/DatePicker";
import {
  LoanInput,
  LoanInputOnChangeType,
} from "src/components/common/loan-input/LoanInput";
import { SkeletonPrePayment } from "src/components/common/skeleton/HomeLoanSkeleton";
// selectors
import { selectPaymentYearDetails } from "src/store/home-loan-reducer/home-loan-selectors";
// types
import {
  PaymentYearDetailsType,
  PrePaidAmountType,
} from "src/store/home-loan-reducer/home-loan-types";
// styles
import styles from "./AddPrePaymentOption.module.scss";
import { useMaxPrePaidAmount } from "../../../../hooks/home-loan/useMaxPrePaidAmount";


type PrePayAmountProps = {
  prePaidAmount: {
    amount: number;
    month: number;
    year: number;
  };
  id: string;
  label: string;
  minAmount: number;
  setPrePaidAmount: any;
  maxAmount?: number;
};
const PrePayAmount = memo(
  ({
    prePaidAmount,
    id,
    label,
    setPrePaidAmount,
    minAmount,
  }: PrePayAmountProps): JSX.Element => {
    const { maxYear, minYear }: PaymentYearDetailsType = useSelector(
      selectPaymentYearDetails
    );

    // hooks
    const maxAmount: number = useMaxPrePaidAmount(prePaidAmount?.year);

    const onpPrePaidAmountDateChange = (
      selectedDate: dayjs.Dayjs | null
    ): void => {
      if (!selectedDate) return;
      setPrePaidAmount((prePaidAmount: PrePaidAmountType) => {
        return {
          ...prePaidAmount,
          month: selectedDate?.month(),
          year: selectedDate?.year(),
        };
      });
    };
    const onPrePaidPrincipalChange = ({
      id,
      value,
    }: LoanInputOnChangeType): void => {
      setPrePaidAmount((prePaidAmount: PrePaidAmountType) => {
        return {
          ...prePaidAmount,
          amount: value,
        };
      });
    };

    const { amount, month, year } = prePaidAmount;
    if (year === 0) {
      return <SkeletonPrePayment />;
    }
    return (
      <>
        <div className={styles["pre-pay-amount__container"]}>
          <LoanInput
            id={id}
            label={label}
            value={amount}
            minValue={minAmount}
            maxValue={maxAmount}
            adornmentPosition="start"
            adornmentIcon={<span>&#8377;</span>}
            onChange={onPrePaidPrincipalChange}
          />
          <DatePicker
            label="Pre Paid month-year"
            views={["year", "month"]}
            maxDate={dayjs(new Date(maxYear, 0))}
            minDate={dayjs(new Date(minYear, 0))}
            value={dayjs(new Date(year, month))}
            onChange={onpPrePaidAmountDateChange}
          />
        </div>
      </>
    );
  }
);
PrePayAmount.displayName = "PrePayAmount";
export { PrePayAmount };
