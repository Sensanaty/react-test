import { useMemo, useState } from "react";
import type { KeyboardEvent } from "react";
import type { TodoItem } from "./TodoItem.tsx";

export type AddTodoProps = {
  lastId: number;
  addNew: (item: TodoItem) => void;
};

export default function AddTodo({ lastId = 0, addNew }: AddTodoProps) {
  const [title, setName] = useState("");
  const [description, setDescription] = useState("");

  const newItem = useMemo<TodoItem>(() => {
    return {
      id: lastId + 1,
      title: title,
      description: description,
      isChecked: false,
    };
  }, [lastId, title, description]);

  function keyDown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      if (!title) {
        alert("You must fill in a title");
        return;
      }

      addNew(newItem);
    }
  }

  return (
    <form className="mb-4 flex flex-col" onSubmit={(e) => e.preventDefault()}>
      <div className="mb-3 flex w-fit flex-col">
        <label htmlFor="title" className="mb-1.5 cursor-pointer font-bold">
          Title
        </label>

        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => keyDown(e)}
          className="rounded-md px-2 py-1 text-black"
        />
      </div>

      <div className="flex w-fit flex-col">
        <label
          htmlFor="description"
          className="mb-1.5 cursor-pointer font-bold"
        >
          Description
        </label>

        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={(e) => keyDown(e)}
          className="rounded-md px-2 py-1 text-black"
        />
      </div>
    </form>
  );
}
