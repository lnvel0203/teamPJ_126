import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Divider,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  FormControl,
  InputAdornment,
  Stack,
  TextField,
  Typography
} from '@mui/material';

// third-party
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';

// ==============================|| INVOICE - SELECT ADDRESS ||============================== //

// 열기 / 닫기 상태 관리
const AddressModal = ({ open, setOpen, handlerAddress }) => {
  function closeAddressModal() {
    setOpen(false);
  }

  return (
    <Dialog
      maxWidth="sm"
      open={open}
      onClose={closeAddressModal}
      sx={{ '& .MuiDialog-paper': { p: 0 }, '& .MuiBackdrop-root': { opacity: '0.5 !important' } }}
    >
      <DialogTitle>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h5">Select Address</Typography>
          <Button startIcon={<PlusOutlined />} onClick={closeAddressModal} color="primary">
            Add New
          </Button>
        </Stack>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ p: 2.5 }}>
        <FormControl sx={{ width: '100%', pb: 2 }}>
          <TextField
            autoFocus
            id="name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlined />
                </InputAdornment>
              )
            }}
            placeholder="Search"
            fullWidth
          />
        </FormControl>
        <Stack direction="column" spacing={2}>
          <Address handlerAddress={handlerAddress} />
        </Stack>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ p: 2.5 }}>
        <Button color="error" onClick={closeAddressModal}>
          Cancel
        </Button>
        <Button onClick={closeAddressModal} color="primary" variant="contained">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AddressModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  handlerAddress: PropTypes.func
};

const Address = ({ handlerAddress }) => {
  const theme = useTheme();
  const [addressData, setAddressData] = useState([]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get('http://localhost:8081/members/address/test');
        setAddressData(response.data);
      } catch (error) {
        console.error('Error fetching addresses:', error);
        setAddressData([]);
      }
    };

    fetchAddresses();
  }, []);

  return (
    <>
      {addressData.map((address) => (
        <Box
          onClick={() => handlerAddress(address)}
          key={address.email}
          sx={{
            width: '100%',
            border: '1px solid',
            borderColor: 'grey.200',
            borderRadius: 1,
            p: 1.25,
            '&:hover': {
              bgcolor: theme.palette.primary.lighter,
              borderColor: theme.palette.primary.lighter
            }
          }}
        >
          <Typography textAlign="left" variant="subtitle1">
            {address.name}
          </Typography>
          <Stack direction="row" spacing={1}>
            <Typography textAlign="left" variant="body2" color="secondary">
              {address.address}
            </Typography>
            <Typography textAlign="left" variant="body2" color="secondary">
              {address.phone}
            </Typography>
            <Typography textAlign="left" variant="body2" color="secondary">
              {address.email}
            </Typography>
          </Stack>
        </Box>
      ))}
    </>
  );
};

Address.propTypes = {
  handlerAddress: PropTypes.func
};

export default AddressModal;
