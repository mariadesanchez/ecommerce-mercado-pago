import React from "react";
import { Paper, Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from "@material-ui/core";

function TuComponente({ products }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left" width="20%">
              Título
            </TableCell>
            <TableCell align="left" width="15%">
              Precio
            </TableCell>
            <TableCell align="left" width="15%">
              Stock
            </TableCell>
            <TableCell align="left" width="15%">
              Imagen
            </TableCell>
            <TableCell align="left" width="20%">
              Categoría
            </TableCell>
            <TableCell align="left" width="15%">
              Editar Producto
            </TableCell>
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
                {product.stock}
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
              <TableCell component="th" scope="row" align="left">
                {/* Tu contenido aquí */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TuComponente;
