function pageRedirection(url:string,element:any, navigate: any){
    navigate(url, {state: {folderInfo : element}});
  };

  export default pageRedirection;