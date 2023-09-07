import emailjs from "emailjs-com";

const sendConfirmationSignUpEmail = (name: string, email: string) => {

    const templateParams = {name, email}
    
    emailjs.send('service_1gvlff1', 'template_qfb65xi',templateParams, 'Dx3PbDbEX2fS5XUhp')
    .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });
}

export default sendConfirmationSignUpEmail;