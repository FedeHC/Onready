/*
Ejercicio Onready
Imaginemos una concesionaria de autos y motos.
Crear un programa cuyo punto de entrada sea un index.js en donde, al ejecutarse, se visualiza lo siguiente por consola y se termina la ejecución:

Marca: Peugeot // Modelo: 206 // Puertas: 4 // Precio: $200.000,00
Marca: Honda // Modelo: Titan // Cilindrada: 125c // Precio: $60.000,00
Marca: Peugeot // Modelo: 208 // Puertas: 5 // Precio: $250.000,00
Marca: Yamaha // Modelo: YBR // Cilindrada: 160c // Precio: $80.500,50
=============================
Vehículo más caro: Peugeot 208
Vehículo más barato: Honda Titan
Vehículo que contiene en el modelo la letra ‘Y’: Yamaha YBR $80.500,50

Ejercicio extra (si lo haces sumas puntos)
=============================
Vehículos ordenados por precio de mayor a menor:
Peugeot 208
Peugeot 206
Yamaha YBR
Honda Titan

La solución debe cumplir con los siguientes requisitos:
- Diseñar una solución orientada a objetos..
- La salida es por consola y exactamente como se requiere.
- Usar solamente librerías provistas por Node JS.
- Cargar la lista de autos en un único método. No hay ingreso por pantalla de ningún tipo.
- El algoritmo usado para la impresión no tiene que depender de la cantidad, modelo o tipo de autos
- El entregable deberá ser la URL de un repositorio Git público para que podamos descargar directamente.

Cualquier consulta no duden en preguntar a busquedas@onready.com.ar
*/

class Vehiculos {
  
  constructor() {
    this.vehiculos = new Array();   // Array donde se guardarán todos los objetos vehículos.
  }

  cargar() {
    /* Método que carga manualmente la lista de vehículos en el array previamente creado
    por el constructor de la clase. */
    this.vehiculos.push({'marca': 'peugeot', 'modelo': 206, 'puertas': 4, 'precio': 200000});
    this.vehiculos.push({'marca': 'honda', 'modelo': 'titan', 'cilindrada': '125c', 'precio': 60000});
    this.vehiculos.push({'marca': 'peugeot', 'modelo': 208, 'puertas': 5, 'precio': 250000});
    this.vehiculos.push({'marca': 'yamaha', 'modelo': 'YBR', 'cilindrada': '160c', 'precio': 80500.5});
  }

  buscarPorPrecio(orden) {
    /* Método que devuelve marca y modelo de un elemento del array vehículos de acuerdo a un string
    recibido, que determina el orden en el que se busca por precio.
    De recibir un string, se devuelve un objeto de acuerdo al precio según la orden recibida.
    De no recibir un argumento del tipo string, se devuelve 'TypeError'.
    Y de no recibir una orden válida, se devuelve 'Error'. */
    
    let vehiculo;                         // Variable donde se guardará el objeto vehículo buscado.

    if(typeof orden === "string") {
      orden = orden.trim().toLowerCase(); // Quitando espacios y pasando a minúsculas para evitar problemas.

      if(orden === "caro") {   
        for(let v of this.vehiculos)
          if(vehiculo === undefined || v.precio > vehiculo.precio)
            vehiculo = v;           
      }
      else if(orden === "barato") {
        for(let v of this.vehiculos)
          if(vehiculo === undefined || v.precio < vehiculo.precio)
            vehiculo = v;           
      }   
      else
        throw new Error("No se ha recibido una orden válida en método 'buscarPorPrecio'.");
        
      // Mostrando resultado por consola.
      console.log(`Vehículo más ${orden}: ${this.capitalizar(vehiculo?.marca)} ${this.capitalizar(vehiculo?.modelo)}`);
    }
    else
      throw new TypeError("No se ha recibido un string en método 'buscarPorPrecio'.");
  }

  buscarLetraEnModelo(letra) {
    /* Método que busca en todo el array vehículos sobre el campo 'modelo' una letra recibida como
    argumento, del tipo string.
    De no recibirse un argumento en formato string, se devuelve TypeError.
    De recibirse más de una letra como string (excluyendo espacios), se devuelve 'Error' con mensaje corresp.
    De recibirse una letra, se devuelve el elemento del array que concuerde con el criterio, si existe. */
    
    let vehiculo;                                 // Variable donde se guardará el objeto vehículo buscado.

    if(typeof letra === "string") {
      letra = String(letra).trim().toLowerCase(); // Parseando por si es n° (y se quita espacios y se pasa a minúsculas).

      if(letra.length != 1)
        throw new Error("Se ha recibido más de una letra como argumento en método 'buscarLetraEnModelo'.");

      for(let v of this.vehiculos) {
        let modelo = String(v.modelo).toLowerCase();  // El modelo puede ser un n° o estar en mayúsculas...
        if(modelo.includes(letra))                    // Buscando letra en modelo.
          vehiculo = v;
      }

      // Mostrando resultado por consola.
      console.log(`Vehículo que contiene en el modelo la letra ‘${letra.toUpperCase()}‘: ${this.capitalizar(vehiculo?.marca)} ${this.capitalizar(vehiculo?.modelo)} \$${this.formatear(vehiculo?.precio)}`);
    }
    else
      throw new TypeError("No se ha recibido como argumento un string en método 'buscarLetraEnModelo'.");
  }

