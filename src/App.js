import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigtion.component";


function Shop() {
  return (
    <h1> I am shop page!</h1>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} ></Route>
        <Route path="shop" element={<Shop />}></Route>
      </Route>
    </Routes>
  )
}

export default App;
