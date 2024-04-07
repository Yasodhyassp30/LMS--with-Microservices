
import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { instance } from '../../axiosConfig';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers/authreducer/combinedReducers';

export default function JoinClass() {
    const [open, setOpen] = useState(false);
    const [classroomId, setClassroomId] = useState('');
    const [joinCode, setJoinCode] = useState('');
    const [error, setError] = useState('');
    const user= useSelector((state:RootState)=>state.auth);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleJoin = async () => {
        
        if(classroomId!=='' && joinCode!==''){
            try{

                const res = await instance.post(`/class/student/join/${classroomId}`, {
                    joinCode: joinCode,
                    sid: user.id
                })
                setJoinCode('');
                setClassroomId('');
                setError('');
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
                Join Class
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Join Class</DialogTitle>
                <DialogContent>
                    <p style={{
                        color: 'red'
                    
                    }}>{error}</p>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Classroom ID"
                        type="text"
                        fullWidth
                        value={classroomId}
                        onChange={(e) => setClassroomId(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Join Code"
                        type="text"
                        fullWidth
                        value={joinCode}
                        onChange={(e) => setJoinCode(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleJoin} variant="contained" color="primary">
                        Join
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
