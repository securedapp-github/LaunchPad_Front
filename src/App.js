import "./App.css";
import Clients from "./components/Clients";
import Launch from "./components/Launch";
import Navbar from "./components/Navbar";
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
        </div>
      </div>
    </section>
  );
}

export default App;
