import { Assessment, Assignment, LibraryBooks, People } from '@mui/icons-material'
import { Box, Icon, IconButton, Stack, Typography } from '@mui/material'
import React from 'react'
import Students from './students'
import { useGetSingleClassQuery } from '../../../reducers/classReducer/classApis'
import { useParams } from 'react-router-dom'

export default function ClassView() {
    const cid = useParams<{id:string}>().id
    const {data,isLoading,error} = useGetSingleClassQuery(cid)

    const [selected,setSelected] = React.useState<number>(0)

    const handleSelect = (index:number) => {
        setSelected(index)
    }
  return (
    <div style={{
        display: "block",
        top:"4rem",
        position: "relative",
        width: "100%",
    }}>
        {isLoading && <div>Loading...</div>}
        {!isLoading&& !error &&<Box sx={{
            display:"flex",
            flexDirection:"column",
            alignItems:"start",
            margin: "10px",
        }}>
            <Typography variant="h6">
            {data.name}
            </Typography>
            <Typography variant='body1'>
                Created By : {data.teacher}
            </Typography>
            <div style={{
                width:"100%",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",

            }}>
                <Stack direction="row" spacing={2}>
                    <IconButton onClick={()=>handleSelect(0)}>
                        <People/>
                    </IconButton >
                    <IconButton onClick={()=>handleSelect(1)}>
                        <Assignment/>
                    </IconButton>
                    <IconButton onClick={()=>handleSelect(2)}>
                        <Assessment/>
                    </IconButton>
                    <IconButton onClick={()=>handleSelect(3)}>
                        <LibraryBooks/>
                    </IconButton>
                </Stack>
            </div>
           <div style={{
            width:"100%",
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center",
           }}>
           <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",width:"80%",justifyContent:"center"}}>
                {selected === 0 && <Students/>}
                {selected === 1 && <div>Assignments</div>}
                {selected === 2 && <div>Assessments</div>}
                {selected === 3 && <div>Library</div>}
            </Box>
           </div>
        </Box>}
    </div>
  )
}
