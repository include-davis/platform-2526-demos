'use client'
import { useState } from "react";

export default function Counter() {
    const [count, setCount] = useState<number>(0);

	return(
		<div>
            <h2>Counter</h2>
			<p>I have been clicked {count} times</p>
            <button onClick={() => setCount(prevCount => prevCount + 1)}>
                Click me!
            </button>
        </div>
    );
}
