const mongoose = require("mongoose");
const itemModel = mongoose.model("items");
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  app.post("/api/item", requireLogin, async (req, res) => {
    const {
      item_code,
      item_name,
      item_factory,
      item_color,
      item_skin,
      item_price,
      item_remarks,
      item_type: { itemTypeId, itemTypeName },
      image
    } = req.body;

    const found = await itemModel.findOne({
      item_code
    });

    if (!found) {
      await itemModel({
        item_code,
        item_name,
        item_factory: item_factory ? item_factory : "",
        item_color: item_color ? item_color : "",
        item_skin: item_skin ? item_skin : "",
        item_price,
        item_qty: 0,
        item_qty_PTY: 0,
        item_remarks: item_remarks ? item_remarks : "",
        itemTypeId,
        itemTypeName,
        image: image ? image : null,
        RecordIdBy: req.user._id,
        RecordNameBy: req.user.firstName,
        RecordDate: Date.now(),
        LastModifyById: req.user._id,
        LastModifyByName: req.user.firstName,
        LastModifyDate: Date.now()
      }).save();

      res.send({});
    } else {
      res.status(403).send();
    }
  });

  app.get("/api/item", requireLogin, async (req, res) => {
    const item = await itemModel.find({});

    res.send(item);
  });

  app.post("/api/item/edit/:id", requireLogin, async (req, res) => {
    const {
      // item_code,
      item_name,
      item_factory,
      item_color,
      item_skin,
      item_price,
      item_remarks,
      item_type: { itemTypeId, itemTypeName },
      image
    } = req.body;

    await itemModel
      .updateOne(
        {
          _id: req.params.id
        },
        {
          $set: {
            // item_code,
            item_name,
            item_factory: item_factory ? item_factory : "",
            item_color: item_color ? item_color : "",
            item_skin: item_skin ? item_skin : "",
            item_price,
            item_remarks: item_remarks ? item_remarks : "",
            itemTypeId,
            itemTypeName,
            image: image ? image : null,
            LastModifyById: req.user._id,
            LastModifyByName: req.user.firstName,
            LastModifyDate: Date.now()
          }
        }
      )
      .exec();

    res.send();
  });

  app.delete("/api/item/:id", requireLogin, async (req, res) => {
    await itemModel.findByIdAndRemove(req.params.id);

    res.send();
  });

  app.get("/api/item/:item_code", requireLogin, async (req, res) => {
    const item = await itemModel.findOne({ item_code: req.params.item_code });

    res.send(item);
  });

  app.put("/api/item/stock/:id", requireLogin, async (req, res) => {
    const { qty, stock_status } = req.body;

    await itemModel
      .updateOne(
        {
          _id: req.params.id
        },
        { $inc: { item_qty: stock_status === 1 ? qty : qty * -1 } },
        {
          $set: {
            LastModifyById: req.user._id,
            LastModifyByName: req.user.firstName,
            LastModifyDate: Date.now()
          }
        }
      )
      .exec();

    res.send();
  });
};
