import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
// library
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
// components
import { YearlyAmortization } from "./yearly-amortization/YearlyAmortization";
// selectors
import {
  selectYearlyAmortizationDetails,
} from "src/store/home-loan-reducer/home-loan-selectors";
// styles
import styles from './LoanAmortization.module.scss';
// types
import {
  HomeLoanYearlyAmortizationType,
} from "src/store/home-loan-reducer/home-loan-types";

type AmortizationDetails = {
  totalPrincipalPaid: number;
  principalPaid: number;
  interestPaid: number;
  tenureYear: number;
};

const getAmortizationDetails = (
  yearlyAmortizationDetails: HomeLoanYearlyAmortizationType[],
  tenureYear: number
): AmortizationDetails => {
  const amortizationDetail: HomeLoanYearlyAmortizationType =
    yearlyAmortizationDetails?.filter(
      (details: HomeLoanYearlyAmortizationType) => details.year === tenureYear
    )?.[0];

  const {
    totalPrincipalPaid,
    principalPaid,
    interestPaid,
  }: HomeLoanYearlyAmortizationType = amortizationDetail;

  return {
    totalPrincipalPaid,
    principalPaid,
    interestPaid,
    tenureYear,
  };
};
const LoanAmortization = (): JSX.Element => {
  // store
  const yearlyAmortizationDetails: HomeLoanYearlyAmortizationType[] =
    useSelector(selectYearlyAmortizationDetails);
  //state
  const [amortizationDetails, setAmortizationDetails] =
    useState<AmortizationDetails>({
      totalPrincipalPaid: 0,
      principalPaid: 0,
      interestPaid: 0,
      tenureYear: 0,
    });

  const onTenureYearChange = (selectedDate: dayjs.Dayjs | null): void => {
    const tenureYear: number | undefined = selectedDate?.year();
    if (!tenureYear) return;
    setAmortizationDetails(
      getAmortizationDetails(yearlyAmortizationDetails, tenureYear)
    );
  };

  const loanTenureYearList: number[] = useMemo(
    () =>
      yearlyAmortizationDetails?.map(
        (details: HomeLoanYearlyAmortizationType) => details.year
      ),
    [yearlyAmortizationDetails]
  );
  const maxYear: number = useMemo(
    () => loanTenureYearList?.[loanTenureYearList?.length - 1],
    [loanTenureYearList]
  );
  const minYear: number = useMemo(
    () => loanTenureYearList?.[0],
    [loanTenureYearList]
  );

  //effects
  useEffect(() => {
    if (loanTenureYearList?.length > 0) {
      setAmortizationDetails(
        getAmortizationDetails(
          yearlyAmortizationDetails,
          loanTenureYearList?.[0]
        )
      );
    }
  }, [loanTenureYearList, yearlyAmortizationDetails]);

  // calculate
  const {
    principalPaid,
    interestPaid,
    tenureYear,
    totalPrincipalPaid,
  }: AmortizationDetails = amortizationDetails;

  // render fns
  if (yearlyAmortizationDetails?.length <= 0) {
    return <div>Loading...</div>;
  }
  return (
    <div className={styles['amortization-details_container']}>  
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={"Amortization Tenure Year"}
          maxDate={dayjs(new Date(maxYear, 0))}
          minDate={dayjs(new Date(minYear, 0))}
          views={["year"]}
          value={dayjs(new Date(tenureYear, 0))}
          onChange={onTenureYearChange}
        />
      </LocalizationProvider>
      <YearlyAmortization
        principalPaid={principalPaid}
        interestPaid={interestPaid}
        totalPrincipalPaid={totalPrincipalPaid}
      />
    </div>
  );
};

export { LoanAmortization };
