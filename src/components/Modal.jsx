import { useRef, useEffect, useState } from "react";
import askQuestion from "../api/openAiRequest.js";

export default function Modal({ open, setOpen }) {
  const input = useRef();
  const submit = useRef();
  const [value, setValue] = useState();
  const [answer, setAnswer] = useState("");

  function submitHandle(e) {
    e.preventDefault();
    setValue(input.current.value);
    input.current.value = "";
    input.current.focus();
  }

  useEffect(() => {
    if (!value) return;
    askQuestion(value)
      .then((res) => setAnswer(res))
      .catch((err) => {
        console.error(err);
        setAnswer("Ошибка запроса");
      });
  }, [value]);

  return (
    <dialog open={open}>
      <p
        className="closeModal"
        onClick={() => {
          setOpen(!open);
        }}
      >
        X
      </p>
      <form action="" onSubmit={submitHandle}>
        <label htmlFor="city">Enter question:</label>
        <input ref={input} type="text" id="city" required />
        <input
          ref={submit}
          className="modalButton"
          type="submit"
          value="Submit"
          disabled={false}
        />
      </form>
      <p>{value}</p>
      <div className="answer">{answer}</div>
    </dialog>
  );
}
