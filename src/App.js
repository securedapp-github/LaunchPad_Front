import "./App.css";
import Audit from "./components/Audit";
import Benefits from "./components/Benefits";
import Clients from "./components/Clients";
import Core from "./components/Core";
import FAQ from "./components/FAQ";
import Launch from "./components/Launch";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import Request from "./components/Request";
import Stats from "./components/Stats";
import Transmission from "./components/Transmission";

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
          <Stats />
          <Core />
          <Audit />
          <FAQ />
          <Transmission />
        </div>
      </div>
    </section>
  );
}

export default App;
