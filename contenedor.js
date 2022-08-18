const { promises: fs } = require('fs');

class Contenedor {

    constructor(ruta){
        this.ruta = ruta;
    }

    //AGREGAR OBJETO
    async save(newObject){
        const objects = await this.getAll();
        let newId;

        if (objects.length == 0) {
            newId = 1;
        }
        else {
            const lastId = objects[objects.length -1].id
            newId = lastId + 1;
        }

        objects.push({id: newId, ...newObject})

        try {
            await fs.writeFile(this.ruta, JSON.stringify(objects, null, 2))
            return newId;
        } 
        catch (error) {
            throw new Error(`Error al agregar el objeto: ${error}`)
        }
    }

    //OBTENER OBJETO POR ID
    async getById(id){
        const objects = await this.getAll();
        const selectedObject = objects.filter(object => object.id === id);

        if (selectedObject.length === 0){
            throw new Error(`Error, no se encontró el id: ${id}`)
        }
        else {
            // console.log(selectedObject)
            return selectedObject;
        }
    }

    //OBTENER TODOS LOS OBJETOS
    async getAll(){
        try {
            const objects = await fs.readFile(this.ruta, 'utf-8')
            // console.log(JSON.parse(objects))
            return JSON.parse(objects)
        } 
        catch (error) {
            throw new Error(`Error al obtener todos los objetos: ${error}`)
        }
    }

    //ELIMINAR OBJETO POR ID
    async deleteById(id){
        const objects = await this.getAll();
        const newObjects = objects.filter(object => object.id != id);

        if (objects.length === newObjects.length){
            throw new Error(`Error, no se encontró el id: ${id}`)
        }
        else {
            try {
                await fs.writeFile(this.ruta, JSON.stringify(newObjects, null, 2))
                return newObjects
            } 
            catch (error) {
                throw new Error(`Error al borrar el objeto: ${error}`)
            }
        }
    }

    //ELIMINAR TODOS LOS OBJETOS
    async deleteAll(){
        try {
            await fs.writeFile(this.ruta, JSON.stringify([], null, 2))
            return []
        } 
        catch (error) {
            throw new Error(`Error al borrar todos los objeto: ${error}`)
        }
    }
}

module.exports = Contenedor;