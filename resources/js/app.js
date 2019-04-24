import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Todos from './components/Todos';
import FormTodo from './components/FormTodo';

function App() {
    const [todos, setTodos] = useState([]);

    const [type, setType] = useState('all');

    const handleClick = (e, id) => {
        e.preventDefault();

        let newTodos = [...todos];
        newTodos = newTodos.map((item, index) => {
            if (item.id === id) {
                item.completed = !item.completed;
            }

            return item;
        });

        setTodos(newTodos);
    }

    const handleRemove = (e, id) => {
        console.log('removed ', id)
        e.preventDefault();

        let newTodos = [...todos];
        newTodos = newTodos.filter((item, index) => {
            return item.id !== id;
        });

        setTodos(newTodos);
    };

    const handleFormsubmit = (e, content) => {
        e.preventDefault();

        let todo = {
            id: (new Date()).getTime(),
            content: content,
            completed: false,
        };

        let newTodos = [...todos];
        newTodos.push(todo);

        setTodos(newTodos);
    };

    const counter = () => {
        return todos.filter((item) => {
            return !item.completed;
        }).length;
    };

    const handleNavClick = (e, type) => {
        e.preventDefault();
        setType(type);
    }

    const viewedTodos = () => {
        let newTodos = [...todos];
        newTodos = newTodos.filter((item, index) => {
            if (type == 'active') {
                return !item.completed;
            } else if (type == 'completed') {
                return item.completed;
            } else {
                return true;
            }
        });

        return newTodos;
    }

    return <React.Fragment>
        <FormTodo submitted={handleFormsubmit} />
        <div className="panel-todos">
            <div className="navs">
                <div className="counter">
                    {counter()} items left
                </div>
                <div>
                    <ul>
                        <li className={type=='all' ? 'active' : ''}><a href="#" onClick={(e) => handleNavClick(e, 'all')}>All</a></li>
                        <li className={type=='active' ? 'active' : ''}><a href="#" onClick={(e) => handleNavClick(e, 'active')}>Active</a></li>
                        <li className={type=='completed' ? 'active' : ''}><a href="#" onClick={(e) => handleNavClick(e, 'completed')}>Completed</a></li>
                    </ul>
                </div>
            </div>
            <div className="todos">
                <Todos todos={viewedTodos()} clicked={handleClick} removed={handleRemove} />
            </div>
        </div>
    </React.Fragment>;
}

ReactDOM.render(<App />, document.getElementById('app'));
