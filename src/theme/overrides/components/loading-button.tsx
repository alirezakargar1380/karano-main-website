import { Theme } from '@mui/material/styles';
import { LoadingButtonProps, loadingButtonClasses } from '@mui/lab/LoadingButton';

// ----------------------------------------------------------------------

export function loadingButton(theme: Theme) {
  return {
    MuiLoadingButton: {
      styleOverrides: {
        root: ({ ownerState }: { ownerState: LoadingButtonProps }) => ({
          // backgroundColor: "#000!important",
          '&.Mui-disabled': {
            color: "#fff!important",
          },
          '&.MuiLoadingButton-loading': {
            backgroundColor: "#000!important",
          },
          ...(ownerState.variant === 'soft' && {
            [`& .${loadingButtonClasses.loadingIndicatorStart}`]: {
              left: 10,
            },
            [`& .${loadingButtonClasses.loadingIndicatorEnd}`]: {
              right: 14,
            },
            ...(ownerState.size === 'small' && {
              [`& .${loadingButtonClasses.loadingIndicatorStart}`]: {
                left: 10,
              },
              [`& .${loadingButtonClasses.loadingIndicatorEnd}`]: {
                right: 10,
              },
            }),
          }),
        }),
      },
    },
  };
}
