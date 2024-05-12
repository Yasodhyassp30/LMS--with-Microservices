import React, { useEffect } from "react";
import { instance } from "../../../axiosConfig";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers/authreducer/combinedReducers";
import { Button, Typography } from "@mui/material";
import AssignmentIcon from '@mui/icons-material/Assignment';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CreateClass from "./createClass";
import { Delete } from "@mui/icons-material";
import { People } from "@mui/icons-material";
import { useGetClassesTeacherQuery } from "../../../reducers/classReducer/classApis";
import { useNavigate } from "react-router-dom";


export default function TeacherDashboard() {

    

    const user = useSelector((state: RootState) => state.auth);
    const { data, error, isLoading } = useGetClassesTeacherQuery(user.id);
    const [selectedClass, setSelectedClass] = React.useState<any>(null);

    const navigate = useNavigate();
    return (
      <div style={{
        display: "block",
        top:"4rem",
        position: "absolute",
        width: "100%",
      }}>
        <div style={{
          display:"flex",
          flexDirection:"row",
          alignItems:"center",
        }}>
        <Typography variant="h6" sx={{ margin: "10px"}}>
          Your Classes 
        </Typography>
        <CreateClass/>
        </div>
        <div style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            
        }}>
          {!isLoading && !error && data.map((cls: any,index:number) => {
              return (
              <div
                key={cls.cid}
                style={{
                width: "30%",
                minWidth: "300px",
                display: "flex",
                border: "1px solid #adacac",
                margin: "10px",
                padding: "10px",
                borderRadius: "10px",
                flexDirection: "row",
                justifyContent: "space-between",
                }}
              >
                <div>
                <h3>{cls.name}</h3>
                </div>
                <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
                >
                    <Button
                    variant="contained"
                    color="primary"
                    sx={{
                    marginBottom: "10px",
                    }}
                    title="Students"
                    onClick={() => {
                      navigate(`/class/${cls.cid}`);
                    }}
                    >
                    <People />
                    </Button>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                  marginBottom: "10px",
                  }}
                  title="Lectures"
                >
                  <LibraryBooksIcon />
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                  marginBottom: "10px",
                  }}
                  title="Assignments"
                >
                  <AssignmentIcon />
                </Button>
                <Button variant="contained" color="error" title="Delete Class">
                  <Delete />
                </Button>
                </div>
              </div>
              );
          })}
        </div>
      </div>
    );
}
