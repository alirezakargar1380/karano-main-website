import { Controller, useFormContext } from 'react-hook-form';
import { MuiOtpInput, MuiOtpInputProps } from 'mui-one-time-password-input';

import FormHelperText from '@mui/material/FormHelperText';

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
          <MuiOtpInput
            {...field}
            autoFocus
            gap={1.5}
            length={6}
            TextFieldsProps={{
              error: !!error,
              placeholder: '-',
            }}
            {...other}
          />

          {(error || helperText)&& (
            <FormHelperText sx={{ px: 2 }} error={!!error}>
              {helperText || error?.message}
            </FormHelperText>
          )}
        </div>
      )}
    />
  );
}
