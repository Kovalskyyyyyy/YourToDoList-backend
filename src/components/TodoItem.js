import React from 'react';

function TodoItem({ item }) {
    return (
        <div className="todo-item">
            <span>{item}</span>
            <button className="check-btn">✔️</button>
            <button className="delete-btn">❌</button>
        </div>
    );
}

export default TodoItem;
