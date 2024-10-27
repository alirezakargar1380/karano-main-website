import { Controller, useFormContext } from 'react-hook-form';

import Radio from '@mui/material/Radio';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup, { RadioGroupProps } from '@mui/material/RadioGroup';
import { SxProps } from '@mui/system';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import SvgColor from '../svg-color';

// ----------------------------------------------------------------------

type Props = RadioGroupProps & {
  name: string;
  options: {
    label: string;
    value: any;
    icon: any;
    onClick?: () => void;
  }[];
  label?: string;
  spacing?: number;
  helperText?: React.ReactNode;
  FSx?: SxProps,
  disabled?: boolean | undefined
  FormControlSx?: SxProps

};

export default function RHFRadioAddress({
  row,
  name,
  label,
  options,
  spacing,
  helperText,
  FSx,
  disabled,
  FormControlSx,
  ...other
}: Props) {
  const { control } = useFormContext();

  const labelledby = label ? `${name}-${label}` : '';

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl component="fieldset" sx={{ ...FormControlSx }}>
          {label && (
            <FormLabel component="legend" id={labelledby} sx={{ typography: 'body2' }}>
              {label}
            </FormLabel>
          )}

          <RadioGroup {...field} aria-labelledby={labelledby} {...other}>
            {options.map((option, index) => (
              <Stack direction={row ? 'row' : 'column'} justifyContent={'space-between'} key={option.value}>
                <Stack direction={'row'}>
                  <FormControlLabel
                    value={option.value}
                    disabled={disabled}
                    control={<Radio disabled={disabled} />}
                    // label={option.label}
                    label={''}
                    sx={{
                      '&:not(:last-of-type)': {
                        mb: spacing || 0,
                      },
                      ...(row && {
                        mr: 0,
                        '&:not(:last-of-type)': {
                          mr: spacing || 2,
                        },
                      }),
                      ...FSx
                    }}
                  />
                  {/* {(option.icon) && (
                    <SvgColor src={option.icon} sx={{ mt: 0.75, mr: 0.5 }} color={"#727272"} />
                  )} */}
                  <Typography variant='body2' sx={{ mt: 1, ml: 1 }}>{option.label}</Typography>
                </Stack>
                {(option.icon) && (
                  <IconButton onClick={option.onClick}>
                    <SvgColor src={'/assets/icons/user-panel/edit-02.svg'} sx={{ width: 16, height: 16 }} color={"#727272"} />
                  </IconButton>
                )}
              </Stack>
            ))}
          </RadioGroup>

          {(!!error || helperText) && (
            <FormHelperText error={!!error} sx={{ mx: 0 }}>
              {error ? error?.message : helperText}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}