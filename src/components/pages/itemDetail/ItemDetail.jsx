import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../firebaseConfig";
import { getDoc, collection, doc } from "firebase/firestore";
import { Button } from "@mui/material";
import { CartContext } from "../../../context/CartContext";
// import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import MenuIcon from "@mui/icons-material/Menu";
import { menuItemsDetail } from "../../../router/navigation";
import { Link } from "react-router-dom";

const ItemDetail = () => {
  const { id } = useParams();
  const { addToCart, getQuantityById } = useContext(CartContext);
  let quantity = getQuantityById(id);
  const [product, setProduct] = useState(null);
  const [counter, setCounter] = useState(quantity || 1);
  

  useEffect(() => {
    let refCollection = collection(db, "products");
    let refDoc = doc(refCollection, id);
    getDoc(refDoc)
      .then((res) => setProduct({ ...res.data(), id: res.id }))
      .catch((error) => console.log(error));
  }, [id]);

  // SUMAR
  const addOne = () => {
    if (counter < product.stock) {
      setCounter(counter + 1);
    } else {
      alert("stock maximo");
    }
  };

  // RESTAR

  const subOne = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    } else {
      alert("no podes agregar menos de 1 elemento al carrito");
    }
  };
  // AGREGAR AL CARRITO

  const onAdd = () => {
    let obj = {
      ...product,
      quantity: counter,
    };
    addToCart(obj);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
  {/* VER NO APARECE EN DETAIL */}
  <List>
    {menuItemsDetail.map(({ id, path, title, Icon }) => {
  
        <Link key={id} to={path}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Icon sx={{ color: "whitesmoke" }} />
              </ListItemIcon>
              <ListItemText primary={title} sx={{ color: "whitesmoke" }} />
            </ListItemButton>
          </ListItem>
        </Link>

    })}</List>
  
  
  
  {product && (
    <div> 
      <label>Total:</label>
      <h2 style={{textAlign:'center'}}>{product.unit_price * counter}</h2>
      <h2 style={{textAlign:'center'}}>{product.title}</h2>
      <img src={product.image} style={{ width: "400px" }} alt="" />
    </div>
  )}
  {quantity && <h6>Ya tienes {quantity} en el carrito</h6>}
  {product?.stock === quantity && <h6>Ya tienes el máximo en el carrito</h6>}
  <div style={{ display: "flex", alignItems: "center" }}>
    <Button variant="contained" onClick={subOne}>
      -
    </Button>
    <h4>{counter}</h4>
    <Button variant="contained" onClick={addOne}>
      +
    </Button>
  </div>
  <Button onClick={onAdd} variant="contained" color="success" style={{ marginTop: "20px" }}>
    Agregar al carrito
  </Button>
</div>

  );
};

export default ItemDetail;
