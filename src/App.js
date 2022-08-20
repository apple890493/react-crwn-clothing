import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/home.component";

function Shop() {
  return (
    <h1> I am shop page!</h1>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} >
        <Route path="shop" element={<Shop />}></Route>
      </Route>
    </Routes>
  )
}

export default App;
