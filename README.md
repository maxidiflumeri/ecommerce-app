# CONFIGURACION #

*En la raíz del proyecto crear un archivo llamado '.env' y dentro configurar la siguiente variable*

**PORT=8080**

*Para ejecutar el proyecto en ambiente de desarrollo correr el siguiente comando*

**NPM RUN START:DEV**

*Para ejecutar el proyecto en ambiente de produccion correr el siguiente comando*

**NPM START**

*Para buildear el proyecto correr el siguiente comando*

**NPM RUN BUILD**

*Para limpiar el buildeo del proyecto correr el siguiente comando*

**NPM RUN CLEAN**
# ENDPOINT PRODUCTOS #

**GET api/products (Devuelve todos los productos)**

*Ejemplo de respuesta:*
```
{
    "status": 200,
    "message": "OK",
    "data": [
        {
            "name": "Fideos",
            "description": "Fideos tallarines",
            "code": "875UYQQ21",
            "urlPhoto": "http://foto",
            "price": 80,
            "stock": 45,
            "id": 1
        },
        {
            "name": "Leche",
            "description": "leche descremada",
            "code": "5455HSJKS4",
            "urlPhoto": "http://foto",
            "price": 60,
            "stock": 80,
            "id": 2
        }
    ]
}
```
**GET api/products/:id (Devuelve un producto especificando el numero de id)**

*Ejemplo de respuesta:*
```
{
    "status": 200,
    "message": "OK",
    "data": {
        "name": "Fideos",
        "description": "Fideos tallarines",
        "code": "875UYQQ21",
        "urlPhoto": "http://foto",
        "price": 80,
        "stock": 45,
        "id": 1
    }
}
```
**POST api/products/** 

*Ejemplo body:*
```
{
    "name": "Queso",
    "description": "Queso rallado",
    "code": "545HDGD44",
    "urlPhoto": "http://foto",
    "price": 250,
    "stock": 20   
}
```
*Ejemplo de respuesta:*
```
{
    "status": 200,
    "message": "OK",
    "data": {
        "name": "Queso",
        "description": "Queso rallado",
        "code": "545HDGD44",
        "urlPhoto": "http://foto",
        "price": 250,
        "stock": 20,
        "id": 3
    }
}
```
**PUT api/products/:id**

*Ejemplo body:*
```
{
    "name": "Queso",
    "description": "Queso rallado",
    "code": "545HDGD44",
    "urlPhoto": "http://foto",
    "price": 250,
    "stock": 25   
}
```
*Ejemplo de respuesta:*
```
{
    "status": 200,
    "message": "OK",
    "data": {
        "name": "Queso",
        "description": "Queso rallado",
        "code": "545HDGD44",
        "urlPhoto": "http://foto",
        "price": 250,
        "stock": 25,
        "id": 3
    }
}
```
**DELETE api/products/:id**

*Ejemplo de respuesta:*
```
{
    "status": 200,
    "message": "OK",
    "data": null
}
```
# ENDPOINT CARRITO #

**GET api/carts (Devuelve todos los carritos)**

*Ejemplo de respuesta:*
```
{
    "status": 200,
    "message": "OK",
    "data": [
        {
            "products": [
                {
                    "idProduct": 2,
                    "amount": 20
                }
            ],
            "id": 1
        },
        {
            "products": [
                {
                    "idProduct": 1,
                    "amount": 15
                }
            ],
            "id": 2
        }
    ]
}
```
**GET api/carts/:id (Devuelve un cart especificando el numero de id)**

*Ejemplo de respuesta:*
```
{
    "status": 200,
    "message": "OK",
    "data": {
        "products": [
            {
                "idProduct": 2,
                "amount": 20
            }
        ],
        "id": 1
    }
}
```
**POST api/carts/** 

*Ejemplo body:*
```
{
    "products":
    [
        {
            "idProduct": 1,
            "amount": 15
        }    
    ]
}
```
*Ejemplo de respuesta:*
```
{
    "status": 200,
    "message": "OK",
    "data": {
        "products": [
            {
                "idProduct": 1,
                "amount": 15
            }
        ],
        "id": 2
    }
}
```
**PUT api/carts/:id (se le pasa un id del cart y un body con el producto que queres agregar al carrito)** 

*Ejemplo body:*
```
{
    "products":
    [
        {
            "idProduct": 1,
            "amount": 2
        }    
    ]
}
```
*Ejemplo de respuesta:*
```
{
    "status": 200,
    "message": "OK",
    "data": {
        "products": [
            {
                "idProduct": 2,
                "amount": 20
            },
            {
                "idProduct": 1,
                "amount": 2
            }
        ],
        "id": 1
    }
}
```
**PUT api/carts/:id_cart/product/:id_product (se le pasa un id del cart y un id de producto para eliminar ese producto del carrito)** 

*Ejemplo de respuesta:*
```
{
    "status": 200,
    "message": "OK",
    "data": {
        "products": [
            {
                "idProduct": 1,
                "amount": 2
            }
        ],
        "id": 1
    }
}
```
**DELETE api/carts/:id**

*Ejemplo de respuesta:*
```
{
    "status": 200,
    "message": "OK",
    "data": null
}
```










