import { createStore } from "solid-js/store";

interface User {
  username: string;
  createdAt: string;
}

interface Store {
  authToken: string | null;
  user: User | null;
}

const [store, setStore] = createStore<Store>({
  authToken: null,
  user: null,
});

export { store, setStore };
