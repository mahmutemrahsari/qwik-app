import { component$, useSignal, useStore } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  const count = useSignal(0);
  const state = useStore({ count: 0 });
  const store = useStore(
    {
      nested: {
        fields: { are: "also tracked" },
      },
      list: ["item 1"],
    }
    // { deep: false } //only track the top-level properties.
  );

  console.log(count.value);
  return (
    <>
      <h1>Hi 👋</h1>

      <button onClick$={() => count.value++}>
        {" "}
        INCREMENT by using useSignal {count.value}
      </button>
      <button onClick$={() => state.count++}>
        {" "}
        INCREMENT by using useStore {state.count}
      </button>

      <div>
        <p>{store.nested.fields.are}</p>
      </div>

      <div>
        <button
          onClick$={() => {
            store.list.push(`Item ${store.list.length}`);
          }}
        >
          Add to list
        </button>
        <ul>
          {store.list.map((item, index) => (
            <li key={`items-${index}`}>{item}</li>
          ))}
        </ul>
        <p>List Length: {store.list.length}</p>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
