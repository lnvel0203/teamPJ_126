import PropTypes from 'prop-types';
import { Select, TableCell, MenuItem } from '@mui/material';
import { getIn } from 'formik';
import InvoiceField from './InvoiceField';
import { DeleteOutlined } from '@ant-design/icons';

const descriptionOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' }
];

const qtyOptions = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 1' },
  { value: '3', label: 'Option 1' },
  { value: '4', label: 'Option 1' }
];

const InvoiceItem = ({ id, name, description, qty, price, onDeleteItem, onEditItem, index, Blur, errors, touched }) => {
  const deleteItemHandler = () => {
    onDeleteItem(index);
  };

  const Name = `invoice_detail[${index}].name`;
  const touchedName = getIn(touched, Name);
  const errorName = getIn(errors, Name);

  const Description = `invoice_detail[${index}].description`;
  const touchedDescription = getIn(touched, Description);
  const errorDescription = getIn(errors, Description);

  return (
    <>
      <TableCell>
        <Select
          label="Description"
          name={`invoice_detail.${index}.description`}
          id={id}
          value={description}
          onChange={onEditItem}
          error={Boolean(errorDescription && touchedDescription)}
        >
          {descriptionOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </TableCell>

      <TableCell>
        <InvoiceField
          onEditItem={onEditItem}
          onBlur={Blur}
          cell={{
            placeholder: 'Item name',
            name: `invoice_detail.${index}.name`,
            type: 'text',
            id: id,
            value: name,
            errors: errorName,
            touched: touchedName
          }}
        />
      </TableCell>

      <TableCell>
        <Select label="Qty" name={`invoice_detail.${index}.qty`} id={id} value={qty} onChange={onEditItem}>
          {qtyOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </TableCell>

      <TableCell>
        <InvoiceField
          onEditItem={onEditItem}
          onBlur={Blur}
          cell={{
            placeholder: '',
            label: 'price',
            type: 'number',
            name: `invoice_detail.${index}.price`,
            id: id,
            value: price
          }}
        />
      </TableCell>
      <TableCell>
        <DeleteOutlined onClick={deleteItemHandler} />
      </TableCell>
    </>
  );
};

InvoiceItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  qty: PropTypes.number,
  price: PropTypes.string,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  index: PropTypes.number,
  Blur: PropTypes.func,
  errors: PropTypes.object,
  touched: PropTypes.object
};

export default InvoiceItem;
