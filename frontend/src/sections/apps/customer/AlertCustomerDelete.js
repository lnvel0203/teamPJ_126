import axios from 'axios';
import PropTypes from 'prop-types';

// material-ui
import { Button, Dialog, DialogContent, Stack, Typography } from '@mui/material';

// project import
import Avatar from 'components/@extended/Avatar';
import { PopupTransition } from 'components/@extended/Transitions';

// assets
import { DeleteFilled } from '@ant-design/icons';

// ==============================|| CUSTOMER - DELETE ||============================== //
const deleteCustomer = ( id ) => {
  try {
    const response = axios.delete(`http://localhost:8081/members/deleteEmployee/${id}`, id);
    //이거 필요해? 내일 삭제해
    if (response.status === 200) {
      console.log('Customer deleted successfully');
      
    }
    window.location.reload();
  } catch (error) {
    console.error('Error deleting customer:', error);
  }
};

export default function AlertCustomerDelete({ title, open, handleClose }) {
  return (
    <Dialog
      open={open}
      onClose={() => handleClose(false)}
      keepMounted
      TransitionComponent={PopupTransition}
      maxWidth="xs"
      aria-labelledby="column-delete-title"
      aria-describedby="column-delete-description"
    >
      <DialogContent sx={{ mt: 2, my: 1 }}>
        <Stack alignItems="center" spacing={3.5}>
          <Avatar color="error" sx={{ width: 72, height: 72, fontSize: '1.75rem' }}>
            <DeleteFilled />
          </Avatar>
          <Stack spacing={2}>
            <Typography variant="h4" align="center">
              Are you sure you want to delete?
            </Typography>
            <Typography align="center">
              By deleting
              <Typography variant="subtitle1" component="span">
                {' '}
                &quot;{title}&quot;{' '}
              </Typography>
              user, all task assigned to that user will also be deleted.
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ width: 1 }}>
            <Button
              fullWidth
              color="error"
              variant="contained"
              onClick={async () => {
                await deleteCustomer(title);
                handleClose(true);
              }}
              autoFocus
            >
              Delete
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

AlertCustomerDelete.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  customerId: PropTypes.number
};
