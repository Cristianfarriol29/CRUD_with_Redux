import React, { useState } from "react";

//Dos hooks que nos ayudaran a conectar el componente con el action y que traemos de redux
import { useDispatch, useSelector } from "react-redux";

//Actions de redux
import { crearNuevoProductoAction } from "../actions/productoActions";

const NuevoProducto = ({ history }) => {
  //State del componente, es local
  const [nombre, guardarNombre] = useState("");
  const [precio, guardarPrecio] = useState("");

  //Utilizamos el useDispatch, el cual nos devuelve una funcion
  //tomara como argumento la funcion del action
  //Dispatch se utiliza para llamar las funciones que tengo en mis actions

  const dispatch = useDispatch();

  //Acceder al state del store
  const cargando = useSelector((state) => state.productos.loading);
  const error = useSelector((state) => state.productos.error);

  //Esta funcion llama a la funcion de productoAction
  const agregarProducto = (producto) =>
    dispatch(crearNuevoProductoAction(producto));

  //Cuando el usuario haga submit
  const submitNuevoProducto = (e) => {
    e.preventDefault();

    //Validar formulario
    if (nombre.trim() === "" || precio <= 0) {
      return;
    }

    //Si no hay errores

    //Crear nuevo producto
    agregarProducto({
      nombre,
      precio,
    });

    //Redireccionamos hacia el inicio una vez cargado el producto
    history.push("/");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar nuevo producto
            </h2>

            <form onSubmit={submitNuevoProducto}>
              <div className="form-group">
                <label>Nombre producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre producto"
                  name="nombre"
                  value={nombre}
                  onChange={(e) => guardarNombre(e.target.value)}
                />

                <label>Precio producto</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio producto"
                  name="precio"
                  value={precio}
                  onChange={(e) => guardarPrecio(Number(e.target.value))}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase
                d-block w-100"
              >
                Agregar{" "}
              </button>
            </form>
            {cargando ? <p>Cargando..</p> : null}
            {error ? (
              <p className="alert alert-danger p2">Hubo un error</p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoProducto;
