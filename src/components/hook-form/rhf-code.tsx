import { Controller, useFormContext } from 'react-hook-form';
import { MuiOtpInput, MuiOtpInputProps } from 'mui-one-time-password-input';

import FormHelperText from '@mui/material/FormHelperText';
import { Box } from '@mui/system';

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
          <Box sx={{ border: '1px solid #D1D1D1', borderRadius: '8px', overflow: 'hidden' }}>
            <Box width={0.5} mx={'auto'}>
              <MuiOtpInput
                {...field}
                autoFocus
                gap={1}
                length={6}
                TextFieldsProps={{
                  error: !!error,
                  placeholder: '-',
                  sx: {
                    "& input": {
                      px: 0,
                    },
                    px: 0,
                    "& fieldset": {
                      border: 'none'
                    }
                  }
                }}
                {...other}
              />
            </Box>
          </Box>

          {(error || helperText) && (
            <FormHelperText error={!!error}>
              {helperText || error?.message}
            </FormHelperText>
          )}
        </div>
      )}
    />
  );
}
