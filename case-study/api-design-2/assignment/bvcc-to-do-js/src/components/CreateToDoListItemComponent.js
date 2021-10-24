import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

export const CreateToDoListItemComponent = ({ createItem: createItemCallback }) => {
    const [title, setTitle] = useState("");

    const handleOnChange = event => {
        setTitle(event.target.value);
    }

    const createItem = async event => {
        if (!title) {
            return;
        }

        await createItemCallback({
            id: 0,
            user: "john",
            title: title,
            isComplete: false,
            request: null
        });

        setTitle("");
    }

    const handleOnClick = async event => {
       createItem();
    }

    const handleOnKeyPress = async event => {
        if (event.charCode === 13) {
            createItem();
        }
    }

    return (
        <li className="list-item">
            <div className="status">&nbsp;</div>
            <div className="content">
                <input placeholder={"Add New Item"} value={title} onChange={handleOnChange} onKeyPress={handleOnKeyPress} />
            </div>
            <div className="controls">
                <button className="btn link" onClick={handleOnClick}>
                    <FontAwesomeIcon icon={["fas", "plus-circle"]} />
                </button>
            </div>
        </li>
    )
}