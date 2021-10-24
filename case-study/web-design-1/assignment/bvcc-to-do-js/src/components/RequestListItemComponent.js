/** @typedef {import("../types/types").ToDoListItem} ToDoListItem */

/**
 * @typedef {Object} Props
 * @property {ToDoListItem} item - The item
 */

/**
 * Creates a component that represents a request list item.
 * @param {Props} props - The properties. 
 */
export const RequestListItemComponent = ({ item }) => {
    const { user, title, request } = item;

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