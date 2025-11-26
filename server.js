const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let items = [
  { id: 1, name: "Item A" },
  { id: 2, name: "Item B" }
];

let institutions = [{
  name: "Example Institution",
  address: "123 Main St"
}, {
  name: "Another Institution",
  address: "456 Side St"
}];

let nextId = 3;

// POST 1 - create one item

app.post('/api/items', (req, res) => {
  const name = req.body.name;

  if (name === undefined) {
    return res.status(400).json({
      status: "error",
      message: '"name" is required'
    }); // 400 Bad Request
  }

  const newItem = { id: nextId++, name: name };
  items.push(newItem);

  return res.status(201).json({
    status: "success",
    data: newItem
  }); // 201 Created
});

// POST 2 - create an institution

app.post('/api/institutions', (req, res) => {
  const name = req.body.name;
  const address = req.body.address;
  if (name === undefined || address === undefined) {
    return res.status(400).json({
      status: "error",
      message: '"name" and "address" are required'
    }); // 400 Bad Request
  }
  const newInstitution = { name: name, address: address };
  institutions.push(newInstitution);
  return res.status(201).json({
    status: "success",
    data: newInstitution
  }); // 201 Created
});


// GET 1 - all items

app.get('/api/items', (req, res) => {
  return res.status(200).json({
    status: "success",
    data: items
  }); // 200 OK
});

// GET 2 - one item

app.get('/api/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = items.find(i => i.id === id);

  if (!item) {
    return res.status(404).json({
      status: "error (status code 404)",
      message: "Item not found"
    }); // 404 Not Found
  }

  return res.status(200).json({
    status: "success",
    data: item
  }); // 200 OK
});

// PUT 1 - update one item

app.put('/api/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const name = req.body.name;

  const item = items.find(i => i.id === id);

  if (!item) {
    return res.status(404).json({
      status: "error (status code 404)",
      message: "Item not found"
    }); // 404 Not Found
  }

  if (name !== undefined) {
    item.name = name;
  }

  return res.status(200).json({
    status: "success",
    data: item
  }); // 200 OK
});

// PUT 2 - rename item

app.put('/api/items/:id/rename', (req, res) => {
  const id = Number(req.params.id);
  const newName = req.body.newName;

  const item = items.find(i => i.id === id);

  if (!item) {
    return res.status(404).json({
      status: "error (status code 404)",
      message: "Item not found"
    }); // 404 Not Found
  }

  if (newName !== undefined) {
    item.name = newName;
  }

  return res.status(200).json({
    status: "success",
    data: item
  }); // 200 OK
});

// DELETE 1 - delete one item

app.delete('/api/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = items.findIndex(i => i.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: "error (status code 404)",
      message: "Item not found"
    }); // 404 Not Found
  }

  const deleted = items.splice(index, 1)[0];

  return res.status(200).json({
    status: "success",
    data: deleted
  }); // 200 OK
});

// DELETE 2 - delete all items

app.delete('/api/items', (req, res) => {
  items = [];
  nextId = 1;

  return res.status(200).json({
    status: "success",
    data: []
  }); // 200 OK
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
