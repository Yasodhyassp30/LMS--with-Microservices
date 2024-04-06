
import axios, { AxiosInstance } from "axios";

export const instance  = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
    },
})
   
try{
    const user = JSON.parse(localStorage.getItem("user") as string);
    instance.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
}catch{
    console.log("No token found");
}