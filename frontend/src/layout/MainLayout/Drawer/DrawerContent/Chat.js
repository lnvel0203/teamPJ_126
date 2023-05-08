// material-ui
// import { Button, Link } from '@mui/material';
import { Button } from '@mui/material';

// project import

// assets

// ==============================|| DRAWER CONTENT - NAVIGATION CARD ||============================== //
const handleClick = () => {
  const features = 'width=600,height=900';
  window.open('http://192.168.0.28:5000/', '_blank', features);
};

const NavCard = () => (
  <Button
    onClick={handleClick}
    variant="outlined"
    size="small"
    style={{
      border: '1px solid #263238',
      color: '#263238',
      boxShadow: 'none'
    }}
  >
    chat
  </Button>
);

export default NavCard;
