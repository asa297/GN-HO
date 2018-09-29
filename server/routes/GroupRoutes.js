const mongoose = require("mongoose");
const GroupModel = mongoose.model("groups");
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  app.get("/api/group", requireLogin, async (req, res) => {
    //1
    const { priority } = req.user;
    switch (priority) {
      case 1:
        group_form = await GroupModel.find({});
        break;
      default:
        const ip =
          req.headers["x-forwarded-for"] ||
          req.connection.remoteAddress ||
          req.socket.remoteAddress ||
          (req.connection.socket ? req.connection.socket.remoteAddress : null);
        group_form = `Your Permeission is not valid : The System will record your ip address (${ip})`;
        break;
    }

    res.send(group_form);
  });
};
