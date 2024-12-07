import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    await axios.get("http://127.0.0.1:8000/api/products").then(({ data }) => {
      setProducts(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    await axios
      .delete(`http://127.0.0.1:8000/api/products/${id}`)
      .then(({ data }) => {
        console.log(data.message);
        fetchProducts();
      })
      .catch(({ response: { data } }) => {
        console.log(data.message);
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="conl-12 ">
          <Link className="btn btn-primary mb-2 float-end" to={"/product/create"}>
            Create
          </Link>
          <div className="col-12">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Description</th>
                  <th scope="col">Image</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 &&
                  products.map((row, key) => (
                    <tr key={key}>
                      <td>{row.title}</td>
                      <td>{row.description}</td>
                      <td>
                        <img
                          width="100px"
                          src={`http://127.0.0.1:8000/storage/images/${row.image}`}
                          alt={row.title}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "path/to/placeholder/image.png";
                          }}
                        />
                      </td>
                      <td>
                        <Link
                          className="btn btn-success mb-2 float-end"
                          to={`/product/edit/${row.id}`}
                        >
                          Edit
                        </Link>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteProduct(row.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
