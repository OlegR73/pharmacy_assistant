import { pool } from "./db.js";
export default function getChat() {
  const result =  pool.query("SELECT * FROM messages");
  console.log(result.rows);
  return result.rows;
}

//getMessages();