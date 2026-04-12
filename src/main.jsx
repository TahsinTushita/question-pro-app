import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// import { store } from "./store.js";
// import { Provider } from "react-redux";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { queryClient } from "./react-query/queryClient.js";
import { persister } from "./react-query/persister.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <Provider store={store}> */}
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
      // onSuccess={() => {
      //   queryClient.resumePausedMutations();
      // }}
    >
      <App />
    </PersistQueryClientProvider>
    {/* </Provider> */}
  </StrictMode>,
);
