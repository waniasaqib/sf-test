import { useState, useEffect } from 'react'

const API_URL = 'http://localhost:3001/api/items'

function App() {
  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch items on mount
  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      const response = await fetch(API_URL)
      const data = await response.json()
      setItems(data)
      setLoading(false)
    } catch (err) {
      setError('Failed to load items')
      setLoading(false)
    }
  }

  const addItem = async (e) => {
    e.preventDefault()
    if (!newItem.trim()) return

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newItem })
      })
      const item = await response.json()
      setItems([...items, item])
      setNewItem('')
    } catch (err) {
      setError('Failed to add item')
    }
  }

  const togglePurchased = async (id, currentStatus) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ purchased: !currentStatus })
      })
      setItems(items.map(item => 
        item.id === id ? { ...item, purchased: !currentStatus } : item
      ))
    } catch (err) {
      setError('Failed to update item')
    }
  }

  const deleteItem = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      setItems(items.filter(item => item.id !== id))
    } catch (err) {
      setError('Failed to delete item')
    }
  }

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading...</div>
      </div>
    )
  }

  return (
    <div className="container">
      <header>
        <h1>Shopping List</h1>
        <p className="subtitle">Keep track of what you need</p>
      </header>

      {error && (
        <div className="error">
          {error}
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      <form onSubmit={addItem} className="add-form">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add an item..."
          className="input"
        />
        <button type="submit" className="btn-add">Add</button>
      </form>

      <ul className="items-list">
        {items.length === 0 ? (
          <li className="empty-state">
            <span className="empty-icon">🛒</span>
            <span>Your shopping list is empty</span>
          </li>
        ) : (
          items.map(item => (
            <li key={item.id} className={`item ${item.purchased ? 'purchased' : ''}`}>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={item.purchased}
                  onChange={() => togglePurchased(item.id, item.purchased)}
                />
                <span className="checkmark"></span>
                <span className="item-name">{item.name}</span>
              </label>
              <button 
                onClick={() => deleteItem(item.id)} 
                className="btn-delete"
                aria-label="Delete item"
              >
                ×
              </button>
            </li>
          ))
        )}
      </ul>

      {items.length > 0 && (
        <footer className="stats">
          {items.filter(i => i.purchased).length} of {items.length} items purchased
        </footer>
      )}
    </div>
  )
}

export default App

