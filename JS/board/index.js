var express = require("express");
var mysql2 = require("mysql2");
var multer = require("multer");
var cookieparser = require("cookie-parser");
var uploadMW = multer({
  dest: "upload",
});
var bcrypt = require("bcrypt");
var server = express();
var dbPool = mysql2.createPool({
  host: "localhost",
  user: "student_kth",
  password: "xogus123",
  database: "student_kth",
  connectionLimit: "10",
});

server.use(express.static("static"));
server.use(express.urlencoded({ extended: true }));
server.use(cookieparser());
server.set("view engine", "ejs");
server.set("views", "ejs");
server.use(function (req, res, next) {
  if (req.cookies.sess_id) {
    var sess_id = req.cookies.sess_id;

    dbPool.query(
      `select * from sessions where sess_id=${sess_id}`,
      function (err, result) {
        if (result.length == 0) {
          res.clearCookie("sess_id");
          return res.redirect("/");
        } else {
          var data = JSON.parse(result[0].data);
          res.locals.user = data.user;
        }
      }
    );
  } else {
    res.locals.user = null;
  }
  next();
});
server.get(
  "/delete",
  (req, res, next) => {
    if (req.cookies.sess_id) {
      next();
    } else {
      return res.redirect("/login");
    }
  },
  function (req, res) {
    var sess_id = req.cookies.sess_id;
    dbPool.query(
      `select * from sessions where sess_id=${sess_id}`,
      function (err, result) {
        if (result.length > 0) {
          var data = JSON.parse(result[0].data).user;
          dbPool.query(
            `delete from users where nickname="${data.nickname}"`,
            function (err, result) {
              res.clearCookie("sess_id");

              return res.redirect("/");
            }
          );
        } else {
          res.clearCookie("sess_id");
          return res.redirect("/");
        }
      }
    );
  }
);
server.get(
  "/edit",
  (req, res, next) => {
    if (req.cookies.sess_id) {
      next();
    } else {
      return res.redirect("/login");
    }
  },
  function (req, res) {
    var sess_id = req.cookies.sess_id;
    dbPool.query(
      `select * from sessions where sess_id=${sess_id}`,
      function (err, result) {
        if (result.length > 0) {
          var data = JSON.parse(result[0].data).user;
          return res.render("edit", { data });
        } else {
          res.clearCookie("sess_id");
          return res.redirect("/");
        }
      }
    );
  }
);
server.post(
  "/edit",
  (req, res, next) => {
    if (req.cookies.sess_id) {
      next();
    } else {
      return res.redirect("/login");
    }
  },
  function (req, res) {
    var changeNick = req.body.nickname;
    var old = req.body.old;
    console.log(old);
    console.log(changeNick);
    if (old != changeNick) {
      dbPool.query(
        `select * from users where nickname="${changeNick}"`,
        function (err, result) {
          if (result.length > 0) {
            return res.send("다른 사용자가 쓰고있는 이름입니다.");
          } else {
            dbPool.query(
              `update users set nickname="${changeNick}" where nickname="${old}"`,
              function (err, result) {
                res.clearCookie("sess_id");
                return res.redirect("/logout");
              }
            );
          }
        }
      );
    }
  }
);
server.get(
  "/logout",
  (req, res, next) => {
    if (req.cookies.sess_id) {
      next();
    } else {
      return res.redirect("/login");
    }
  },
  function (req, res) {
    res.clearCookie("sess_id");
    return res.redirect("/");
  }
);
server.get(
  "/join",
  (req, res, next) => {
    if (!req.cookies.sess_id) {
      next();
    } else {
      return res.redirect("/");
    }
  },
  function (req, res) {
    res.render("join", { errM: "" });
  }
);
server.post(
  "/join",
  (req, res, next) => {
    if (!req.cookies.sess_id) {
      next();
    } else {
      return res.redirect("/");
    }
  },
  function (req, res) {
    var { password1, password2, nickname } = req.body;

    dbPool.query(
      `select * from users where nickname="${nickname}"`,
      function (err, dbres) {
        if (dbres.length > 0) {
          return res.render("join", { errM: "nickname is already taken" });
        } else {
          if (password1 !== password2) {
            return res.render("join", { errM: "confirm password" });
          } else {
            var password = "";

            bcrypt.hash(password1, 5, function (err, hash) {
              password = hash;
              dbPool.query(
                `insert into users set nickname=?, password=?`,
                [nickname, password],
                function (err, result) {
                  return res.redirect("/login");
                }
              );
            });
          }
        }
      }
    );
  }
);
server.get(
  "/login",
  (req, res, next) => {
    if (!req.cookies.sess_id) {
      next();
    } else {
      return res.redirect("/");
    }
  },
  function (req, res) {
    res.render("login", { errM: "" });
  }
);
server.post(
  "/login",
  (req, res, next) => {
    if (!req.cookies.sess_id) {
      next();
    } else {
      return res.redirect("/");
    }
  },
  function (req, res) {
    var { password, nickname } = req.body;
    dbPool.query(
      `select * from users where nickname="${nickname}"`,
      function (err, dbres) {
        if (dbres.length > 0) {
          bcrypt.compare(password, dbres[0].password, function (err, result) {
            if (result) {
              var sess_id = Math.random();
              var data = JSON.stringify({ user: dbres[0] });
              dbPool.query(
                `insert into sessions set sess_id=?, data=?`,
                [sess_id, data],
                function (err, result) {}
              );
              res.cookie("sess_id", sess_id);
              return res.redirect("/");
            } else {
              return res.render("login", { errM: "password is incorrect" });
            }
          });
        } else {
          return res.render("login", { errM: "nickname is not founded" });
        }
      }
    );
  }
);

