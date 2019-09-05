const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const GadgetSchema = new Schema({
  name: String,
  release_date: Date,
  by_company: String,
  price: Number,
});

const Gadget = model('gadgets', GadgetSchema);

module.exports = { GadgetSchema, Gadget };
