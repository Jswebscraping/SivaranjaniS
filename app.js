const puppeteer = require("puppeteer")
const mongo = require("mongodb").MongoClient

const url = "mongodb://localhost:27017"
let db, jobs

mongo.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) {
      console.error(err)
      return
    }
    db = client.db("jobs")
    jobs = db.collection("jobs")

    //....
  }