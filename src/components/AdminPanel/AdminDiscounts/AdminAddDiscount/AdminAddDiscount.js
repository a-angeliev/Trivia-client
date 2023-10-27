import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { DiscountContext } from "../../../../context/discountContext";
import { DiscountForm } from "../AdminDiscountForm/AdminDiscountForm";
import * as discountServices from "../../../../service/discountService";

export default function AdminAddDiscount() {
    const { addDiscount } = useContext(DiscountContext);

    const navigation = useNavigate();

    const createDiscount = (data) => {
        discountServices.createDiscount(data).then((res) => {
            addDiscount(res);
            navigation("/admin-panel/discount");
        });
    };

    return <DiscountForm createDiscount={(data) => createDiscount(data)}></DiscountForm>;
}
