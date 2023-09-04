async function addStorageAfterPayment(userId: string){

    const url = "http://localhost:3350/api/v1/users/addStorageAfterPayment";

    const token = localStorage.getItem("token");

    const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({"userId": userId})
    }

    console.log("iiiiiiiiid",userId)
    
    const response = await fetch(url, options);
    const userUpdated = await response.json();

    console.log("userUpdated", userUpdated)

    return userUpdated;

  }

export default addStorageAfterPayment