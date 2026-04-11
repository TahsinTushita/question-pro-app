import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, TodoList, CreateForm, PreviewForm, NotFound } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todos" element={<TodoList />} />
        <Route path="/form-builder" element={<CreateForm />} />
        <Route path="/form-preview" element={<PreviewForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
