function mailsender(senderUser, senderPass, receivers,text) {
    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: senderUser,
            pass: senderPass
        }
    });

    receivers.forEach(receiver => {
        var mailOptions = {
            from: 'youremail@gmail.com',
            to: receiver,
            subject: 'You are invited to work on this project',
            text: text
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    })
}

// let receivers=["pprateek180@gmail.com","billmicro8.1@gmail.com"]
// sendMail("prateek007.purohit@gmail.com","anotfytgsjtcmhmk",receivers)
module.exports=mailsender