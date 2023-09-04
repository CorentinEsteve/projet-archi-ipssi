import React from 'react'

const deleteUserAccount = async(userId:any) => {

    const token = localStorage.getItem("token");

    const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        }
    }

    const url = `http://localhost:3350/api/v1/users/${userId}`;
    
    const response = await fetch(url, options);
    const userDeleted = await response.json();

    console.log("userDeleted",userDeleted);

    return userDeleted;
}

export default deleteUserAccount