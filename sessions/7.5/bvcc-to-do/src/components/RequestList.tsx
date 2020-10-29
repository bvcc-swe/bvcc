import React, { FunctionComponent } from 'react';
import items from '../data/items.json'
import { IToDoListItem } from '../models/IToDoListItem';

type RequestedToDoListItem = IToDoListItem & {request: Request};

export const RequestList: FunctionComponent = () => {
    const requestListItems = items.filter(x => x.request).map(x => <RequestListItem item={x as RequestedToDoListItem} />);
    return (
        <ul>
            {requestListItems}
        </ul>
    )
}

type Prop = {
    item: RequestedToDoListItem;
}

const RequestListItem: FunctionComponent<Prop> = ({ item }) => {
    const {user, title, request} = item;

    return (
        <li className="list-item">
            <div className="content">
                <div className="title">{title}</div>
                <div className="subtitle">
                    <ul className="property-list">
                        <li><span>User</span><span className="user">{user}</span></li>
                        <li><span>Distance</span><span className="distance">{request.distance}</span></li>
                        <li><span>Duration</span><span className="time">{request.duration}</span></li>
                        <li><span>Ask</span><span className="money">{request.ask}</span></li>
                    </ul>
                </div>
            </div>
            <div className="controls">
                <i className="fas fa-arrow-alt-circle-right"></i>
            </div>
        </li>
    )
}