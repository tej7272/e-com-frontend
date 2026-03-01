import {
  Autocomplete,
  Box,
  TextField,
} from '@mui/material';
import { countries } from 'data/countries';
import Iconify from 'components/base/Iconify';

const CountrySelect = ({
  options = countries,
  fields = { flag: true, name: true, phone: false, code: false },
  renderInput = (params) => <TextField {...params} />,
  ref,
  ...props
}) => {
  return (
    <Autocomplete
      ref={ref}
      id="country-select"
      options={options}
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;

        return (
          <Box
            key={option.code}
            component="li"
            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
            {...optionProps}
          >
            {fields?.flag && <Iconify icon={option.flag} sx={{ mr: 1 }} />}
            {fields?.name && option.label} {fields?.code && `(${option.code})`}{' '}
            {fields?.phone && '+' + option.phone}
          </Box>
        );
      }}
      renderInput={renderInput}
      {...props}
    />
  );
};

export default CountrySelect;
