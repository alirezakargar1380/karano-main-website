import { Controller, useFormContext } from 'react-hook-form';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Select, { SelectProps } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import { Theme, SxProps } from '@mui/material/styles';
import FormHelperText from '@mui/material/FormHelperText';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import FormControl, { FormControlProps } from '@mui/material/FormControl';
import { InputLabel, Stack, Typography } from '@mui/material';
import SvgColor from '../svg-color';

// ----------------------------------------------------------------------
const customScrollbarStyle = {
  '&::-webkit-scrollbar': {
    width: '4px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#fff',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#E0E0E0',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: '#555',
  },
};

type RHFSelectProps = TextFieldProps & {
  name: string;
  native?: boolean;
  maxHeight?: boolean | number;
  children: React.ReactNode;
  PaperPropsSx?: SxProps<Theme>;
};

export function RHFSelect({
  name,
  native,
  maxHeight = 220,
  helperText,
  children,
  PaperPropsSx,
  ...other
}: RHFSelectProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={''}
      render={({ field, fieldState: { error } }) => (
        <>
          <TextField
            {...field}
            select
            fullWidth
            SelectProps={{
              // renderValue(value) {
              //   return <>{value}</>;
              // },
              native,
              MenuProps: {
                PaperProps: {
                  sx: {
                    ...(!native && {
                      maxHeight: typeof maxHeight === 'number' ? maxHeight : 'unset',
                    }),
                    ...PaperPropsSx,
                    ...customScrollbarStyle,
                  },
                },
              },
              sx: { textTransform: 'capitalize' },
            }}
            error={!!error}
            helperText={helperText}
            {...other}
          >
            {children}
          </TextField>
          {error && (
            <Stack direction={'row'}>
              <SvgColor src='/assets/icons/input/alert-circle.svg' color={'#C80303'} mt={1} />
              <Typography fontFamily={'peyda-regular'} variant='body2' ml={0.5} mt={1}>{error?.message}</Typography>
            </Stack>
          )}
        </>
      )}
    />
  );
}

// ----------------------------------------------------------------------

type RHFMultiSelectProps = FormControlProps & SelectProps &{
  name: string;
  label?: string;
  chip?: boolean;
  checkbox?: boolean;
  placeholder?: string;
  helperText?: React.ReactNode;
  value: string;
  icon?: string;
  options: {
    label: string;
    value: string;
  }[];
};

export function RHFMultiSelect({
  name,
  chip,
  label,
  options,
  checkbox,
  placeholder,
  helperText,
  value,
  icon,
  ...other
}: RHFMultiSelectProps) {
  const { control } = useFormContext();

  const renderValues = (selectedIds: string[]) => {
    if (icon) {
      return (
        <Box sx={{ display: "flex", gap: 1, alignItems: 'center', typography: 'body3' }}>
          <SvgColor src={icon} sx={{ width: 16, height: 16 }} />
          {label}
        </Box>
      )
    }

    const selectedItems = options.filter((item) => selectedIds.includes(item.value));

    if (!selectedItems.length && placeholder) {
      return <Box sx={{ color: 'text.disabled' }}>{placeholder}</Box>;
    }

    if (chip) {
      return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {selectedItems.map((item) => (
            <Chip key={item.value} size="small" label={item.label} />
          ))}
        </Box>
      );
    }

    return selectedItems.map((item) => item.label).join(', ');
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl error={!!error} {...other}>

          <Select
            {...field}
            multiple
            defaultValue={[value]}
            displayEmpty={!!placeholder}
            id={`multiple-${name}`}
            labelId={name}
            // label={label}
            renderValue={renderValues}
            // variant='outlined'
            {...other}
          >
            {options.map((option) => {
              const selected = field?.value?.includes(option.value);

              return (
                <MenuItem key={option.value} value={option.value}>
                  {checkbox && <Checkbox size="small" disableRipple checked={selected} />}

                  {option.label}
                </MenuItem>
              );
            })}
          </Select>

          {(!!error || helperText) && (
            <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
