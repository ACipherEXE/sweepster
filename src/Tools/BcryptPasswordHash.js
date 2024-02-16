const bcrypt = require('bcryptjs');
//Type in the password you want to hash below
const password = "Test321";
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(password, salt);
console.log(hash);
//View debug console to get hashed password