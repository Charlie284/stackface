import { Routes, Route, Link } from "react-router-dom";
import Controller from "./Controller";
import Page0, { css as Page0Css, title as Page0Title } from "./Page0";
export default function App() {
  return (
    <Routes>
      <Route
        path="/index.html"
        element={<Controller Page={Page0} css={Page0Css} title={Page0Title} />}
      />
      <Route
        path="/"
        element={<Controller Page={Page0} css={Page0Css} title={Page0Title} />}
      />
      <Route
        path="*"
        element={
          <main className="p-8">
            <h1>Page not found</h1>
            <Link to="/">Home</Link>
          </main>
        }
      />
    </Routes>
  );
}
