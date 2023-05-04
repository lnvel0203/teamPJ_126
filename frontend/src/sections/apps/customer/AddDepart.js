// AddCustomer.js

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormLabel,
  Grid,
  InputLabel,
  // ListItemText,
  // MenuItem,
  // Select,
  Stack,
  TextField
  // Typography
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// third-party
import _ from 'lodash';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

// project imports
import AlertCustomerDelete from './AlertCustomerDelete';
// import Avatar from 'components/@extended/Avatar';
import { openSnackbar } from 'store/reducers/snackbar';

// actions
// import { createCustomer } from 'actions/customerActions';

// assets
// import { CameraOutlined } from '@ant-design/icons';

import { createCustomer } from './customerActions';

// const avatarImage = require.context('assets/images/users', true);

// constant
const getInitialValues = (customer) => {
  const newCustomer = {
    name: '',
    email: '',
    location: '',
    orderStatus: ''
  };

  if (customer) {
    newCustomer.name = customer.fatherName;
    newCustomer.location = customer.address;
    return _.merge({}, newCustomer, customer);
  }

  return newCustomer;
};

// const allStatus = ['Complicated', 'Single', 'Relationship'];

// ==============================|| CUSTOMER ADD / EDIT / DELETE ||============================== //

const AddCustomer = ({ customer, onCancel }) => {
  const [openAlert, setOpenAlert] = useState(false);

  const handleAlertClose = () => {
    setOpenAlert(!openAlert);
    onCancel();
  };

  const theme = useTheme();
  const dispatch = useDispatch();
  // const isCreating = !customer;

  const [selectedImage, setSelectedImage] = useState(undefined);
  // const [avatar, setAvatar] = useState(avatarImage(`./avatar-${isCreating && !customer?.avatar ? 1 : customer.avatar}.png`));

  useEffect(() => {
    if (selectedImage) {
      setAvatar(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const CustomerSchema = Yup.object().shape({
    name: Yup.string().max(255).required('Name is required'),
    orderStatus: Yup.string().required('Name is required'),
    email: Yup.string().max(255).required('Email is required').email('Must be a valid email'),
    location: Yup.string().max(500)
  });

  const formik = useFormik({
    initialValues: getInitialValues(customer),
    validationSchema: CustomerSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const newCustomer = {
          name: values.name,
          email: values.email,
          location: values.location,
          orderStatus: values.orderStatus
        };
        if (customer) {
          // Update customer functionality here
        } else {
          await dispatch(createCustomer(newCustomer));
          dispatch(
            openSnackbar({
              open: true,
              message: 'Customer added successfully.',
              variant: 'alert',
              alert: {
                color: 'success'
              },
              close: false
            })
          );
        }

        setSubmitting(false);
        onCancel();
      } catch (error) {
        console.error(error);
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <>
      <FormikProvider value={formik}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <DialogTitle>{customer ? 'Edit Customer' : 'New Customer'}</DialogTitle>
            <Divider />
            <DialogContent sx={{ p: 2.5 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                  <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
                    <FormLabel
                      htmlFor="change-avtar"
                      sx={{
                        position: 'relative',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        '&:hover .MuiBox-root': { opacity: 1 },
                        cursor: 'pointer'
                      }}
                    >
                      {/* <Avatar alt="Avatar 1" src={avatar} sx={{ width: 72, height: 72, border: '1px dashed' }} /> */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .75)' : 'rgba(0,0,0,.65)',
                          width: '100%',
                          height: '100%',
                          opacity: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {/* <Stack spacing={0.5} alignItems="center">
                          <CameraOutlined style={{ color: theme.palette.secondary.lighter, fontSize: '2rem' }} />
                          <Typography sx={{ color: 'secondary.lighter' }}>Upload</Typography>
                        </Stack> */}
                      </Box>
                    </FormLabel>
                    <TextField
                      type="file"
                      id="change-avtar"
                      placeholder="Outlined"
                      variant="outlined"
                      sx={{ display: 'none' }}
                      onChange={(e) => setSelectedImage(e.target.files?.[0])}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={9} md={8}>
                  <Grid container spacing={5}>
                    <Grid item xs={9}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="customer-name">부서번호</InputLabel>
                        <TextField
                          fullWidth
                          id="customer-name"
                          placeholder="Enter Department Number"
                          {...getFieldProps('name')}
                          error={Boolean(touched.name && errors.name)}
                          helperText={touched.name && errors.name}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={9}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="customer-email">부서명</InputLabel>
                        <TextField
                          fullWidth
                          id="customer-email"
                          placeholder="Enter Department Name"
                          {...getFieldProps('email')}
                          error={Boolean(touched.email && errors.email)}
                          helperText={touched.email && errors.email}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={9}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="customer-location">설립일</InputLabel>
                        <TextField
                          fullWidth
                          id="customer-location"
                          placeholder="Enter Department Establishment Date"
                          {...getFieldProps('location')}
                          error={Boolean(touched.location && errors.location)}
                          helperText={touched.location && errors.location}
                        />
                      </Stack>
                    </Grid>
                    {/* <Grid item xs={12}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="customer-orderStatus">Order Status</InputLabel>
                        <Select
                          fullWidth
                          id="customer-orderStatus"
                          {...getFieldProps('orderStatus')}
                          error={Boolean(touched.orderStatus && errors.orderStatus)}
                          helperText={touched.orderStatus && errors.orderStatus}
                        >
                          {allStatus.map((status) => (
                            <MenuItem key={status} value={status}>
                              <ListItemText primary={status} />
                            </MenuItem>
                          ))}
                        </Select>
                      </Stack>
                    </Grid> */}
                  </Grid>
                </Grid>
              </Grid>
            </DialogContent>
            <Divider />
            <DialogActions>
              <Button color="error" variant="contained" size="small" type="submit" disabled={isSubmitting}>
                Save
              </Button>
              <Button color="secondary" variant="outlined" size="small" onClick={onCancel}>
                Cancel
              </Button>
            </DialogActions>
          </Form>
        </LocalizationProvider>
      </FormikProvider>
      <AlertCustomerDelete open={openAlert} onClose={handleAlertClose} />
    </>
  );
};

AddCustomer.propTypes = {
  customer: PropTypes.object,
  onCancel: PropTypes.func.isRequired
};

export default AddCustomer;
