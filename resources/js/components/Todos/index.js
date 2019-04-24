import React from 'react';
import Todo from './Todo';

const Todos = (props) => {
    let todosElement = props.todos.map((item, index) => {
        return <Todo key={item.id} content={item.content} completed={item.completed} clicked={(e) => props.clicked(e, item.id)} removed={(e) => props.removed(e, item.id)} />
    })

    return todosElement;
}

export default Todos;
