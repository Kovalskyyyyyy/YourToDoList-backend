const Item = require('../models/Item');
const List = require('../models/List');

exports.createItem = async (req, res) => {
  const { text, listId } = req.body;
  try {
    const newItem = new Item({ text, list: listId });
    await newItem.save();
    const list = await List.findById(listId);
    list.todos.push(newItem._id);
    await list.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create item' });
  }
};

exports.updateItem = async (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;
  try {
    const item = await Item.findById(id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    item.text = text || item.text;
    item.completed = completed !== undefined ? completed : item.completed;
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update item' });
  }
};

exports.deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findById(id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    await item.remove();
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
};
