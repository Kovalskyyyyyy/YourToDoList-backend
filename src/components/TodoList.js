import React, { useState } from 'react';

function TodoList({ list, onToggleEdit, onNameChange, todos, setTodos }) {
    const [newName, setNewName] = useState(list.name);
    const [newItem, setNewItem] = useState('');

    const handleNameChange = () => {
        if (newName.trim()) {
            onNameChange(newName);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleNameChange();
        }
    };

    const toggleComplete = (index) => {
        const updatedTodos = [...todos];
        updatedTodos[index] = { ...updatedTodos[index], completed: !updatedTodos[index].completed };
        setTodos(updatedTodos);
    };

    const deleteTodo = (index) => {
        const updatedTodos = todos.filter((_, i) => i !== index);
        setTodos(updatedTodos);
    };

    const addItem = () => {
        if (newItem.trim()) {
            setTodos([...todos, { text: newItem, completed: false }]);
            setNewItem(''); 
        }
    };

    return (
        <div className="todo-list">
            <div className="owner-title">Owner</div>
            <div className="list-name-section">
                {list.isEditing ? (
                    <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        onBlur={handleNameChange}
                        onKeyDown={handleKeyDown}
                        autoFocus
                        className="edit-list-name-input"
                    />
                ) : (
                    <h2 className="list-name">
                        {list.name}
                        <button onClick={onToggleEdit} className="edit-btn">✏️</button>
                    </h2>
                )}
            </div>
            {todos.map((todo, index) => (
                <div key={index} className="todo-item">
                    <span className={todo.completed ? 'completed' : ''}>{todo.text}</span>
                    <div>
                        <button onClick={() => toggleComplete(index)} className="check-btn">✔️</button>
                        <button onClick={() => deleteTodo(index)} className="delete-btn">❌</button>
                    </div>
                </div>
            ))}
            <div className="add-item-form">
                <input
                    type="text"
                    placeholder="Add new item"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                />
                <button onClick={addItem} className="add-item-btn">Add</button>
            </div>
        </div>
    );
}

export default TodoList;
