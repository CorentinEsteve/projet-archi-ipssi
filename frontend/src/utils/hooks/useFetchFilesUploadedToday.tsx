import React, { useEffect, useState } from 'react'

const useFetchFilesUploadedToday = (): [any[], React.Dispatch<React.SetStateAction<any[]>>] => {
    const [filesUploadedToday, setFilesUploadedToday]=useState<Array<any>>([]);

    useEffect(() => {

        const token = localStorage.getItem("token");
        console.log("mytoken",token);

        const options = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${token}`
            }
        }

        const url = "http://localhost:3350/api/v1/files/today"
  
        fetch(url, options)
        .then(response => response.json())
        .then( datas => {console.log("my files uploaded today:",datas.filesFound); setFilesUploadedToday(datas.filesFound)})
        .catch(err => console.log(err));
        
    },[]);
  return [filesUploadedToday, setFilesUploadedToday];
}

export default useFetchFilesUploadedToday