import {IToDoListItem} from '../models/IToDoListItem';
import React, {FunctionComponent, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


type Props = {
    item: IToDoListItem;
}

export const ToDoListItem:FunctionComponent<Props> = ({item}) => {
  const {title, isComplete, request} = item;
  const[isComplet, setComplete] = useState(isComplete);
    return (
      <li className="list-item">
        <div className="status">
            <FontAwesomeIcon icon={isComplet? "check-circle" : "circle"} onClick={()=> setComplete(!isComplet)}/>
        </div>
        <div className="content">
            <div className="title">{title}</div>
            <div className="subtitle">
              { request && <div>Ask: <span className="money ask">{request.ask}</span></div> }
            </div>
        </div>
        <div className="controls">
        <FontAwesomeIcon icon="hands-helping"/>
        </div>
    </li>
    )
}
