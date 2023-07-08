import "./App.css";
import Benefits from "./components/Benefits";
import Clients from "./components/Clients";
import Launch from "./components/Launch";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import Request from "./components/Request";

function App() {
  return (
    <section className="bg-black mt-[00px]">
      <div className="hero1 h-screen">
        <Navbar />
        <div>
          <Launch />
          <Request />
          <Clients />
          <Benefits />
          <Products />
        </div>
      </div>
    </section>
  );
}

export default App;
