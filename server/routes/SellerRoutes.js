const mongoose = require("mongoose");
const SellerModel = mongoose.model("sellers");
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  app.get("/api/seller", requireLogin, async (req, res) => {
    const { priority } = req.user;

    let seller;

    switch (priority) {
      case 1:
        seller = await SellerModel.find({});
        break;
      default:
        const ip =
          req.headers["x-forwarded-for"] ||
          req.connection.remoteAddress ||
          req.socket.remoteAddress ||
          (req.connection.socket ? req.connection.socket.remoteAddress : null);
        seller = `Your Permeission is not valid : The System will record your ip address (${ip})`;
        break;
    }
    res.send(seller);
  });
};
