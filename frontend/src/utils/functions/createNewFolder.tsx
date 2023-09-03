import React from 'react'

async function createNewFolder(folderFormData: any, userId: string){
    const token = localStorage.getItem("token");

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({"userId": userId, "folderLabel": folderFormData.folderLabel})
    }

    const url = "http://localhost:3350/api/v1/folders";
    
    const response = await fetch(url, options);
    const datas = response.json();

    return datas;
  }

export default createNewFolder