import { getConnection, sql, queries } from '../database';


//esta funcion muestra los datos de la tabla products
export const getProducts = async (req, res) => { 
  try {
    const pool = await getConnection(); //aqui espero la conexion a la bd de datos
    const result = await pool.request().query(queries.getAllProducts); //aqui realizo la consulta
    res.json(result.recordset);
  } catch (error) {
    res.status(500)
    res.send(error.message)
  }
};

//esta funcion CREA UN NUEVO PRODUCTO
export const createNewProduct = async(req, res) => {

  const { name, description } = req.body; //aqui recibo el nombre y la descripcion desde req.body
  let { quantity } = req.body;

  if(name == null || description == null){ //valido de que el nombre y la descripcion no sean null
    return res.status(400).json({msg: 'Bad request. Please fill all fields'}) // retorna un error 400
  }

  if(quantity == null) quantity = 0; //si no se envia cantidad por defecto sera 0

  try {

    const pool = await getConnection();
    const resultado = await  pool.request()
      .input('name', sql.VarChar, name)
      .input('description', sql.Text, description)
      .input('quantity', sql.Int, quantity)
      .query(queries.addNewProduct); //aqui se esta realizando la consulta para crear un nuevo producto

    const id = (JSON.stringify(resultado.recordset[0].Id)); //pasamos la variable a un formato json para poder mostrarlo en el res.json
    
    res.json( { id, name, description, quantity } );

  } catch (error) {

    res.status(500);
    res.send(error.message);

  }


}

export const getTotalProducts = async(req, res) =>{

  const pool = await getConnection();
  const result = await pool
  .request()
  .query(queries.getTotalProducts)

  res.json(result.recordset[0]['']);
}

export const getProductById = async(req, res) =>{

  const { id } = req.params;

  const pool = await getConnection();
  const result = await pool.request()
  .input('Id', id)
  .query(queries.getProductById)

  res.send (result.recordset[0]);

}

export const deleteProductById = async(req, res) =>{

  const { id } = req.params;

  const pool = await getConnection();
  const result = await pool.request()
  .input('Id', id)
  .query(queries.deleteProduct);

  res.sendStatus(204);
}

export const updateProductById = async(req, res) =>{

  const { name, description, quantity } = req.body;

  const { id } = req.params;

  if(name == null || description == null || quantity == null){ //valido de que el nombre y la descripcion no sean null
    return res.status(400).json({msg: 'Bad request. Please fill all fields'}) // retorna un error 400
  }

  const pool = await getConnection();
  await pool.request()
  .input('name', sql.VarChar, name)
  .input('description', sql.Text, description)
  .input('quantity', sql.Int, quantity)
  .input('id', sql.Int, id)
  .query(queries.updateProductbyId)

  res.json({ name, description, quantity })

}