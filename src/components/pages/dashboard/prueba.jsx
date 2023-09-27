<TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {/* <TableCell align="left">id</TableCell> */}
              <TableCell align="left">Producto</TableCell>
              <TableCell align="left">Precio</TableCell>
              <TableCell align="left">imagen</TableCell>
             
            
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
               
                <TableCell component="th" scope="row" align="left">
                  {product.title}
                </TableCell>

                <TableCell component="th" scope="row" align="left">
                  {product.unit_price}
                </TableCell>
        
                <TableCell component="th" scope="row" align="left">
                  <img
                    src={product.image}
                    alt=""
                    style={{ width: "80px", height: "80px" }}
                  />
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  {product.category}
                </TableCell>
               
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>


  useEffect(() => {

      let ordersCollection = collection(db, "favoritos");
      addDoc(ordersCollection, { ...order }).then(
        (res) => {
          setOrderId(res.id);
        }
      )

  // borrar favoritos, armar case en contextGlobal

      // clearFav()
    
  }, [paramValue]);