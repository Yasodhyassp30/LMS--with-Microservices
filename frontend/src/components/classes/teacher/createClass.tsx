
import React, { useRef, useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { instance } from '../../../axiosConfig';
import { useSelector } from 'react-redux';
import { RootState } from '../../../reducers/combinedReducers';
import { useCreateClassMutation } from '../../../reducers/classReducer/classApis';

export default function CreateClass() {
    const [open, setOpen] = useState(false);
    const name = useRef<HTMLInputElement>(null);
    const user= useSelector((state:RootState)=>state.auth);
    const [error, setError] = useState('');
    const [createClassApi] = useCreateClassMutation();
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleJoin = async () => {
        
        if(name.current?.value){
            try{

                const response = await createClassApi({name: name.current.value, teacher: user.id});
                handleClose();


            }catch(err: any){
                setError(err.response.data.message);
            
            }
            
        }
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleOpen}>
            <AddCircleIcon sx={{
          marginRight: "10px"
        
        }}/>
                Create Class
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create Class</DialogTitle>
                <DialogContent>
                    <p style={{
                        color: 'red'
                    
                    }}>{error}</p>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Class Name"
                        type="text"
                        fullWidth
                        inputRef={name}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleJoin} variant="contained" color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
