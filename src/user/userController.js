const userService = require("./userServices");

const createUserControllerFunc = async (req, res) => {
  try {
    console.log(req.body);
    var result = await userService.createUserDBService(req.body);

    if (result.status) {
      res.send({ status: true, message: result.msg });
    } else {
      res.send({ status: false, message: result.msg });
    }
  } catch (err) {
    res.send({ status: false, message: err.msg });
  }
};

const loginUserControllerFunc = async (req, res) => {
  let result = null;
  try {
    result = await userService.loginuserDBService(req.body);
    if (result.status) {
      res.send({ status: true, message: result.msg });
    } else {
      res.send({ status: false, message: result.msg });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: false, message: error.msg });
  }
};

const searchUserDBServiceFunc = async (req, res) => {
  let result = null;
  try {
    result = await userService.searchUserDBService(req.body);
    if (result.status) {
      res.send({ status: true });
    } else {
      res.send({ status: false });
    }
  } catch (err) {
    res.send({ status: false });
  }
};

const deleteUserDBServiceFunc = async (req, res) => {
    let result = null;
    try {
        result = await userService.deleteUserDBService(req.body);
        if (result.status) {
            res.send({ status: true, msg: result.msg});
          } else {
            res.send({ status: false, msg: result.msg });
          }
    } catch (err) {
        res.send ({status: false, msg: err.msg})
    }
}

module.exports = {
  createUserControllerFunc,
  loginUserControllerFunc,
  searchUserDBServiceFunc,
  deleteUserDBServiceFunc
};
