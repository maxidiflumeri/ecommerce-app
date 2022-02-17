### ENDPOINT PRODUCTOS ###

GET api/products (Devuelve todos los productos)

Ejemplo de respuesta:

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

GET api/products/:id (Devuelve un producto especificando el numero de id)

Ejemplo de respuesta:

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

POST api/products/ 

Ejemplo body:

{
    "name": "Queso",
    "description": "Queso rallado",
    "code": "545HDGD44",
    "urlPhoto": "http://foto",
    "price": 250,
    "stock": 20   
}

Ejemplo de respuesta:

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

PUT api/products/:id

Ejemplo body:

{
    "name": "Queso",
    "description": "Queso rallado",
    "code": "545HDGD44",
    "urlPhoto": "http://foto",
    "price": 250,
    "stock": 25   
}

Ejemplo de respuesta:

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

DELETE api/products/:id

Ejemplo de respuesta:

{
    "status": 200,
    "message": "OK",
    "data": null
}

### ENDPOINT CARRITO ###

