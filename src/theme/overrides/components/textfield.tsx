import { alpha, Theme } from '@mui/material/styles';
import { inputBaseClasses } from '@mui/material/InputBase';
import { inputLabelClasses } from '@mui/material/InputLabel';
import { filledInputClasses } from '@mui/material/FilledInput';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';

// ----------------------------------------------------------------------

export function textField(theme: Theme) {
  const color = {
    focused: theme.palette.text.primary,
    active: theme.palette.text.secondary,
    placeholder: theme.palette.text.disabled,
  };

  const font = {
    label: theme.typography.body1,
    value: theme.typography.body2,
  };

  return {
    // HELPER
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginTop: theme.spacing(1),
        },
      },
    },

    // LABEL
    MuiFormLabel: {
      styleOverrides: {
        root: {
          ...font.value,
          color: color.placeholder,
          [`&.${inputLabelClasses.shrink}`]: {
            ...font.label,
            fontWeight: 600,
            color: color.active,
            [`&.${inputLabelClasses.focused}`]: {
              color: color.focused,
            },
            [`&.${inputLabelClasses.error}`]: {
              color: theme.palette.error.main,
            },
            [`&.${inputLabelClasses.disabled}`]: {
              color: theme.palette.text.disabled,
            },
            [`&.${inputLabelClasses.filled}`]: {
              transform: 'translate(12px, 6px) scale(0.75)',
            },
          },
        },
      },
    },

    // BASE
    MuiInputBase: {
      styleOverrides: {
        root: {
          paddingRight: '0px!important',
          [`&.${inputBaseClasses.disabled}`]: {
            background: '#F8F8F8',
            borderColor: '#D1D1D1',
            '& svg': {
              color: theme.palette.text.disabled,
            },
          },
        },
        input: {
          ...font.value,
          '&::placeholder': {
            opacity: 1,
            color: color.placeholder,
          },
        },
      },
    },

    // STANDARD
    MuiInput: {
      styleOverrides: {
        underline: {
          '&:before': {
            borderBottomColor: alpha(theme.palette.grey[500], 0.32),
          },
          '&:after': {
            borderBottomColor: color.focused,
          },
        },
      },
    },

    // OUTLINED
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          
          '& input': {
            padding: '8px 12px',
            fontSize: '16px',
            lineHeight: '32px',
            height: '32px',
            letterSpacing: '0.03em',
            fontFamily: 'peyda-regular',
            '&::placeholder': {
              color: '#D1D1D1',
            }
          },
          [`&.${outlinedInputClasses.focused}`]: {
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: color.focused,
            },
          },
          [`&.${outlinedInputClasses.error}`]: {
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: theme.palette.error.main,
            },
          },
          [`&.${outlinedInputClasses.disabled}`]: {
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: theme.palette.action.disabledBackground,
            },
          },
        },
        notchedOutline: {
          borderRadius: '8px',
          borderColor: '#D1D1D1',
          transition: theme.transitions.create(['border-color'], {
            duration: theme.transitions.duration.shortest,
          }),
        },
      },
    },

    // FILLED
    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadius,
          backgroundColor: alpha(theme.palette.grey[500], 0.08),
          '&:hover': {
            backgroundColor: alpha(theme.palette.grey[500], 0.16),
          },
          [`&.${filledInputClasses.focused}`]: {
            backgroundColor: alpha(theme.palette.grey[500], 0.16),
          },
          [`&.${filledInputClasses.error}`]: {
            backgroundColor: alpha(theme.palette.error.main, 0.08),
            [`&.${filledInputClasses.focused}`]: {
              backgroundColor: alpha(theme.palette.error.main, 0.16),
            },
          },
          [`&.${filledInputClasses.disabled}`]: {
            backgroundColor: theme.palette.action.disabledBackground,
          },
        },
      },
    },
  };
}
