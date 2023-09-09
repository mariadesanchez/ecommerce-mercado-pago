import { useContext, useEffect } from "react"
import { useState } from "react"
import { db } from "../../../firebaseConfig"
import {getDocs, collection, query, where} from "firebase/firestore"
import { AuthContext } from "../../../context/AuthContext"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const UserOrders = () => {

  const [myOrders, setMyOrders] = useState([])
  const {user} = useContext(AuthContext)

  useEffect(()=>{

    const ordersCollections = collection(db, "orders")
    let ordersFiltered = query( ordersCollections, where("email", "==", user.email) )
    getDocs(ordersFiltered).then(res => {
      const newArr = res.docs.map( order => {
        return {...order.data(), id: order.id}
      })
      setMyOrders(newArr)
    }).catch(error => console.log(error))


  },[user.email])

console.log(myOrders)
  return (
    <div>
        {/* <h1>estoy en mis ordenes de compras</h1>
        {
          myOrders.map( order => {
            return <div key={order.id} style={{border:"2px solid black"}}>
              {
                order?.items?.map( product => {
                  return <div key={product.id}>
                      <h2>{product.title}</h2>
                      <h3>{product.quantity}</h3>
                    
                  </div>
                })
              }
              <h4>El total de la orden es {order.total}</h4>
            </div>
          })
        } 
        */}
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: '650',maxWidth:'100%' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {/* <TableCell align="left">id</TableCell> */}
              <TableCell align="left">Producto</TableCell>
              <TableCell align="left">Cantidad</TableCell>
              <TableCell align="left">Precio</TableCell>
              <TableCell align="left">Total</TableCell>
              <TableCell align="left">imagen</TableCell>
             
            
            </TableRow>
          </TableHead>
          <TableBody>
         { myOrders.map( order => {
            return <div key={order.id} style={{border:"2px solid black"}}>
              {
                order?.items?.map( product => {
                  return <div key={product.id}>
        
              <TableRow
                key={product.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
               
                <TableCell component="th" scope="row" align="left">
                  {product.title}
                </TableCell>

                <TableCell component="th" scope="row" align="left">
                  {product.quantity}
                </TableCell>

                <TableCell component="th" scope="row" align="left">
                  {product.unit_price}
                </TableCell>
        
                <TableCell component="th" scope="row" align="left">
                  {order.total}
                </TableCell>

                <TableCell component="th" scope="row" align="left">
                  <img
                    src={product.image}
                    alt=""
                    style={{ width: "80px", height: "80px" }}
                  />
                </TableCell>
              
               
              </TableRow>
               
              </div>
                })
              }
              {/* <h4>El total de la orden es {order.total}</h4> */}
            </div>
          })
        }
        
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default UserOrders