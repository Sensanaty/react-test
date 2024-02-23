import TodoItem from "./components/TodoItem.tsx";
import AddTodo from "./components/AddTodo.tsx";
import type { TodoItem as TodoItemType } from "./components/TodoItem.tsx";
import { useMemo, useState } from "react";

function App() {
  const [todoItems, setTodoItems] = useState<TodoItemType[]>([]);

  const lastId = useMemo(() => {
    return todoItems[todoItems?.length - 1]?.id || 0;
  }, [todoItems]);

  function toggleItem(id: number) {
    const toggledItem = todoItems.find((item) => item.id === id);

    if (toggledItem) {
      toggledItem.isChecked = !toggledItem.isChecked;

      setTodoItems([...todoItems]);
    }
  }

  function addNewItem(item: TodoItemType) {
    setTodoItems([...todoItems, item]);
  }

  function deleteItem(id: TodoItemType["id"]) {
    setTodoItems(todoItems.filter((item) => item.id !== id));
  }

  return (
    <div className="mt-4 flex h-full flex-col items-center px-4 py-2">
      <AddTodo lastId={lastId} addNew={addNewItem} />

      <ul className="flex w-1/2 flex-col">
        {todoItems.map((item) => {
          return (
            <TodoItem
              item={item}
              key={item.id}
              toggleItem={() => toggleItem(item.id)}
              deleteTodo={() => deleteItem(item.id)}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default App;
