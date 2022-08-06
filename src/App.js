import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import RiddleCatalogue from "./components/RiddleCatalogue/RiddleCatalogue";
import { Routes, Route } from "react-router-dom";
import logo from "./logo.svg";
import style from "./App.module.css";
// import style from './app.css'

function App() {
    return (
        <>
            <Header />
            
            <RiddleCatalogue/>
            <Footer />
            {/* <Routes>
            <Route path="/" element={<></>} />
            </Routes> */}
        </>
    );
}

export default App;
