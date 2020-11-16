export const ToDoListItemControlComponent = ({onClick, children}) => {
    return (
        <button className="btn link" onClick={onClick}>{children}</button>
    )
}