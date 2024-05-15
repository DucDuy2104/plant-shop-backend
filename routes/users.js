var express = require('express');
var router = express.Router();
var userController =  require('../controller/users/UserController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 1. register
// method: POST
// url: http://localhost:7000/users/register
// response: {status: ,message: ,user: }
router.post('/register', async (req, res, next)=> {
  try {
    const {name, email, password} = req.body
    if(!name || !email || !password) {
      return res.status(404).json({status: false, message: 'Invalid infomation!'})
    }
    const user  =  await userController.register(name, email, password)
    return res.status(200).json({status: true, message: 'Register successful!', user})
  } catch (error) {
    console.log('Error: ', error.message)
    return res.status(500).json({status: false, message: 'Register failure!'})
  }
})

// 2. login
// method: POST
// url: http://localhost:7000/users/login
// response: {status: ,message: ,user: }
router.post('/login',async (req, res, next) => {
  try {
    const {email, password} =  req.body
    if(!email || !password) {
      return res.status(404).json({status: false, message: 'Invalid infomation'})
    }
    var user = await userController.login(email, password)
    res.status(200).json({status: true, message: 'Login successful!', user})
  } catch (error) {
    console.log('Error: ', error.message)
    return res.status(500).json({status: false, message: 'Login failure!'})
  }
})

// 3. API cập nhật tài khoản
// method: post
// url: http://localhost:7000/update
// kết quả: cập nhật thành công hoặc thất bại
router.post('/update',async (req, res, next)=> {
  try {
    const {email, name, address, phone, image} =  req.body
    if(!email) {
      return res.status(404).json({status: false, message: 'Email not found'})
    }
    const result =  await userController.updateUser(email, name, address,phone, image)
    return res.status(200).json({status: true, message: "Update successful", data: result})
  } catch (error) {
    console.log('Error: ', error.message)
    return res.status(500).json({status: false, message: 'Update failure!'})
  }
})

// 4. API xác thực email
// method: get
// url: http://localhost:7000/verify?email=abc@gmail&code=123
// kết quả: xác thực thành công hoặc thất bại
router.get('/verify', async(req, res, next)=> {
  try {
    const {email, code} =  req.query
    if(!email ||  !code) {
      return res.status(404).json({status: false, message: 'Invalid infomation'})
    }
    const result =  await userController.verifyUser(email, code)
    if(!result.verified) {
      return res.status(500).json({status: false, message: 'Verify failure'})
    }
    return res.status(200).json({status: true, message: 'Verify successful'})
  } catch (error) {
    console.log('Error: ', error.message)
    return res.status(500).json({status: false, message: 'Verify failure!'})
  }
})

module.exports = router;
