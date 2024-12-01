const List = require('../models/List');

exports.getLists = async (req, res) => {
  try {
    const lists = await List.find();
    res.json(lists);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch lists' });
  }
};

exports.getList = async (req, res) => {
  const { id } = req.params;
  try {
    const list = await List.findById(id);
    if (!list) return res.status(404).json({ error: 'List not found' });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch list' });
  }
};

exports.createList = async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    try {
        console.log('Creating new list with name:', name);
        const newList = new List({ name });
        await newList.save();
        res.status(201).json(newList);
    } catch (err) {
        console.error('Failed to create list', err);
        res.status(500).json({ error: 'Failed to create list' });
    }
};



exports.updateList = async (req, res) => {
  const { id } = req.params;
  const { name, todos, members } = req.body;

  try {
    const list = await List.findById(id);
    if (!list) {
      return res.status(404).json({ error: 'List not found' });
    }

    if (name) list.name = name;
    if (todos) list.todos = todos;
    if (members) list.members = members;

    await list.save();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update list' });
  }
};

exports.deleteList = async (req, res) => {
  const { id } = req.params;

  try {
    const list = await List.findById(id);
    if (!list) {
      return res.status(404).json({ error: 'List not found' });
    }

    await list.remove();
    res.json({ message: 'List deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete list' });
  }
};
