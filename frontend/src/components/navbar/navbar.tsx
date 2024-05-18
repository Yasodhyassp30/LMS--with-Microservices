
import { Button, IconButton } from '@mui/material';
import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { Home, Logout } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { authSlice } from '../../reducers/authreducer/authReducer';
import { RootState } from '../../reducers/combinedReducers';

export default function Navbar() {
  const [open,setOpen] = React.useState(false);

  const handleDrawer = () => {
    setOpen(!open);
  }
  const dispatch = useDispatch();
  const user = useSelector((state:RootState)=>state.auth)

  const drawerStyle:React.CSSProperties = {
    width: '250px',
    height: 'calc(100% - 2rem)',
    color: 'white',
    position: 'fixed',
    left: open ? '0' : '-100%',
    top: '2.2rem',
    transition: 'all 0.3s ease-in-out',
    zIndex: 100,
    padding: '20px',
    backgroundColor: '#3269a8',
    justifyContent: 'space-between',
  }
  const navbarStyle:React.CSSProperties = {
    width: '100%',
    color: 'white',
    padding: '15px',
    fontWeight: 'bold',
    display: 'flex',
    position: 'fixed',
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: 100,
  };


  return (
    <div>
       <div style={navbarStyle}>
      <div style={drawerStyle}>
      <Button variant='text' sx={{color: 'white',fontSize: '1rem',marginBottom: '10px',width:"100%",backgroundColor:"#3269d9"}}>
        <Home sx={{marginRight: '10px'}}/>
        Home
        </Button>
        <Button variant='text' sx={{color: 'white',fontSize: '1rem',marginBottom: '10px',backgroundColor:"#3269d8",width:"100%"}} onClick={()=>{
          setOpen(false);
          dispatch(authSlice.actions.logout({}));
        }}>
          <Logout sx={{marginRight: '10px'}}/>
          Logout
        </Button>
      </div></div>

    <div style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      display: 'flex',
      justifyContent: 'start',
      alignItems: 'center',
      padding: '10px',
      backgroundColor: '#3269a8',
      color: 'white',
      height: '2rem',
      boxShadow: '0px 0px 5px 0px #000000',
      zIndex: 100,
    }}>
       
      

      {user.token!==""&& <IconButton sx={{
        color: 'white',
      }}
      onClick={handleDrawer}
      >
        <MenuIcon />
      </IconButton>}
      <img src='/images/logo.png' alt='logo' style={{height: '2rem',margin:'5px'}}/>
      LMS
    </div>
    </div>
  )
}
