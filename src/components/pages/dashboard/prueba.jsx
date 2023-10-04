return (
  <div>
    <h2>Productos Favoritos</h2>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
      {productosFavoritos.map((product) => {
        return (
          <div
            key={product.id}
            style={{
              border: "1px solid black",
              flex: "1 1 calc(25% - 40px)",
              padding: "20px",
              boxSizing: "border-box",
              minWidth: "250px",
            }}
          >
            {/* Resto de tu código para mostrar productos favoritos */}
          </div>
        );
      })}
    </div>

    <h2>Todos los Productos</h2>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
      {productos.map((product) => {
        return (
          <div
            key={product.id}
            style={{
              border: "1px solid black",
              flex: "1 1 calc(25% - 40px)",
              padding: "20px",
              boxSizing: "border-box",
              minWidth: "250px",
            }}
          >
            {/* Resto de tu código para mostrar todos los productos */}
          </div>
        );
      })}
    </div>
  </div>
);
