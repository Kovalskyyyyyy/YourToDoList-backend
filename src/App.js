import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TodoList from './components/TodoList';
import MemberList from './components/MemberList';
import './App.css';
import apiService from './services/apiService';

function App() {
  const [username] = useState('Username');
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState('');
  const [selectedListId, setSelectedListId] = useState(null);
  const [isTileView, setIsTileView] = useState(false);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await apiService.getLists();
        setLists(response.data);
      } catch (error) {
        console.error('Error fetching lists:', error);
      }
    };

    fetchLists();
  }, []);

  const addNewList = async () => {
    if (newListName.trim()) {
        try {
            console.log('Adding new list:', newListName);
            const response = await apiService.createList({ name: newListName });
            console.log('Response:', response.data);
            setLists([...lists, response.data]);
            setNewListName('');
        } catch (error) {
            console.error('Error creating list:', error);
        }
    }
};



  const updateTodos = async (listId, newTodos) => {
    try {
      const updatedList = lists.find((list) => list.id === listId);
      updatedList.todos = newTodos;
      await apiService.updateList(listId, updatedList);
      setLists(lists.map((list) => (list.id === listId ? updatedList : list)));
    } catch (error) {
      console.error('Error updating todos:', error);
    }
  };

  const updateMembers = async (listId, newMembers) => {
    try {
      const updatedList = lists.find((list) => list.id === listId);
      updatedList.members = newMembers;
      await apiService.updateList(listId, updatedList);
      setLists(lists.map((list) => (list.id === listId ? updatedList : list)));
    } catch (error) {
      console.error('Error updating members:', error);
    }
  };

  const toggleEditMode = (listId) => {
    setLists(lists.map((list) => (list.id === listId ? { ...list, isEditing: !list.isEditing } : list)));
  };

  const handleNameChange = async (listId, newName) => {
    try {
      const updatedList = lists.find((list) => list.id === listId);
      updatedList.name = newName;
      await apiService.updateList(listId, updatedList);
      setLists(lists.map((list) => (list.id === listId ? updatedList : list)));
    } catch (error) {
      console.error('Error updating list name:', error);
    }
  };

  const toggleTileView = () => {
    setIsTileView(!isTileView);
  };

  const selectList = (listId) => {
    setSelectedListId(listId);
    setIsTileView(false);
  };

  const deleteList = async (listId) => {
    try {
      await apiService.deleteList(listId);
      setLists(lists.filter((list) => list.id !== listId));
      setSelectedListId(null);
      setIsTileView(true);
    } catch (error) {
      console.error('Error deleting list:', error);
    }
  };

  const filteredList = lists.find((list) => list.id === selectedListId);

  return (
    <div className="app">
      <Header username={username} onLogoClick={toggleTileView} />
      {isTileView && (
        <div className="tile-view">
          <h2>All Lists</h2>
          <div className="tile-container">
            {lists.map((list) => (
              <div
                key={list.id}
                className="tile"
                onClick={() => selectList(list.id)}
              >
                <h3>{list.name}</h3>
                <p>{list.todos.length} items</p>
                <p>{list.members.length} members</p>
              </div>
            ))}
          </div>
          <div className="add-list-section">
    <input
        type="text"
        placeholder="Enter new list name"
        value={newListName}
        onChange={(e) => setNewListName(e.target.value)}
        className="new-list-input"
    />
    <button onClick={addNewList} className="add-list-btn">
        Add List
    </button>
</div>

        </div>
      )}
      {!selectedListId && !isTileView ? (
        <div className="add-list-section">
          <input
            type="text"
            placeholder="Enter new list name"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            className="new-list-input"
          />
          <button onClick={addNewList} className="add-list-btn">
            Add List
          </button>
        </div>
      ) : selectedListId && !isTileView ? (
        <div className="content">
          <div key={filteredList.id} className="list-container">
            <TodoList
              list={filteredList}
              onToggleEdit={() => toggleEditMode(filteredList.id)}
              onNameChange={(newName) => handleNameChange(filteredList.id, newName)}
              todos={filteredList.todos}
              setTodos={(newTodos) => updateTodos(filteredList.id, newTodos)}
            />
            <MemberList
              members={filteredList.members}
              setMembers={(newMembers) => updateMembers(filteredList.id, newMembers)}
            />
            <button
              onClick={() => deleteList(filteredList.id)}
              className="delete-list-btn"
            >
              Delete List
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
