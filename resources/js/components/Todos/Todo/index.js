import React from 'react';

const Todo = (props) => {
    let className = props.completed ? 'todo checked' : 'todo';

    return <div className={className}>
        <a className="checkbox" href="#" onClick={props.clicked}>
        </a>
        <div className="content">
            {props.content}
        </div>
        <a className="remove" href="#" onClick={props.removed}>
        </a>
    </div>;
};

export default Todo;
