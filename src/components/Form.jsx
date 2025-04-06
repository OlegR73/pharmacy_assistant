import { useState } from "react";

export default function Form({ name, onChange, disabled }) {
  return (
    <form action="">
      <input type="text" onChange={onChange} />
      <button disabled={disabled}>Sent</button>
    </form>
  );
}
