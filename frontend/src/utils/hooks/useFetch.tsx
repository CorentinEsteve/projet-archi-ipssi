

const useFetch = async(method:string, url:string, body:any, isJson = true) => {

    const token = localStorage.getItem("token");


    console.log("bodyy",body)

      const options1 = {
          method: method,
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          },
          body: body
      }

      const options2 = {
        method: method,
          headers: {
            "Authorization": `Bearer ${token}`
          },
          body: body
      }

      const options = isJson ? options1 : options2;

      const response = await fetch(url, options);
      const datas = await response.json();

      return datas;
}

export default useFetch