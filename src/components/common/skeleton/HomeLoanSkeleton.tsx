import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
// styles
import styles from './HomeLoanSkeleton.module.scss'

export const SkeletonHomeLoanFields = (): JSX.Element => {
  return (
    <Stack>
      <Skeleton variant="rectangular" width={400} height={200} />
    </Stack>
  );
};
export const SkeletonHomeLoanBreakup = (): JSX.Element => {
  return (
    <Stack spacing={2} direction="row">
      <Skeleton variant="rectangular" width={200} height={100} />
      <Skeleton variant="circular" width={75} height={75} />
    </Stack>
  );
};
export const SkeletonHomeLoanAmortization = (): JSX.Element => {
  return (
    <Stack spacing={2} sx={{alignItems:'center'}}>
      <Skeleton variant="rectangular" width={'35%'} height={75} />
      <Skeleton variant="rectangular" width={'55%'} height={150} />
      <Skeleton variant="rectangular" width={150} height={50} />
    </Stack>
  );
};

export const SkeletonHomeLoan = (): JSX.Element => {
  return (
    <Stack spacing={1}>
      <Stack spacing={6} direction="row" sx={{alignItems: 'center', justifyContent: 'space-around'}} 
      className={styles['loan-field-breakup__container']}>
        <SkeletonHomeLoanFields />
        <SkeletonHomeLoanBreakup />
      </Stack>
      <SkeletonHomeLoanAmortization />
    </Stack>
  );
};
