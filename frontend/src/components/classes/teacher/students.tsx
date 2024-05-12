import { Email } from '@mui/icons-material'
import { Box, Button, Card, Typography } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetStudentsQuery, useRemoveStudentMutation } from '../../../reducers/classReducer/classApis'
import AddStudent from './addStudent'

export default function Students() {
    const classId =useParams<{id:string}>().id
    const {data,isLoading,error} = useGetStudentsQuery(classId);
    const [open,setOpen] = React.useState<boolean>(false)
    const [removeStudent] = useRemoveStudentMutation()

    const handleRemove = async (sid:string) => {
       await removeStudent({cid:classId,sid})
    }
    
  return (
    <Box maxWidth="lg" sx={{
        width:"100%",

    }}>
        <AddStudent/>
        {!isLoading && !error && data && 
            data.map((student: any, index:number) => { 
                return (
                  <Card key={index} sx={{
                        width:"100%",
                        display:"flex",
                        flexDirection:"row",
                        justifyContent:"space-between",
                        alignItems:"center",
                        padding:"10px",
                        margin:"5px",
                        borderRadius:"10px"
                    }}>
                      <div style={{
                       width:"60%",
                      }}>
                          <Typography variant="body1">
                            {student.name}
                        </Typography>
                        <Typography variant="body1" sx={{
                            display:"flex",
                            flexDirection:"row",
                            alignItems:"center"
                        }}>
                            <Email sx={{
                                marginRight:"5px"

                            }}/>
                            : {student.Email}
                        </Typography>
                      </div>
                      <div>
                        <Button variant="contained" color='error' onClick={
                            ()=>handleRemove(student._id)
                        }>
                            Remove
                        </Button>
                      </div>
                    </Card>
                )
            })
        }
       
        
    </Box>
  )
}
