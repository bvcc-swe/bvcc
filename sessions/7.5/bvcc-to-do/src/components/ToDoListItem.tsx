import {IToDoListItem} from '../models/IToDoListItem';
import React, {FunctionComponent} from 'react';


type Props = {
    item: IToDoListItem;
}

export const ToDoListItem:FunctionComponent<Props> = ({item}) => {
  const {title, isComplete, request} = item;
    return (
      <li className="list-item">
        <div className="status">
            {isComplete ? <i className="fas fa-check-circle"></i> : <i className="far fa-circle"></i> }
        </div>
        <div className="content">
            <div className="title">{title}</div>
            <div className="subtitle">
              { request && <div>Ask: <span className="money ask">{request.ask}</span></div> }
            </div>
        </div>
        <div className="controls">
            <i className="fas fa-hands-helping"></i>
        </div>
    </li>
    )
}
