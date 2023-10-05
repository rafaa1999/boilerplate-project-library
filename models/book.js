const mongoose = require("../mongo.config");

if (!Object.keys(mongoose).length) return;

const BooksSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    comments: [String],
  },
  { timestamps: { createdAt: "submit_date" } }
);

const BooksModel = mongoose.model("Books", BooksSchema);
module.exports = BooksModel;
