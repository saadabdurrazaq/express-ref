const User = require("../../models/UserModel");
const bcrypt = require("bcryptjs");
const auth = require("../../helpers/jwt.js");


async function login({ username, password }) { 
  const user = await User.findOne({ username });

  // synchronously compare user entered password with hashed password
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = auth.generateAccessToken(username);

    // call toJSON method applied during model instantiation
    return { ...user.toJSON(), token };
  }
}

async function register(req, res) { 
  let username = req.user.username;
  const user = await User.findOne({ username }); 

  if (user.role === 'user') {
    return res.status(401).json({
      message: "Only admin and super admin can create user",
    });
  }
  
  User.findOne({ username: req.body.username }).exec((error, user) => {
    if (user) {
      return res.status(400).json({
        message: "Username already registered",
      });
    }
  });

  User.findOne({ email: req.body.email }).exec((error, user) => { 
    if (user) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }
      
    User.estimatedDocumentCount(async (err, count) => {
      if (err) return res.status(400).json({ error });

      const { username, email, password, role } = req.body;
      const salt = bcrypt.genSaltSync(10);
      const _user = new User({
        username,
        email,
        password: bcrypt.hashSync(password, salt),
        role,
      });

      _user.save((error, data) => {
        if (error) {
          return res.json({
            message: 'Oops... Something went wrong!'
          });
        }

        if (data) {
          return res.status(201).json({
            message: "Admin created Successfully..!",
          });
        }
      });

    });
    
  });
}

async function getById(id) {
  const user = await User.findById(id);
  // call toJSON method applied during model instantiation
  return user.toJSON();
}

module.exports = {
  login,
  register,
  getById,
};