import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/authContext";
import { DiscountProvider } from "./context/discountContext";
import { NotFount } from "./components/404NotFound/404NotFound";
import { OrderFinished } from "./components/CreateEvent/OrderFinished.js/OrderFinished";
import { RiddleProvider } from "./context/riddleContext";
import { TransactionsProvider } from "./context/transactionsContext";
import About from "./components/About/About";
import AdminAddDiscount from "./components/AdminPanel/AdminDiscounts/AdminAddDiscount/AdminAddDiscount";
import AdminAddRiddles from "./components/AdminPanel/AdminRiddles/AdminAddRiddles/AdminAddRiddles";
import AdminDiscountDetails from "./components/AdminPanel/AdminDiscounts/AdminDiscountDetails/AdminDiscountDetails";
import AdminDiscounts from "./components/AdminPanel/AdminDiscounts/AdminDiscounts";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import AdminRiddleDetails from "./components/AdminPanel/AdminRiddles/AdminRiddleDetails/AdminRiddleDetails";
import AdminRiddles from "./components/AdminPanel/AdminRiddles/AdminRiddles";
import AdminTransaction from "./components/AdminPanel/AdminTransactions/AdminTransactions";
import CreateEvent from "./components/CreateEvent/CreateEvent";
import DisplayEvent from "./components/DisplayEvent/DisplayEvent";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import Register from "./components/Register/Register";
import RiddleCatalogue from "./components/RiddleCatalogue/RiddleCatalogue";

import style from "./App.module.css";

function App() {
    return (
        <>
            <PayPalScriptProvider
                options={{
                    "client-id": "AWfYTOnjSJgtSZaqRdR1SjIkehKuXp8GSWXGP3-K1udlWgq64mOv9znAyXa7EyLANzSmkJ-y7myqX0J8",
                    currency: "EUR",
                }}>
                <AuthProvider>
                    <RiddleProvider>
                        <DiscountProvider>
                            <TransactionsProvider>
                                <main>
                                    <section className={style.customer}>
                                        <Header />
                                        <Routes>
                                            <Route path='*' element={<NotFount />}></Route>
                                            <Route path='/congratulations' element={<OrderFinished />}></Route>
                                            <Route path='/event' element={<DisplayEvent />} />
                                            <Route path='/about' element={<About />} />
                                            <Route path='/' element={<Home />} />
                                            <Route path='/riddles/:riddleId/event' element={<CreateEvent />} />
                                            <Route path='/riddles' element={<RiddleCatalogue />} />
                                            <Route path='/login' element={<Login />} />
                                            <Route path='/logout' element={<Logout />} />
                                            <Route path='/register' element={<Register />} />
                                            <Route element={<AdminPanel />}>
                                                <Route path={"admin-panel"} element={<AdminRiddles />}>
                                                    <Route
                                                        path='/admin-panel/details/:riddleId'
                                                        element={<AdminRiddleDetails />}
                                                    />
                                                    <Route path='/admin-panel/item' element={<AdminAddRiddles />} />
                                                </Route>

                                                <Route
                                                    path={"/admin-panel/transactions"}
                                                    element={<AdminTransaction />}></Route>

                                                <Route path={"/admin-panel/discount"} element={<AdminDiscounts />}>
                                                    <Route
                                                        path={"/admin-panel/discount/add"}
                                                        element={<AdminAddDiscount />}
                                                    />
                                                    <Route
                                                        path={"/admin-panel/discount/:discountId"}
                                                        element={<AdminDiscountDetails />}
                                                    />
                                                </Route>
                                            </Route>
                                        </Routes>
                                    </section>
                                </main>
                            </TransactionsProvider>
                        </DiscountProvider>
                    </RiddleProvider>
                </AuthProvider>
            </PayPalScriptProvider>
        </>
    );
}

export default App;
