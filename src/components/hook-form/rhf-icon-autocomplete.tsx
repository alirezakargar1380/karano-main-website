import { Controller, useFormContext } from 'react-hook-form';

import TextField from '@mui/material/TextField';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import Iconify from '../iconify';
import { InputAdornment } from '@mui/material';

// ----------------------------------------------------------------------

interface Props<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
  name: string;
  label?: string;
  placeholder?: string;
  helperText?: React.ReactNode;
}

export default function RHFIconAutocomplete<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
>({
  name,
  label,
  placeholder,
  helperText,
  ...other
}: Omit<Props<T, Multiple, DisableClearable, FreeSolo>, 'renderInput'>) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          onChange={(event, newValue) => setValue(name, newValue, { shouldValidate: true })}
          renderInput={(params) => {
            return (
              <TextField
                // label={label}
                // placeholder={placeholder}
                error={!!error}
                helperText={error ? error?.message : helperText}
                {...{
                  ...params,
                  InputProps: {
                    ...params.InputProps,
                    value: '',
                    startAdornment: (
                      <InputAdornment position="start">
                        <Iconify icon={`circle-flags:${(typeof params.inputProps.value === 'string' && params.inputProps.value.toLowerCase())}`} />
                      </InputAdornment>
                    ),
                    // endAdornment: null
                  }
                }}
              />
            )
          }}
          {...other}
        />
      )}
    />
  );
}
