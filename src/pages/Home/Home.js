import { signal, useSignal } from "@preact/signals-react";

const todos = signal([{ text: "Buy groceries" }, { text: "Walk the dog" }]);
const text = signal(""); // Lưu trữ nội dung nhập từ ô input

function Home() {
    useSignal();
    const onInput = (event) => {
        text.value = event.target.value;
    };

    function addTodo() {
        todos.value = [...todos.value, { text: text.value }];
        text.value = ""; // Xóa nội dung ô nhập sau khi thê
    }

    function removeTodo(todo) {
        todos.value = todos.value.filter((t) => t !== todo);
    }

    return (
        <>
            <input value={text} onChange={onInput} />
            <button onClick={addTodo}>Add</button>
            <ul>
                {todos.value.map((todo, index) => (
                    <li key={index}>
                        {todo.text}{" "}
                        <button onClick={() => removeTodo(todo)}>❌</button>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Home;
