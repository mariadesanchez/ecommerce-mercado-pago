/* eslint-disable no-undef */
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { db, uploadFile } from "../../../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

const CategoriasForm = ({
  handleCloseCategoria,
  // handleCloseCategoria,
  // setIsChange,
  // productSelected,
  // setProductSelected,
}) => {
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false);

  const [newCategoria, setNewCategoria] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [url, setUrl] = useState(null)
  const [file, setFile] = useState(null);

  const handleImage = async () => {
    setIsLoading(true);
    let url = await uploadFile(file);
    setUrl(url)
    

    // if (productSelected) {
    //   setProductSelected({ ...productSelected, image: url });
    // } else {
      setNewCategoria({ ...newCategoria, image: url });
    // }

    setIsLoading(false);
  };

  const handleChange = (e) => {
    // if (productSelected) {
    //   setProductSelected({
    //     ...productSelected,
    //     [e.target.name]: e.target.value,
    //   });
    // } else {
      setNewCategoria({ ...newCategoria, [e.target.name]: e.target.value });
    // }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const categoriasCollection = collection(db, "categorias");

    // if (productSelected) {
    //   let obj = {
    //     ...productSelected,
    //     unit_price: +productSelected.unit_price,
    //     stock: +productSelected.stock,
    //   };
    //   updateDoc(doc(productsCollection, productSelected.id), obj).then(() => {
    //     setIsChange(true);
    //     handleCloseCategoria();
    //   });
    // } else {
      let obj = {
        ...newCategoria,
        // unit_price: +newProduct.unit_price,
        // stock: +newProduct.stock,
      };
      addDoc(categoriasCollection, obj).then(() => {
        // setIsChange(true);
        handleCloseCategoria();
      });
    // }
 
  };

  return (
    <div>
      <h2>Agregar Nueva Categoría</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <TextField
          variant="outlined"
          // defaultValue={productSelected?.title}
          label="nombre"
          name="title"
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          // defaultValue={productSelected?.description}
          label="descripcion"
          name="description"
          onChange={handleChange}
        />
     
        <div >
          {url && (
          <img
          src={url}
          alt=""
          style={{ width: "80px", height: "80px", border :'none' }}
        />)}
                  <img
                    // src={productSelected?.image}
                    alt=""
                    style={{ width: "80px", height: "80px", border :'none' }}
                  />
      
        </div>
        <TextField type="file" onChange={(e) => setFile(e.target.files[0])} multiple />
        {file && (
          <Button onClick={handleImage} type="button">
            Cargar imagen
          </Button>
         )}
        {/* {file && !isLoading && ( */}
          <Button variant="contained" type="submit" color="secondary">
            {/* {productSelected ? "modificar" :
             "crear"} */}
             Crear
          </Button>
        {/* )} */}
      </form>
    </div>
  );
};

export default CategoriasForm;
