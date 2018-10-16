const express = require("express");

const router = express.Router();
const User = require("../dataAccess/userModel");
// User.sync({ force: true });

const addNewUser = async function(name, imageUrl) {
  let user3 = await User.create({
    u_name: name,
    u_imgUrl: imageUrl
  });
};
const addRelation = async function(parentId, name, imageUrl) {
  let Parentuser = await User.findOne({ where: { id: parentId } });
  let newUser = await User.create({
    u_name: name,
    u_imgUrl: imageUrl
  });
  let combain = await Parentuser.addChild(newUser);
  let results = await User.find({
    where: { id: parentId },
    include: [
      {
        model: User,
        as: "Child",
        include: [
          { model: User, as: "Child", include: [{ model: User, as: "Child" }] }
        ]
      }
    ]
  });
  return results;
};

router.get("/users/:name", function(req, res, next) {
  let word = req.params.name;
  User.findAll({
    where: { u_name: word },
    include: [
      { model: User, as: "Child", include: [{ model: User, as: "Child" }] }
    ]
  })
    .then(u => {
      res.send(u);
    })
    .error(err => {
      console.log(err);
    });
});
router.post("/users", function(req, res) {
  let { name, imageUrl } = req.body.data;
  addNewUser(name, imageUrl);
});
router.post("/addRelation", function(req, res) {
  let { parentId, name, imageUrl } = req.body.data;
  addRelation(parentId, name, imageUrl).then(data => {
    res.send(data);
  });
});

module.exports = router;
