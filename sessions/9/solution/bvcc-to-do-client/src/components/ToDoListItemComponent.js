import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
export const ToDoListItemComponent = ({ item, updateItem, createRequest, children }) => {
  const { title, isComplete, request } = item;

  const toggleComplete = () => {
    item.isComplete = !item.isComplete;
    updateItem(item);
  }

  const handleRequestOnClick = event => {
    createRequest(item)
  }

  return (
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
            <FontAwesomeIcon icon="hands-helping" />
          </button>)
        }
        {children}
      </div>
    </li>
  )
}
