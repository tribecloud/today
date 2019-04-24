import React, { useState } from 'react';

const FormTodo = (props) => {
    const [content, setContent] = useState('');

    const handleChange = (e) => {
        setContent(e.target.value);
    };

    const handleSubmit = (e, content) => {
        props.submitted(e, content);

        setContent('');
    };

    return <div className="form">
        <form action="#" onSubmit={(e) => handleSubmit(e, content)}>
            <input
                type="text"
                placeholder="What are you going to do?"
                value={content}
                onChange={handleChange} />
            <a href="#" onClick={(e) => handleSubmit(e, content)}><img src="images/plus.svg" alt="" /></a>
        </form>
    </div>;
};

export default FormTodo;
