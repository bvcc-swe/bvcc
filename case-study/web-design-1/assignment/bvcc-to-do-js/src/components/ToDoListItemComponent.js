import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import Modal from '../modal/Modal';


/** @typedef {import("../types/types").ToDoListItem} ToDoListItem */

/**
 * @callback UpdateItemCallback
 * @param {ToDoListItem} item - The updated item.
 * @return {void}
 */

/**
 * @typedef {Object} Props
 * @property {ToDoListItem} item - An item.
 * @property {UpdateItemCallback} updateItem - A callback that updates the item.
 */

/**
 * Creates a component that represents a to-do list item.
 * @param {Props} props - The properties 
 */
export const ToDoListItemComponent = ({ item, updateItem }) => {
  const { title, isComplete, request } = item;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [update, setUpdate] = useState({ distance: '', duration: '', ask: "", id: item.id });

  const toggleComplete = () => {
    item.isComplete = !item.isComplete;
    updateItem(item);
  }

  const handleRequestOnClick = () => {
    setModalIsOpen(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const items = { ...item, request: update }
    updateItem(items)
    console.log(update)
    setModalIsOpen(false)
    console.log(item)
  }

  const handleChange = (e) => {
    setUpdate({ ...update, [e.target.name]: e.target.value })
  }


  return (
    <>
      <li className="list-item">
        <div className="status">
          <button className="btn link">
            <FontAwesomeIcon icon={isComplete ? ["fas", "check-circle"] : ["far", "circle"]} onClick={() => toggleComplete()} />
          </button>
        </div>
        <div className="content">
          <div className="title">{title}</div>
          <div className="subtitle">
            {request && <div>Ask: <span className="money ask">{request.ask}</span></div>}
          </div>
        </div>
        <div className="controls">
          {
            !item.request &&
            (<button className="btn link" onClick={handleRequestOnClick}>
              <FontAwesomeIcon icon={"hands-helping"} />
            </button>)
          }
        </div>
      </li>
      <Modal
        openModal={modalIsOpen}
        setOpenModal={setModalIsOpen}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        item={item} />
    </>
  )
}
