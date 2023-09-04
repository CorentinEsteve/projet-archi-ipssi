import React, { useEffect, useState } from 'react'

const useFetchAllUsers = () : [any[], React.Dispatch<React.SetStateAction<any[]>>] => {

    const [users, setUsers] = useState<Array<any>>([]);

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

        const url = "http://localhost:3350/api/v1/users"
  
        fetch(url, options)
        .then(response => response.json())
        .then( datas => {console.log("my users datas:",datas); setUsers(datas)})
        .catch(err => console.log(err));

    },[]);


  return [users, setUsers];
}

export default useFetchAllUsers