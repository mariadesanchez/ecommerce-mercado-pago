/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import { db } from "../../../firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { usecontextGlobal } from '../../../context/GlobalContext'
import corazon from '../../../../src/images/corazon.png';
import corazonRojo from '../../../../src/images/corazon-rojo.png';


const Favs= () => {
  // eslint-disable-next-line no-unused-vars
  const { productState, productDispatch } = usecontextGlobal();
  localStorage.clear();
  const [products, setProducts] = useState([]);

  // eslint-disable-next-line no-undef, no-unused-vars
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

   function addFav(product) { 
    const findFavs = productState.productLike.find((fav) => fav.id === product.id);
    if (!findFavs) {
     productDispatch({ type: "PRODUCT_LIKE", payload:product });
  
    } else {
      const filteredFavs =productState.productLike.filter(
        (fav) => fav.id !== product.id
      );
      productDispatch({ type: "PRODUCT_DELETE", payload: filteredFavs });
    }
  }
  

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>


  {productState.productLike.map((product) => {
    return (
      <><div
        key={product.id}
        style={{
          border: "1px solid black",
          flex: "1 1 calc(25% - 40px)",
          padding: "20px",
          boxSizing: "border-box",
          minWidth: "250px", // Ancho mínimo para evitar elementos demasiado pequeños
        }}
      >
        <img src={product.image} style={{ width: "100%" }} alt="" />
        <h4>{product.title}</h4>
        <h4>Precio: {product.unit_price}</h4> {/* Corrección aquí */}
        <h4>Stock: {product.stock}</h4>
        <Link to={`/itemDetail/${product.id}`}>Ver detalle</Link>
  
        <button onClick={() => addFav(product)} style={{ backgroundColor: 'white', borderRadius: '15px' }}>
            {productState.productLike.some((fav) => fav.id === product.id) ? (
              <img src={corazonRojo} style={{ width: '40px', height: '40px' }} />
            ) : (
              <img src={corazon} style={{ width: '40px', height: '40px' }} />
            )}
          </button>       
      </div>
       
        </>
    );
  })}
</div>


  );
};

export default Favs;
