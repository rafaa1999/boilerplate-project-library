/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";
const Books = require("../models/book");

module.exports = function (app) {
  app
    .route("/api/books")
    .get(async function (req, res) {
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      const books = await Books.find();
      if (!books) {
        res.json([]);
      } else {
        const formatData = books.map((elm) => {
          return {
            _id: elm._id,
            title: elm.title,
            comments: elm.comments,
            commentcount: elm.comments.length,
          };
        });
        res.json(formatData);
      }
    })

    .post(async function (req, res) {
      let title = req.body.title;
      //response will contain new book object including atleast _id and title
      if (!title) {
        res.send("missing required field title");
        return;
      }
      const new_book = Books({ title, comments: [] });
      try {
        await new_book.save();
        res.json({ _id: new_book._id, title: new_book.title });
      } catch (err) {
        res.send(err);
      }
    })

    .delete(async function (req, res) {
      //if successful response will be 'complete delete successful'
      try {
        await Books.deleteMany();
        res.send("complete delete successful");
      } catch (err) {
        res.send(err);
      }
    });

  app
    .route("/api/books/:id")
    .get(function (req, res) {
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })

    .post(function (req, res) {
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
    })

    .delete(function (req, res) {
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
};
