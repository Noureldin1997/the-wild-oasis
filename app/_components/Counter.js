"use client";
import { useState } from "react";

function Counter({ users }) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>There are {users.length} users</h1>
      <button onClick={() => setCount(() => count + 1)}>{count}</button>;
    </div>
  );
}

export default Counter;
