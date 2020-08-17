const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const AWS = require("aws-sdk");

var MongoClient = require("mongodb").MongoClient;

const User = require("./models/User");
const Post = require("./models/Post");

require("./passportConfig")(passport);

const app = express();

require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch((err) => {
    console.error("Error connecting to Mongo", err);
  });

// Express body parser
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);
// Express session

app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser("secretcode"));

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});
const authCheck = function (req, res, next) {
  const token = req.headers.authorization;
  try {
    const user = jwt.verify(token, process.env.JWT_KEY);
    req.user = user;
    next();
  } catch (error) {
    req.user == undefined;
    next();
  }
};

app.post("/saveSetting", authCheck, (req, res) => {
  let {
    email,
    password,
    country,
    birthday,
    username,
    settings,
    bio,
  } = req.body;

  MongoClient.connect(process.env.MONGO_URL, function (err, db) {
    if (err) throw err;
    var dbo = db.db("InstaDB");
    var myquery = { email: req.body.email }; //aliye sor _id: req.user.id
    var newvalues = {
      $set: {
        country: req.body.country,
        birthday: req.body.birthday,
        username: req.body.username,
        bio: req.body.bio,
        settings: {
          publicProfile: req.body.publicProfile,
          pushNotifications: req.body.pushNotifications,
        },
      },
    };
    Users.update(myquery, newvalues, function (err, res) {
      if (err) throw err;
      res.send("User updated");
    });
  });
});

app.get("/user", (req, res) => {
  res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});
app.get("/profile/:username", function (req, res) {
  User.findOne({ username: req.params.username }, async (err, user) => {
    if (err) {
      return res.json({ error: "generic error" });
    }
    Post.find({ userId: user._id }, function (err, posts) {
      res.json({
        ...user.settings,
        email: user.email,
        username: user.username,
        country: user.country,
        birthday: user.birthday,
        bio: user.bio,
        posts: posts,
      });
    });
  });
});

app.post("/userMainPage", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
        // res.redirect("/ddeduserMainPage")
      });
    }
  })(req, res, next);
});

app.post("/json/register", async function (req, res) {
  // res.send(req.body);

  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    email,
    password: hashedPassword,
    username: req.body.email.toLowerCase(),
    country: req.body.country,
    birthday: req.body.birthday,
  });

  try {
    await newUser.save();
    res.json({ success: true });
  } catch (e) {
    if (e.code === 11000) {
      res.json({ error: "this email is already existed" });
    } else {
      res.json({ error: "There is an unexpected error please try again" });
    }
  }
});

app.post("/json/login", async function (req, res) {
  // res.send(req.body);
  const { email, password } = req.body;
  User.findOne({ email }, async (err, user) => {
    if (err) {
      return res.json({ error: true, message: "an error occured" });
    }

    if (!user) {
      return res.json({ error: true, message: "Email combination is wrong" });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        res.json({ error: true, message: "an error occured" });
      }
      if (result === true) {
        const token = jwt.sign(
          { id: user._id, email: user.email },
          process.env.JWT_KEY,
          { expiresIn: 10000 }
        );

        return res.json({ success: true, token });
      } else {
        return res.json({ error: true, message: "Email combination is wrong" });
      }
    });
  });
});

app.get("/setting", authCheck, function (req, res) {
  if (!req.user) {
    return res.status(401).json({ error: "unAuthorized" });
  }

  User.findOne({ _id: req.user.id }, async (err, user) => {
    if (err) {
      return res.json({ error: "generic error" });
    }

    res.json({
      ...user.settings,
      email: user.email,
      username: user.username.toLowerCase(),
      country: user.country,
      birthday: user.birthday,
      bio: user.bio,
    });
  });
});
app.get("/getPosts", authCheck, function (req, res) {
  if (!req.user) {
    return res.status(401).json({ error: "unAuthorized" });
  }

  MongoClient.connect(process.env.MONGO_URL, function (err, db) {
    var dbo = db.db("InstaDB");
    dbo
      .collection("posts")
      .find({ userId: req.user.id })
      .toArray(function (err, result) {
        if (err) throw err;

        res.send(result);

        // Post.find({}).toArray, async (err, post) => {
        //   if (err) {
        //     return res.json({ error: "generic error" });
        //   }

        //   console.log(req.post);

        //   res.json({
        //     ...post,
        //   });
      });
  });
});
app.post("/getUsers", function (req, res) {
  User.find({
    username: { $regex: req.body.keyword.toLowerCase(), $options: "i" },
  })
    .limit(20)
    .exec(function (err, users) {
      res.json(users);
    });
});
app.post("/postImage", authCheck, async (req, res) => {
  MongoClient.connect(process.env.MONGO_URL, function async(err, db) {
    if (!req.body.image) {
      return res.json({ error: true, message: "Please upload an image" });
    }

    const image = req.body.image.split(",")[1];
    const image2 = req.body.image;
    const type = req.body.type;
    const extension = req.body.extension;
    const pathFile2 = `uploads/${req.user.id}-${Date.now()}.${extension}`;
    const pathFile = `client/public/${pathFile2}`;
    const buffer = Buffer.from(req.body.image, "base64");
    const BUCKET = "photogram-photos";

    const imageRemoteName = `catImage_${new Date().getTime()}.png`;

    const s3 = new AWS.S3({
      accessKeyId: process.env.ACCESS_KEY,
      secretAccessKey: process.env.SECRET_KEY,
    });
    // return res.json(s3);
    s3.putObject(
      {
        Bucket: BUCKET,
        Key: pathFile2,
        Body: Buffer.from(
          req.body.image.replace(/^data:image\/\w+;base64,/, ""),
          "base64"
        ),

        ACL: "public-read",
        ContentEncoding: "base64",
        ContentType: type,
      },
      function (err, resp) {
        if (err) {
          return res.json({
            error: true,
            message: "File could not be uploaded",
          });
        }
        console.log("Successfully uploaded package.");
        const s3Path = `https://photogram-photos.s3.ca-central-1.amazonaws.com/${pathFile2}`;
        var dbo = db.db("InstaDB");
        var myobj = {
          caption: req.body.caption,
          filePath: s3Path,
          userId: req.user.id,
        };
        const newPost = new Post(myobj);
        newPost.save(function (err, post) {
          if (err) {
            return res.json({
              error: true,
              message: "File could not be uploaded",
            });
          }
          console.log("1 document inserted to DB");
          db.close();
          res.json({
            error: false,
            message: "Success upload an image please refresh the page",
          });
        });
      }
    );
  });
});

app.get("/session", authCheck, function (req, res) {
  if (!req.user) {
    return res.status(401).json({ error: "unAuthorized" });
  }

  User.findOne({ _id: req.user.id }, async (err, user) => {
    if (err) {
      return res.json({ error: "generic error" });
    }
    res.json(user);
  });
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
