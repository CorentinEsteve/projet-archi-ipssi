import React, { useEffect, useState } from 'react'

const useFetchFolders = (currentUserId: string): [any[], React.Dispatch<React.SetStateAction<any[]>>] => {

    const [folders, setFolders] = useState<Array<any>>([]);

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

      const url = `http://localhost:3350/api/v1/folders/${currentUserId}`;

      console.log("url",url)

        fetch(url, options)
        .then(response => response.json())
        .then( data => {console.log("my folders datas:",data); setFolders(data)})
        .catch(err => console.log(err));
        
    },[]);

    
  return [folders, setFolders];
}

export default useFetchFolders