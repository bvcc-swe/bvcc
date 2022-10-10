import React, { useState } from 'react'

export default function CreateToDoListItemComponent({ item, createItem }) {
    const [title, setTitle] = useState('');

    const handleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newTodo = {
            ...item,
            title: title
        }
        createItem(newTodo);
        setTitle("");
    }

    return (
        <div className='list-item'>
            <form onSubmit={handleSubmit} className="todo_form">
                <input
                    type="text"
                    id="newTodo"
                    name="title"
                    placeholder='Add New Item'
                    value={title}
                    onChange={handleChange}
                />
                <div className="controls">
                    <button className="btn link" type="submit">
                        <i className="fa fa-plus"></i>
                    </button>
                </div>
            </form>
        </div>
    )
}
