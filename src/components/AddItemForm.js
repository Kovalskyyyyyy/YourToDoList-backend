import React, { useState } from 'react';
import apiService from '../services/apiService';

function AddItemForm({ addItem }) {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = async () => {
    if (inputValue.trim()) {
      try {
        const response = await apiService.createUser({ name: inputValue, email: `${inputValue}@example.com` });
        addItem(response.data);
        setInputValue('');
      } catch (error) {
        console.error('Error adding item:', error);
      }
    }
  };

  return (
    <div className="add-item-form">
      <input
        type="text"
        placeholder="Add new item"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleAdd}>Add Item</button>
    </div>
  );
}

export default AddItemForm;
