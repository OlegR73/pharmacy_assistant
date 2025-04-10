export default async function createMsgTable() {

   const query =  `CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        role TEXT CHECK(role IN ('user', 'assistant', 'system')),
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
    )`; 
}
//chat_id SERIAL,