server.get("/list/:id(board[1-4])", function (req, res) {
  var board = req.params.id;
  var pageNum = parseInt(req.query.page);
  var pageStart = parseInt((pageNum - 1) / 5) * 5 + 1;
  var boardLength, max;
  dbPool.query(
    `select * from ${board} order by regtime desc`,
    function (err, result) {
      boardLength = result.length;
      max = Math.ceil(boardLength / 5);
      for (var i = 0; i < boardLength; i++) {
        if (result[i].regtime == null) continue;
        result[i].regtime = makeDate(result[i].regtime);
      }

      res.render("list", {
        result,
        num: (pageNum - 1) * 5,
        boardLength,
        pageStart,
        max,
        board,
      });
    }
  );
});

server.get("/search", function (req, res) {
  var { subject, board } = req.query;
  if (subject && board) {
    dbPool.query(
      `select * from ${board} where subject like '%${subject}%' order by regtime desc`,
      function (err, result) {
        if (err) console.log(err);
        for (var i = 0; i < result.length; i++) {
          if (result[i].regtime == null) continue;
          result[i].regtime = makeDate(result[i].regtime);
        }
        return res.render("search", { articles: result, board });
      }
    );
  } else return res.render("search", { articles: [] });
});

server.get(
  "/write/:id(board[1-4])",
  (req, res, next) => {
    if (req.cookies.sess_id) {
      next();
    } else {
      return res.redirect("/login");
    }
  },
  function (req, res) {
    res.render("write");
  }
);

server.post(
  "/write/:id(board[1-4])",
  (req, res, next) => {
    if (req.cookies.sess_id) {
      next();
    } else {
      return res.redirect("/login");
    }
  },
  uploadMW.single("attach"),
  function (req, res) {
    var board = req.params.id;
    var { content, subject, author } = req.body;
    if (req.file) {
      var { filename, originalname } = req.file;
      dbPool.query(
        "insert into " +
          board +
          " set subject=?, content=?, author=?, regtime=NOW(), hitcount=0, filename=?, origin=?",
        [subject, content, author, filename, originalname],
        function (err, result) {
          res.redirect(`/list/${board}?page=1`);
        }
      );
    } else {
      dbPool.query(
        "INSERT INTO " +
          board +
          " SET subject=?, content=?, author=?, regtime=NOW(), hitcount=0",
        [subject, content, author],
        function (err, result) {
          if (err) console.log(err);

          res.redirect(`/list/${board}?page=1`);
        }
      );
    }
  }
);
server.get("/read/:id(board[1-4])", function (req, res) {
  var board = req.params.id;
  var num = req.query.num;
  dbPool.query(
    `select * from ${board} where seq = ${num}`,
    function (err, result) {
      var count = result[0].hitcount;
      var seq = result[0].seq;
      dbPool.query(
        `update ${board} set hitcount=${count + 1} where seq=${seq}`,
        function (err, result) {}
      );
      res.render("read", {
        article: result[0],
        board,
        time: makeDate1(result[0].regtime),
      });
    }
  );
});

server.get("/download/:id(board[1-4])", function (req, res) {
  var board = req.params.id;
  var index = req.query.index;
  dbPool.query(
    `select filename, origin from ${board} where seq=${index}`,
    function (err, result) {
      res.attachment(result[0].origin);
      res.sendFile(__dirname + "/upload/" + result[0].filename);
    }
  );
});

server.listen(3000, function () {
  console.log("3000번 포트 서버");
});

function makeDate(date1) {
  var date = date1.toString().split(" ");
  var year, day, month;
  year = date[3];
  day = date[2];
  switch (date[1]) {
    case "Jan":
      month = "01";
      break;
    case "Feb":
      month = "02";
      break;
    case "Mar":
      month = "03";
      break;
    case "Apr":
      month = "04";
      break;
    case "May":
      month = "05";
      break;
    case "June":
      month = "06";
      break;
    case "July":
      month = "07";
      break;
    case "Aug":
      month = "08";
      break;
    case "Sept":
      month = "09";
      break;
    case "Oct":
      month = "10";
      break;
    case "Nov":
      month = "11";
      break;
    case "Dec":
      month = "12";
      break;
  }
  return year + "/" + month + "/" + day;
}
function makeDate1(date1) {
  var date = date1.toString().split(" ");
  var whool = date[4];
  var hour = whool.split(":")[0];
  var min = whool.split(":")[1];
  var sec = whool.split(":")[2];
  return hour + "시 " + min + "분 " + sec + "초";
}
(req, res, next) => {
  if (!req.cookies.sess_id) {
    next();
  } else {
    return res.redirect("/");
  }
};