  mostrar(campos) {
    /* Método que muestra por consola el contenido del array 'vehículos', o algunos de sus campos
    según string recibido.
    */
    let datos = "";             // String que devolverá formateado el contenido de todos los vehículos.
    
    if(campos === undefined) {  // Si no se recibe campos en particular como argumento, obtener todos.
      for(let v of this.vehiculos) {
        for(let p in v)
          if(p !== "precio")    // Mientras no sea 'precio', mostrar doble barra al final.
            datos += `${this.capitalizar(p)}: ${this.capitalizar(v[p])} // `;
          else                  // Si es 'precio', agregar '$' antes del precio y hacer salto de linea.
            datos += `${this.capitalizar(p)}: \$${this.formatear(v[p])}\n`;
      }
    } 
    // En caso de recibirse un array, agregar del vehículo solo los campos pasados de ese array.
    else if(typeof campos === "object") {
      for(let v of this.vehiculos) {
        for(let campo of campos) {
          if(v.hasOwnProperty(campo)) {
            datos += `${this.capitalizar(v[campo])} `;
          }
        }
        datos += '\n';  // Agregar salto de linea después de recorrer todos los campos de un vehículo.
      }      
    }  
    else
      throw new Error("Variable 'campos' no es del tipo array/objeto en método 'mostrar'.");
    
    console.log(datos);
  }  

  capitalizar(cadena) {
    /* Método que recibe un string o número y devuelve un string equivalente pero capitalizado.
    Si se recibe un número, se lo parsa primero a string para continuar como tal.
    En caso de no recibirse un string o un número, se arroja TypeError. */

    if(typeof cadena === "number")    // Si es número, parsear a string.
      cadena = String(cadena);
    
    if(typeof cadena === "string") {  // Si es string, capitalizar.
      cadena = cadena.trim();
      return cadena[0].toUpperCase() + cadena.substring(1);
    }
    else
      throw new TypeError("No se ha recibido un string o número a parsear en método 'capitalizar'.");
  }
  
  formatear(precio) {
    /* Método que recibe un número (entero o float) y devuelve un string equivalente pero formateado
    con separador de miles y de decimales.
    En caso de no recibir un número, se arroja TypeError. */

    if(typeof precio === "number") {
      // Formatea con puntos para miles y coma seguida de 2 decimales.
      return precio.toLocaleString("es",  {style: 'decimal', minimumFractionDigits: 2});
    }
    else
      throw new TypeError("No se ha recibido un número (entero o float) en método 'formatear'.");
  }

  ordenarPorPrecio(orden="mayor") {
    /* Método que altera array de vehículos en un nuevo órden especificado por argumento (del tipo string).
    De no recibir un argumento del tipo string, se devuelve 'TypeError'.
    Y de no recibir una orden válida, se devuelve 'Error'. */
    
    if(typeof orden === "string") {
      orden = orden.trim().toLowerCase(); // Quitando espacios y pasando a minúsculas para evitar problemas.

      if(orden === "mayor")
        this.vehiculos.sort((a, b) => b.precio-a.precio);

      else if(orden === "menor")
        this.vehiculos.sort((a,b) => a.precio-b.precio);       
        
      else
        throw new Error("No se ha recibido una orden válida en método 'ordenarPorPrecio'.");          
    }    
    else
      throw new TypeError("No se ha recibido un string en método 'ordenarPorPrecio'.");
  }
}

function iniciandoEjercicio() {
  // Función utilizada para crear y usarla clase 'Vehículos'.
  try {
    let v = new Vehiculos();
    v.cargar();
    v.mostrar();
    
    // Lo que pide obligatoriamente el ejercicio:
    console.log("=============================");
    v.buscarPorPrecio(orden="caro");
    v.buscarPorPrecio(orden="barato");
    v.buscarLetraEnModelo(letra="Y")

    // Ejercicio extra:
    console.log("=============================");
    v.ordenarPorPrecio(orden="mayor");
    v.mostrar(["marca", "modelo"]);
  }
  catch(e) {
    console.log(`\n# Se produjo: ${e.name}.`);
    console.log(`  - Mensaje: "${e.message}".\n`);
  }
}

// Ejecutando finalmente el ejercicio:
iniciandoEjercicio();
