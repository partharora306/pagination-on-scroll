import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import "./App.css";

const API_URL = "https://dummyjson.com/products";
const LIMIT = 5;

function App() {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);

  const getData = async () => {
    const url = new URL(API_URL);
    url.searchParams.set("limit", LIMIT);
    url.searchParams.set("skip", skip);
    const response = await axios(url.href);
    setProducts([...products, ...response.data.products]);
  };

  useEffect(() => {
    getData();
  }, [skip]);

  if (!products.length) return <h2 className="loading">Loading...</h2>;

  return (
    <div>
      <h1 className="productsHeading">Products</h1>
      <hr />
      <InfiniteScroll
        dataLength={products.length}
        next={() => setSkip(products.length)}
        hasMore={skip !== products.length ? true : false}
        className="products"
      >
        {products?.map((product) => (
          <div key={product.id}>
            <img src={product.images[0]} className="productImage" alt="" />
            <h3>{product.title}</h3>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}
export default App;
