// AddCustomer.js
import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';
// material-ui
import {
  //Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormLabel,
  Grid,
  InputLabel,
  Stack,
  TextField
  // Typography
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// third-party

import { useFormik, Form, FormikProvider } from 'formik';

// project imports
import AlertCustomerDelete from './AlertCustomerDelete';

// ==============================|| CUSTOMER ADD / EDIT / DELETE ||============================== //

const AddCustomer = ({ customer, onCancel }) => {

  const [openAlert, setOpenAlert] = useState(false);

  const handleAlertClose = () => {
    setOpenAlert(!openAlert);
    onCancel();
  };
  const formik = useFormik({

  });
  const API_BASE_URL = 'http://localhost:8081/department';
 
  const [dept, setDept] = useState({
    deptid: "",
    deptname: "",
  });

  //input에 입력될 때마다 account state값 변경되게 하는 함수
  const onChange = (e) => {
    setDept({
      ...dept,
      [e.target.name]: e.target.value,
    });
  };
  const addDepartment = (e) =>{

    e.preventDefault();
    console.log(dept);
    axios.post(API_BASE_URL + "/addDepartment", dept)
  
    .then(response => {
      onCancel();
      console.log(response.data);
      alert('부서가 추가되었습니다.');
    })
    .catch(error => {
      console.error(error);
    });
  }
  return (
    <>
      <FormikProvider value={formik}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Form autoComplete="off" noValidate onSubmit={addDepartment}>
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
                    </FormLabel>
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
                          name='deptid'
                          onChange={onChange}

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
                          name='deptname'
                          onChange={onChange}
                        />
                      </Stack>
                    </Grid>
                   
                  </Grid>
                </Grid>
              </Grid>
            </DialogContent>
            <Divider />
            <DialogActions>
              <Button color="error" variant="contained" size="small" type="submit">
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
