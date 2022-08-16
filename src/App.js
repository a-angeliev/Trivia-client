import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import RiddleCatalogue from "./components/RiddleCatalogue/RiddleCatalogue";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import Register from "./components/Register/Register";
import CreateEvent from "./components/CreateEvent/CreateEvent";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import AdminAddRiddles from "./components/AdminPanel/AdminRiddles/AdminAddRiddles/AdminAddRiddles";
import AdminRiddleDetails from "./components/AdminPanel/AdminRiddles/AdminRiddleDetails/AdminRiddleDetails";
import About from "./components/About/About";
import Checkout from "./components/Checkout/Checkout";
import DisplayEvent from "./components/DisplayEvent/DisplayEvent";


import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { RiddleProvider } from "./context/riddleContext";
import { Routes, Route } from "react-router-dom";
import style from "./App.module.css";
import { AuthProvider } from "./context/authContext";

// import style from './app.css'

function App() {
    return (
        <>
            <PayPalScriptProvider
                options={{
                    "client-id":
                        "AWfYTOnjSJgtSZaqRdR1SjIkehKuXp8GSWXGP3-K1udlWgq64mOv9znAyXa7EyLANzSmkJ-y7myqX0J8",
                    currency: "EUR",
                }}
            >
                <AuthProvider>
                    <RiddleProvider>
                        <main>
                            <section className={style.customer}>
                                <Header />
                                <Routes>
                                    {/* <Route
                                        path="/checkout"
                                        element={<Checkout />}
                                    /> */}
                                    <Route path="/event" element={<DisplayEvent/>}/>
                                    <Route path="/about" element={<About />} />
                                    <Route path="/" element={<Home />} />
                                    <Route
                                        path="/riddles/:riddleId/event"
                                        element={<CreateEvent />}
                                    />
                                    <Route
                                        path="/riddles"
                                        element={<RiddleCatalogue />}
                                    />
                                    <Route path="/login" element={<Login />} />
                                    <Route
                                        path="/logout"
                                        element={<Logout />}
                                    />
                                    <Route
                                        path="/register"
                                        element={<Register />}
                                    />
                                    <Route
                                        path="/admin-panel"
                                        element={<AdminPanel />}
                                    >
                                        <Route
                                            path="/admin-panel/details/:riddleId"
                                            element={<AdminRiddleDetails />}
                                        />
                                        <Route
                                            path="/admin-panel/item"
                                            element={<AdminAddRiddles />}
                                        />
                                    </Route>
                                </Routes>
                                <Footer />
                            </section>
                        </main>
                    </RiddleProvider>
                </AuthProvider>
            </PayPalScriptProvider>
        </>
    );
}

export default App;
