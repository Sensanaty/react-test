import type { MouseEvent } from "react";

export type TodoItem = {
  id: number;
  title: string;
  description: string;
  isChecked: boolean;
};

export type TodoItemProps = {
  item: TodoItem;
  toggleItem: () => void;
  deleteTodo: () => void;
};

export default function TodoItem({
  item = {
    id: 0,
    title: "Default title",
    description: "Default description",
    isChecked: false,
  },
  toggleItem,
  deleteTodo,
}: TodoItemProps) {
  function deleteItem(event: MouseEvent) {
    event.stopPropagation();

    deleteTodo();
  }

  return (
    <li
      className={`mb-2 flex cursor-pointer flex-row rounded-lg bg-neutral-900 p-4 transition-colors last:mb-0 hover:bg-neutral-950`}
      onClick={toggleItem}
    >
      <input type="checkbox" checked={item.isChecked} onChange={toggleItem} />
      <h1>{item.id}</h1>
      <h2>{item.title}</h2>

      <button
        className="z-10 ml-auto rounded-lg px-2 py-1.5 transition-colors hover:bg-neutral-700"
        onClick={(e) => deleteItem(e)}
      >
        Delete
      </button>
    </li>
  );
}
