const bcrypt = require("bcrypt");

 const ComparePassword = (password, bddHashedPassword) => {
    return bcrypt.compare(password, bddHashedPassword)
  }
  
 const HashPassword = (password) => {
    return bcrypt.hash(password, 10)
  }

 module.exports = {ComparePassword, HashPassword}