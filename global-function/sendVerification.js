const nodemailer = require('nodemailer');

const sendEmail = (recieveEmail, verificationCode, subTitle) => {
    console.log('Send mail...')
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'cvducduy2222@gmail.com', 
            pass: 'bgod etsu joap zess'
        }
    });

    const mailOptions = {
        from: 'Duc Duy Shop', 
        to: recieveEmail, 
        subject: subTitle,
        html: `
        <h2>Chào bạn Cao Vũ Đức Duy</h2>
        <h5>Email: <strong>${recieveEmail}</strong></h5>
        <p>Bạn đã đăng ký tài khoản thành công. Vui lòng nhấn vào <a href="http://localhost:7000/users/verify?email=${recieveEmail}&code=${verificationCode}">đây</a> để xác nhận tài khoản của bạn.
        </p>`
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
}

module.exports = { sendEmail }