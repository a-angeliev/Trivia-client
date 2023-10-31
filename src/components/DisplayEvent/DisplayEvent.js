import { useEffect, useState } from "react";

import * as eventService from "../../service/eventService";
import DisplayEventStartCheck from "./DIsplayEventStartCheck/DisplayEventStartCheck";
import EventAction from "./EventAction/EventAction";

export default function DisplayEvent() {
    const queryParams = new URLSearchParams(window.location.search);

    const urlToken = queryParams.get("token");

    const [res, setRes] = useState("");

    useEffect(() => {
        eventService
            .eventState(urlToken)
            .then((res) => setRes(res))
            .catch((err) => console.log(err));
    }, []);

    let startString = "Once you start it, you cannot get a refund and you cannot stop the game.";
    return res.massage === startString ? (
        <DisplayEventStartCheck token={urlToken} setRes={setRes} massage={res.massage} />
    ) : (
        <EventAction urlToken={urlToken} />
    );
}
