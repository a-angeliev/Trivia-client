import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { DiscountContext } from "../../../../context/discountContext";
import { DiscountForm } from "../AdminDiscountForm/AdminDiscountForm";
import * as discountServices from "../../../../service/discountService";

export default function AdminDiscountDetails() {
    const { discounts, editDiscount, deleteDiscount } = useContext(DiscountContext);

    const [discountData, setDiscountData] = useState({ code: "", discount: "" });
    const [startedTime, setStartedTime] = useState();
    const [endedTime, setEndedTime] = useState();

    const navigation = useNavigate();

    const { discountId } = useParams();

    useEffect(() => {
        let discount = discounts.filter((x) => x.id == discountId);
        if (discount) {
            setStartedTime(new Date(discount[0].started_on));
            setEndedTime(new Date(discount[0].ended_on));
            let data = {
                code: discount[0].code,
                discount: discount[0].discount,
            };
            setDiscountData(data);
        }
    }, [discountId]);

    const editDiscountHandler = (data) => {
        discountServices
            .editDiscount(data, discountId)
            .then((res) => {
                editDiscount(res, discountId);
                navigation("/admin-panel/discount");
            })
            .catch((err) => console.log(err));
    };

    const deleteDiscountHandler = (e) => {
        e.preventDefault();
        const confirmation = window.confirm("Are you sure you want to delete this?");
        if (confirmation) {
            discountServices
                .deleteDiscount(discountId)
                .then((_) => {
                    deleteDiscount(discountId);
                    navigation("/admin-panel/discount");
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <DiscountForm
            action={"edit"}
            deleteDiscountHandler={deleteDiscountHandler}
            editDiscountHandler={editDiscountHandler}
            startedTime={startedTime}
            endedTime={endedTime}
            discountData={discountData}></DiscountForm>
    );
}
