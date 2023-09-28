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

      setNewCategoria({ ...newCategoria, image: url });


    setIsLoading(false);
  };

  const handleChange = (e) => {
    
      setNewCategoria({ ...newCategoria, [e.target.name]: e.target.value });

  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const categoriasCollection = collection(db, "categorias");

      let obj = {
        ...newCategoria,
      
      };
      addDoc(categoriasCollection, obj).then(() => {
   
        handleCloseCategoria();
      });

 
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
          label="nombre"
          name="title"
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
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
          <Button variant="contained" type="submit" color="secondary">
             Crear
          </Button>
        {/* )} */}
      </form>
    </div>
  );
};

export default CategoriasForm;
