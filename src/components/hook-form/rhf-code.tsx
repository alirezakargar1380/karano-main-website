import { Controller, useFormContext } from 'react-hook-form';
import { MuiOtpInput, MuiOtpInputProps } from 'mui-one-time-password-input';

import FormHelperText from '@mui/material/FormHelperText';
import { Box, Stack } from '@mui/system';
import SvgColor from '../svg-color';
import { Typography } from '@mui/material';

// ----------------------------------------------------------------------

type RHFCodesProps = MuiOtpInputProps & {
  name: string;
  helperText?: string;
};

export default function RHFCode({ name, helperText, ...other }: RHFCodesProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <Box sx={{
            border: '1px solid #D1D1D1',
            ...(error && {
              border: '1px solid red',
            }),
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            <Box width={0.5} mx={'auto'}>
              <MuiOtpInput
                {...field}
                autoFocus
                gap={0}
                length={6}
                TextFieldsProps={{
                  error: !!error,
                  placeholder: '-',
                  InputProps: {
                    sx: {
                      "& input": {
                        px: 0,
                        textAlign: 'center',
                        width: 1,

                      },
                      px: 0,
                      "& fieldset": {
                        border: 'none',
                      }
                    }
                  },
                }}
                {...other}
              />
            </Box>
          </Box>

          {error && (
            <Stack direction={'row'}>
              <SvgColor src='/assets/icons/input/alert-circle.svg' color={'#C80303'} mt={1} />
              <Typography variant='body2' ml={0.5} mt={1}>{error?.message}</Typography>
            </Stack>
          )}

          {(helperText) && (
            <FormHelperText>
              {helperText}
            </FormHelperText>
          )}
        </div>
      )}
    />
  );
}
