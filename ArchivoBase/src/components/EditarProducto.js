import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editarProductoAction } from "../actions/productoActions";
import { useNavigate } from "react-router-dom";

const EditarProducto = () => {
  //Nuevo state de producto
  const [producto, guardarProducto] = useState({});

  const productoeditar = useSelector((state) => state.productos.productoeditar);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    guardarProducto(productoeditar);
  }, [productoeditar]);

  const onChangeFormulario = (e) => {
    e.preventDefault();
    guardarProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  const submitEditarProducto = (e) => {
    e.preventDefault();

    dispatch(editarProductoAction(producto));
    navigate("/");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Editar producto
            </h2>

            <form onSubmit={(e) => submitEditarProducto(e)}>
              <div className="form-group">
                <label>Nombre producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre producto"
                  name="nombre"
                  value={producto.nombre}
                  onChange={(e) => onChangeFormulario(e)}
                />

                <label>Precio producto</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio producto"
                  name="precio"
                  value={producto.precio}
                  onChange={(e) => onChangeFormulario(e)}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase
              d-block w-100"
              >
                Guardar cambios{" "}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarProducto;
