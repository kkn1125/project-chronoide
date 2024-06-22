import { Route, Routes } from "react-router-dom";
import Layout from "./components/layouts/Layout";
import Home from "./components/templates/Home";
import About from "./components/templates/About";

function App() {
  return (
    <Routes>
      <Route path="" element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
