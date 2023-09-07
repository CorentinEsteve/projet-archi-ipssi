import emailjs from "emailjs-com";

const sendPurchasedConfirmation = (firstName: string, email: string) => {

    const templateParams = {firstName, email}
    
    emailjs.send('service_5gjqnjj', 'template_m9syltb',templateParams,"iRTLaSw8IcBCYIKBz")
    .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });
}

export default sendPurchasedConfirmation;