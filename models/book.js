const mongoose = require("../mongo.config");

if (!Object.keys(mongoose).length) return;

const BooksSchema = mongoose.Schema(
  {
    title: String,
    commentcount: Number,
    comments: [String],
  },
  { timestamps: { createdAt: "submit_date" } }
);

const BooksModel = mongoose.model("Books", BooksSchema);
module.exports = BooksModel;
