import { memo } from "react";
// library
import { PieChart } from "@mui/x-charts";
// hooks
import { useMedia } from "src/hooks/useMedia";
// constants
import {
  APP_PRIMARY_COLOR,
  APP_SECONDARY_COLOR,
} from "src/constants/common-constants";

type BreakupChartProps = {
  principalPaid: number;
  interestPaid: number;
};
const BreakupChart = memo(
  ({ principalPaid, interestPaid }: BreakupChartProps): JSX.Element => {
    // hooks
    const isMobile: boolean = useMedia();

    // return fns
    return (
      <PieChart
        series={[
          {
            data: [
              {
                id: 0,
                value: principalPaid,
                label: "Principal",
                color: APP_PRIMARY_COLOR,
              },
              {
                id: 1,
                value: interestPaid,
                label: "Interest",
                color: APP_SECONDARY_COLOR,
              },
            ],
          },
        ]}
        width={isMobile ? 200 : 200}
        height={isMobile ? 100 : 200}
      />
    );
  }
);
BreakupChart.displayName = "BreakupChart";
export { BreakupChart };
