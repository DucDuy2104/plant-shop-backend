const crypto = require("crypto");

function generateVerificationCode(size = 12){
    console.log('Render code...')
    return crypto.randomBytes(size).toString("hex");
}

module.exports = {generateVerificationCode}