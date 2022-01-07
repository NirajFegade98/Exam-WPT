const mysql = require("mysql");
const Promise = require("bluebird");
const { add } = require("nodemon/lib/rules");
Promise.promisifyAll(require("mysql/lib/Connection").prototype);

const dbinfo = {
  host: "localhost",
  user: "root",
  password: "cdac",
  database: "wptexam",
};

async function connectionCheck() {
  const connection = mysql.createConnection(dbinfo);
  await connection.connectAsync();
  console.log("connected");
  await connection.endAsync();
}

async function selectAllUser() {
  const connection = mysql.createConnection(dbinfo);
  await connection.connectAsync();
  let sql = `select * from messagetable`;
  const list = await connection.queryAsync(sql, []);
  await connection.endAsync();
  // console.log(list);
  return list;
}

async function addUser(user) {
  const connection = mysql.createConnection(dbinfo);
  await connection.connectAsync();
  let sql = `insert into messagetable(username,message)values(?,?)`;
  await connection.queryAsync(sql, [user.username, user.message]);
  await connection.endAsync();
}

selectAllUser();

module.exports = { addUser, selectAllUser };
