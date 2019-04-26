import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Todos from './components/Todos';
import FormTodo from './components/FormTodo';
import './bootstrap';

function App() {
    const [todos, setTodos] = useState([]);
    const [type, setType] = useState('all');
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            axios.get('/api/todos')
                .then(resp => {
                    setLoaded(true);
                    setTodos(resp.data);
                })
                .catch(err => {
                    console.error(err);
                })
            ;
        }
    });

    const handleCheckboxClick = (e, id) => {
        e.preventDefault();

        let todo = todos.find(item => item.id === id);

        axios.patch('/api/todos/' + id, {
                completed: !todo.completed
            })
            .then(resp => {
                let newTodos = [...todos];
                newTodos = newTodos.map((item, index) => {
                    if (item.id === id) {
                        item = resp.data;
                    }

                    return item;
                });

                setTodos(newTodos);
            })
            .catch(err => {
                console.error(err);
            })
        ;
    }

    const handleRemove = (e, id) => {
        e.preventDefault();

        axios.delete('/api/todos/' + id)
            .then(resp => {
                let newTodos = [...todos];
                newTodos = newTodos.filter((item, index) => {
                    return item.id !== id;
                });

                setTodos(newTodos);
            })
            .catch(err => {
                console.error(err);
            })
        ;
    };

    const handleFormsubmit = (e, content) => {
        e.preventDefault();

        axios.post('/api/todos', {
                content: content,
                completed: false,
            })
            .then(resp => {
                let newTodos = [...todos];
                newTodos.push(resp.data);

                setTodos(newTodos);
            })
            .catch(err => {
                console.error(err);
            })
        ;


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
                <Todos todos={viewedTodos()} clicked={handleCheckboxClick} removed={handleRemove} />
            </div>
        </div>
    </React.Fragment>;
}

ReactDOM.render(<App />, document.getElementById('app'));
