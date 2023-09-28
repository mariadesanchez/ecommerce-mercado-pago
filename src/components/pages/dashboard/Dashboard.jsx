/* eslint-disable no-undef */
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebaseConfig";
import { collection, getDocs, updateDoc, doc, } from "firebase/firestore";
import ProductsList from "./ProductsList";
import { Box, Button, Modal, TextField } from "@mui/material";
import { usecontextGlobal } from '../../../context/GlobalContext'
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [isChange, setIsChange] = useState(false);
  const [open, setOpen] = useState(false);
  const [shipmentCost, setShipmentCost] = useState(null);
  const { productDispatch } = usecontextGlobal();
  const navigate = useNavigate();
  //armar un newArr con data y id, que vienen por separado
  useEffect(() => {
    setIsChange(false);
    let prodcutsCollection = collection(db, "products");
    getDocs(prodcutsCollection).then((res) => {
      const newArr = res.docs.map((product) => {
        return {
          ...product.data(),
          id: product.id,
        };
      });
      setProducts(newArr);
    });
  }, [isChange]);

  const handleClose = () => {
    setOpen(false);
  };
  // const handleClick = () => {
  //   // Navegar a la página de categorías ("/categoria" en este ejemplo)
  //   navigate("/categoria");
  // }
  

//actualizar el costo de envio
  const updateShipment = async()=>{
    updateDoc( doc(db, "shipment", "8jLICZNG3Y8O9Y3YpOmp"), {cost:shipmentCost } )
    productDispatch({ type: "SHIPMENT_COST", payload: shipmentCost });
    setOpen(false)
  }
  

  return (
    <div>
    
    <Button
        variant="contained"
        color="success"
        onClick={() => setOpen(true)}
        style={{ marginBottom: '20px', marginRight: '10px' }}
      >
        Costo de envío
      </Button>

     

       {/* <Button variant="contained" onClick={() => handleOpen(null)}>
        Agregar nuevo
      </Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            label="Costo"
            onChange={(e) => setShipmentCost(+e.target.value)}
          />
          <Button onClick={updateShipment}>Modificar</Button>
        </Box>
      </Modal>
      <ProductsList products={products} setIsChange={setIsChange} />
    </div>
  );
};

export default Dashboard;
