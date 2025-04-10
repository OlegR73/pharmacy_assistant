import { useRef, useEffect, useState } from "react";
import askQuestion from "../api/openAiRequest.js";

const baseURL = process.env.REACT_APP_API_URL;

export default function Chatbox_container() {
  const input = useRef();
  const submit = useRef();
  const [value, setValue] = useState();
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitHandle(e) {
    e.preventDefault();
    setValue(input.current.value);
    input.current.value = "";
    input.current.focus();
    submit.current.value = "Waiting an answer...";
  }

  useEffect(() => {
    input.current.focus();
  }, [answer]);

  useEffect(() => {
    input.current.focus();

    if (!value) return;
    setLoading(true);
    askQuestion(value)
      .then((res) => setAnswer(res))
      .catch((err) => {
        console.error(err);
        setAnswer("Request error.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [value]);

  useEffect(() => {
    //fetch("http://localhost:5000/api/messages")
    fetch(`/api/messages`)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch((err) => console.error("Fetch error:", err) )
  }, [])

  return (
    <div className="container">
      <form action="" onSubmit={submitHandle}>
        <label htmlFor="city">Enter question:</label>
        <input ref={input} type="text" id="city" required />
        <input
          ref={submit}
          className={loading ? "modalButton loading" : "modalButton"}
          type="submit"
          value={loading ? "Waiting an answer..." : "Enter question"}
          disabled={false}
        />
      </form>
      <div className="chat">
       {answer.length > 0 

       ? answer.slice().filter(msg => msg.role !== "system").reverse().map((msg, index) => (msg.role == "assistant" 
        
       ? <div className="answer" key={index}>{msg.content}</div> 

       : <div className="question" key={index}>{msg.content}</div>)) 
       
       : <div>{""}</div>}

        {/* {Array.isArray(answer)
        //   ? answer.map((msg, i) => <div key={i}>{msg.content}</div>)
        //   : answer} */}
      </div>
    </div>
  );
}
