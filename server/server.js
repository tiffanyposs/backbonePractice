var express = require('express');
var bodyParser = require('body-parser');
var sqlite3 = require("sqlite3").verbose();
var cors = require('cors');

var db = new sqlite3.Database("articles_data.db");
var app = express();

app.use(cors());
app.use(bodyParser.json({ extended: false }));

app.get('/articles', function(req, res) {
  db.all("SELECT * FROM articles", function(err, rows) {
    if(err) { throw err; }
      res.json(rows);
    });
  })

  app.post('/articles', function(req, res) {
    var headline = req.body.headline;
    var content = req.body.content;
    var author = req.body.author;
    console.log("post" + headline)
    db.run("INSERT INTO articles (headline, content, author) VALUES (?, ?, ?)", headline, content, author, function(err) {
      if(err) { throw err; }
        var id = this.lastID; //weird way of getting id of what you just inserted
        db.get("SELECT * FROM articles WHERE id = ?", id, function(err, row) {
          if(err) { throw err; }
            res.json(row);
          });
        });

      });

      app.put('/articles/:id', function(req, res) {
        var id = req.params.id;
        var headline = req.body.headline;
        var content = req.body.content;
        var author = req.body.author;
        db.run("UPDATE articles SET headline = ?, content = ?, author = ? WHERE id = ?", headline, content, author, id, function (err) {
          if(err) { throw err; }
            db.get("SELECT * FROM articles WHERE id = ?", id, function(err, row) {
              if(err) { throw err; }
                res.json(row);
              });
            });
          });

          app.delete('/articles/:id', function(req, res) {
            var id = req.params.id;
            db.run("DELETE FROM articles WHERE id = ?", id, function(err) {
              if(err) { throw err; }
                res.json({deleted: true});
              });
            });

            app.listen(3000);
            console.log('Listening on port 3000');
