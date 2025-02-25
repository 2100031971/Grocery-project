import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <Header />
      <AppRoutes />
    </>
  );
}

export default App;
