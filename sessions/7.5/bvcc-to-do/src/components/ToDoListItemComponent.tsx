import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FunctionComponent } from 'react';
import { ToDoListItem } from '../models/ToDoListItem';

type Props = {
  item: ToDoListItem;
  updateItem: (item: ToDoListItem) => void
  createRequest: (item: ToDoListItem) => void
}

export const ToDoListItemComponent: FunctionComponent<Props> = ({ item, updateItem, createRequest }) => {
  const { title, isComplete, request } = item;

  const toggleComplete = () => {
    item.isComplete = !item.isComplete;
    updateItem(item);
  }

  const handleRequestOnClick = (event: React.MouseEvent) => {
    createRequest(item);
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
      </div>
    </li>
  )
}
