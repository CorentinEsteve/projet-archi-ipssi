import React, { useEffect, useState } from 'react'

const useFetchFiles = (folderId: string) : [any[], React.Dispatch<React.SetStateAction<any[]>>] => {

    const [files, setFiles]=useState<Array<any>>([]);

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

        const url = `http://localhost:3350/api/v1/files/folder-files/${folderId}`
  
        fetch(url, options)
        .then(response => response.json())
        .then( data => {console.log("my folders datas:",data); setFiles(data.filesFound)})
        .catch(err => console.log(err));
        
    },[]);
  return [files, setFiles];
}

export default useFetchFiles