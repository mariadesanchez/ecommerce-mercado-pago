/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
import { useEffect, useState,useContext } from "react";
import { db } from "../../../firebaseConfig";
// eslint-disable-next-line no-unused-vars
import {where , query,getDocs, collection,addDoc,deleteDoc} from "firebase/firestore";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { usecontextGlobal } from '../../../context/GlobalContext'
import corazon from '../../../../src/images/corazon.png';
import corazonRojo from '../../../../src/images/corazon-rojo.png';
// eslint-disable-next-line no-unused-vars
import { AuthContext } from "../../../context/AuthContext"



const Favs= () => {
  // eslint-disable-next-line no-unused-vars
  const { productState, productDispatch } = usecontextGlobal();
  const {user} = useContext(AuthContext)
  localStorage.clear();
  const [favoritos, setFavoritos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [productosFavoritos, setProductosFavoritos] = useState([]);

  
  // Obtener los documentos que coinciden con la consulta


  // eslint-disable-next-line no-undef, no-unused-vars
  useEffect(() => {
    let refCollection = collection(db, "favoritos");
    const favoritosQuery = query(refCollection, where("email", "==", user.email));

    getDocs(favoritosQuery)
      .then((res) => {
        let newArray = res.docs.map((fav) => {
          return { ...fav.data(), id: fav.id };
        });

        setFavoritos(newArray);
      })
      .catch((err) => console.log(err));
  }, [favoritos]);

  useEffect(() => {
    let refCollection = collection(db, "products");
    getDocs(refCollection)
      .then((res) => {
        let newArray = res.docs.map((producto) => {
          return { ...producto.data(), id: producto.id };
        });

        setProductos(newArray);
      })
      .catch((err) => console.log(err));
  }, [productos]);

  useEffect(() => {
    // Filtra los productos que son favoritos
    const productosFavoritosTemp = productos.filter((producto) =>
      favoritos.some((favorito) => favorito.favoritoId === producto.id)
    );

    // Establece los productos favoritos en el estado
    setProductosFavoritos(productosFavoritosTemp);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productos,favoritos]);

  async function actualizarFavoritos(productoId) {

    const favoritosRef = collection(db, 'favoritos');
    const q = query(favoritosRef, where('favoritoId', '==', productoId,'email', '==', user.email));
  
    try {
      const snapshot = await getDocs(q);
  
      if (!snapshot.empty) {
        // Si hay documentos encontrados, elimina el documento existente con el productoId
        snapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
    
       
        let divCorazon = document.getElementById(productoId)
        let divCorazonRojo = document.getElementById(productoId +1)
  
        divCorazon.style.display = "block";
        divCorazonRojo.style.display = "none";
     
        });
      } else {
        // Si no hay documentos encontrados, agrega un nuevo documento
        await addDoc(favoritosRef, { email: user.email, favoritoId: productoId });
       
        let divCorazon = document.getElementById(productoId)
        let divCorazonRojo = document.getElementById(productoId +1)
        
        divCorazon.style.display = "none";
        divCorazonRojo.style.display = "block";
  
  
      }
      console.log('Operación completada con éxito');
    } catch (error) {
      console.error('Error al actualizar favoritos:', error);
    }
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
    {productosFavoritos.map((product) => {
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
          <button  id = 'toggleButton'onClick={() => actualizarFavoritos( product.id)} 
          style={{ backgroundColor: 'transparent', borderRadius: '20px',width: '50px', height: '50px' }}    >  

          <><img src={corazon} id={product.id} style={{ width: '40px', height: '40px', display: 'none' }} />
          <img src={corazonRojo} id={product.id + 1} style={{ width: '40px', height: '40px', display: 'block' }} /></> 
    
    
           </button>      
        </div>     
        </>  );
    })}
  </div>
  
  
    );
  };
export default Favs;

