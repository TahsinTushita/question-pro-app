import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, TodoList, CreateForm, PreviewForm, NotFound } from "./pages";
import {
  HOME_URL,
  TODO_LIST_URL,
  BUILD_FORM_URL,
  PREVIEW_FORM_URL,
  NOT_FOUND_URL,
} from "./List";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={HOME_URL} element={<Home />} />
        <Route path={TODO_LIST_URL} element={<TodoList />} />
        <Route path={BUILD_FORM_URL} element={<CreateForm />} />
        <Route path={PREVIEW_FORM_URL} element={<PreviewForm />} />
        <Route path={NOT_FOUND_URL} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
