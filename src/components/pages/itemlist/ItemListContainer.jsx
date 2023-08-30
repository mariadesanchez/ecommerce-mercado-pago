import { useEffect, useState } from "react";
import { db } from "../../../firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import { Link } from "react-router-dom";

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let refCollection = collection(db, "products");
    getDocs(refCollection)
      .then((res) => {
        let newArray = res.docs.map((product) => {
          return { ...product.data(), id: product.id };
        });

        setProducts(newArray);
      })
      .catch((err) => console.log(err));
  }, []);


  return (
    <div>
    <h1>Estoy en el shop</h1>
  
    {products.map((product) => {
      return (
        <div 
          key={product.id}
          style={{
            border: "1px solid black",
            width: "25%", // Para tener 4 elementos por fila en pantallas grandes
            boxSizing: "border-box", // Considerar el borde en el ancho total
            padding: "20px", // Espaciado entre elementos
          
          }}
        >
          <img src={product.image} style={{ width: "100%" }} alt="" />
          <h4>{product.title}</h4>

          <h4>{product.unit_price}</h4>
          <h4>{product.stock}</h4>
          <Link to={`/itemDetail/${product.id}`}>Ver detalle</Link>
        </div>
      );
    })}
  </div>
  

  );
};

export default ItemListContainer;
