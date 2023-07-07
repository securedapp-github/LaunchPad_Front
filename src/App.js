import "./App.css";
import Launch from "./components/Launch";
import Navbar from "./components/Navbar";

function App() {
  return (
    <section className="bg-black mt-[00px]">
      <div className="hero1 h-screen">
        <Navbar />
        <div>
          <Launch />
        </div>
      </div>
    </section>
  );
}

export default App;
