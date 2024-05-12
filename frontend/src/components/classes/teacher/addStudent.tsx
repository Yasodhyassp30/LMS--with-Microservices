
import { Add } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import { useAddStudentMutation } from '../../../reducers/classReducer/classApis';
import { useParams } from 'react-router-dom';

export default function AddStudent() {
    const [error, setError] = useState('');
    const emailRef = useRef<HTMLInputElement>(null);
    const [open, setOpen] = React.useState<boolean>(false)
    const [addStudent] = useAddStudentMutation();
    const cid = useParams < { id: string } > ().id;

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const email = emailRef.current?.value;

        if (!email) {
            setError('Email is required');
            return;
        }

        setError('');
        if (emailRef.current) {
            emailRef.current.value = '';
        }
        addStudent({
            cid: cid,
            body:{
                email:email
            }
        });
        handleClose();

    };

    return (
        <div>
           <Button variant="outlined" color="primary" onClick={handleOpen}>
                <Add sx={{
                    marginRight:"5px"
                }}/> Add Student
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Student </DialogTitle>
                <DialogContent>
                    <Typography variant="body1" color="error" sx={{
                        marginBottom:"10px"
                    
                    }}>{error}</Typography>
                    <TextField inputRef={emailRef} label="Email" variant="outlined" fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}