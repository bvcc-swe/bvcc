import React, { FunctionComponent, useState, MouseEvent, ChangeEvent } from "react";
import { ToDoListItem } from "../models/ToDoListItem";

type Props = {
    item: ToDoListItem;
    updateItem: (item: ToDoListItem) => Promise<void>;
    closeDialog: () => void;
}

export const CreateRequestComponent: FunctionComponent<Props> = ({ item, updateItem, closeDialog }) => {
    const [request, setRequest] = useState({ distance: "", duration: "", ask: ""});

    const handleDistanceOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        setRequest({ ...request, distance: event.target.value })
    }

    const handleDurationOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        setRequest({ ...request, duration: event.target.value })
    }

    const handleAskOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        setRequest({ ...request, ask: event.target.value })
    }

    const handleComplete = async (event: MouseEvent<HTMLInputElement>) => {
        item.request = {
            distance: parseFloat(request.distance),
            duration: parseFloat(request.duration),
            ask: parseFloat(request.ask)
        };
        await updateItem(item);
        closeDialog();
    }

    const handleCancel = (event: MouseEvent<HTMLInputElement>) => {
        closeDialog();
    }

    return (
        <div className="form">
            <header>{item?.title || ""}</header>
            <div className="field">
                <label htmlFor="distance">Distance (mi)</label>
                <input name="distance" type="text" placeholder="Enter Distance" value={request.distance} onChange={handleDistanceOnChange} />
            </div>
            <div className="field">
                <label htmlFor="">Duration (min)</label>
                <input type="text" placeholder="Enter Duration" value={request.duration} onChange={handleDurationOnChange} />
            </div>
            <div className="field">
                <label htmlFor="">Ask ($)</label>
                <input type="text" placeholder="Enter Ask" value={request.ask} onChange={handleAskOnChange} />
            </div>
            <div className="field inline">
                <input className="submit" type="button" value="Complete" onClick={handleComplete} />
                <input className="cancel" type="button" value="Cancel" onClick={handleCancel} />
            </div>
        </div>
    )
}