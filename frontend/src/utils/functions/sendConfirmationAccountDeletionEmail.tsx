import emailjs from "emailjs-com";

const sendConfirmationAccountDeletionEmail = (customerInfo: any) => {

    console.log("customer Info",customerInfo);
 
    const templateParams = {
        customer_email: customerInfo.email,
        customer_name: customerInfo.name,
        customer_firstName: customerInfo.firstName,
        customer_files: customerInfo.numberOfFiles,
        customer_folders: customerInfo.numberOfFolders
    }
    
    emailjs.send('service_1gvlff1', 'template_s7ritf7',templateParams, 'Dx3PbDbEX2fS5XUhp')
    .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });
}

export default sendConfirmationAccountDeletionEmail;