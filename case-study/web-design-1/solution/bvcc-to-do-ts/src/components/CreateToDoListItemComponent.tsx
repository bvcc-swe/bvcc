import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FunctionComponent, useState } from "react";
import { ToDoListItem } from '../models/ToDoListItem';

type Props = {
    createItem: (item: ToDoListItem) => Promise<void>
}

export const CreateToDoListItemComponent: FunctionComponent<Props> = ({ createItem }) => {
    const [title, setTitle] = useState("");

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }

    const handleOnClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        if (!title) {
            return
        }

        await createItem({
            id: 0,
            user: "john",
            title: title,
            isComplete: false,
            request: null
        });

        setTitle("");
    }

    return (
        <li className="list-item">
            <div className="status">&nbsp;</div>
            <div className="content">
                <input placeholder={"Add New Item"} value={title} onChange={handleOnChange} />
            </div>
            <div className="controls">
                <button className="btn link" onClick={handleOnClick}>
                    <FontAwesomeIcon icon={["fas", "plus-circle"]} />
                </button>
            </div>
        </li>
    )
}