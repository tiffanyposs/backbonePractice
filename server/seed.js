var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("articles_data.db");

db.run("INSERT INTO articles (headline, content, author) VALUES (?, ?, ?), (?, ?, ?), (?, ?, ?)",
  'Hello', 'I am saying hello.', 'Me!',
  'Bonjour', 'Je suis dire bonjour', 'Moi!',
  'Bongiorno', 'Io sono dire bongiorno', 'Mio!',
  function(err) {
    if (err) {
      throw err;
    }
  }
);
