import { useState } from 'react'
import productsData from './products.json'
import './App.css'

function App() {
  const [order, setOrder] = useState('default')
  const products = productsData?.products || []

  // default dataset: include ALL products with id 1..22 in original sequence
  const baseList = products
    .filter((p) => p.id >= 1 && p.id <= 22)
    .sort((a, b) => a.id - b.id)

  // three modes: default (original ids 1..22), asc (price low→high), desc (price high→low)
  let sorted
  if (order === 'asc') sorted = [...baseList].sort((a, b) => a.price - b.price)
  else if (order === 'desc') sorted = [...baseList].sort((a, b) => b.price - a.price)
  else sorted = [...baseList]

  return (
    <div className="table-wrapper">
      <h1>Product List ☠️☠️👍👍</h1>

      <div className="controls">
        <label>Sort by Price:</label>
        <select value={order} onChange={(e) => setOrder(e.target.value)}>
          <option value="default">Default</option>
          <option value="asc">Low → High</option>
          <option value="desc">High → Low</option>
        </select>
      </div>

      <div className="table-container">
        <div className="table-shell">
          <div className="table-inner">
            <table className="products-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>TITLE</th>
                  <th>BRAND</th>
                  <th>CATEGORY</th>
                  <th>PRICE</th>
                  <th>RATING</th>
                  <th>RETURN POLICY</th>
                  <th>SHIPPING INFO</th>
                  <th>IMAGE</th>
                </tr>
              </thead>

              <tbody>
                {sorted.map((prod, idx) => (
                  <tr key={prod.id} style={{ ['--i']: idx }}>
                    <td className="id-cell">{prod.id}</td>
                    <td className="title-cell">{prod.title}</td>
                    <td className="brand-cell">{prod.brand}</td>
                    <td className="category-cell">{prod.category}</td>
                    <td className="price-cell">{prod.price.toFixed(2)}</td>
                    <td className="rating-cell">{prod.rating.toFixed(2)}</td>
                    <td className="return-cell">{prod.returnPolicy}</td>
                    <td className="shipping-cell">{prod.shippingInformation}</td>
                    <td className="image-cell">
                      <div className="thumb-pill" aria-hidden>
                        <img className="thumbnail-img" src={prod.thumbnail} alt={prod.title} width="48" height="48" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
