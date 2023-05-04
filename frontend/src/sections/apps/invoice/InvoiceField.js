import PropTypes from 'prop-types';

// material-ui
// import { TableCell, TextField } from '@mui/material';
import { TableCell, TextField, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

// ==============================|| INVOICE - TEXT FIELD ||============================== //

const InvoiceField = ({ cell, onEditItem, onBlur }) => {
  return (
    <TableCell>
      {cell.type === 'select' ? (
        <FormControl fullWidth variant="outlined" error={Boolean(cell.errors) && cell.touched}>
          <InputLabel id={`${cell.name}-label`}>{cell.placeholder}</InputLabel>
          <Select
            labelId={`${cell.name}-label`}
            id={cell.name}
            value={cell.value}
            label={cell.placeholder}
            onChange={onEditItem}
            onBlur={onBlur}
            name={cell.name}
          >
            {cell.options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <TextField
          fullWidth
          variant="outlined"
          placeholder={cell.placeholder}
          name={cell.name}
          type={cell.type}
          id={cell.id}
          value={cell.value}
          onChange={onEditItem}
          onBlur={onBlur}
          error={Boolean(cell.errors) && cell.touched}
          helperText={cell.touched && cell.errors}
        />
      )}
    </TableCell>
  );
};

InvoiceField.propTypes = {
  onEditItem: PropTypes.func,
  cell: PropTypes.object
};

export default InvoiceField;
