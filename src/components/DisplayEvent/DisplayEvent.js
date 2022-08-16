import { useEffect, useState } from "react";
import * as requester from "../../service/requester";

import DisplayEventStartCheck from "./DIsplayEventStartCheck/DisplayEventStartCheck";
import EventAction from "./EventAction/EventAction";

export default function DisplayEvent() {
    const queryParams = new URLSearchParams(window.location.search);
    const urlToken = queryParams.get("token");
    const [res, setRes] = useState("");

    useEffect(() => {
        let fetchData = async () => {
            let res = await requester.get(
                `http://127.0.0.1:5000/event?token=${urlToken}`
            );
            console.log(res, 222);
            setRes(res);
        };
        fetchData().then((err) => console.log(err));
        // requester.get(`http://127.0.0.1:5000/event?token=${urlToken}`).then((res) => {
        //     console.log(res);
        //     setRes(res)
        // });
    }, []);

    let startString =
        "You should start the riddle. Once the riddle start there is no money refunds anymore.";
    return res.massage == startString ? (
        <DisplayEventStartCheck
            token={urlToken}
            setRes={setRes}
            massage={res.massage}
        />
    ) : (
        <EventAction urlToken={urlToken} />
    );
}
