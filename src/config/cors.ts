import { CorsOptions } from "cors";


export const corsConfig : CorsOptions = {
    origin: function(origin,callback){
        const whitelist = [process.env.FRONTEND_URL]

        // para que pueda hacer peticiones entre postman y react sint ener que desactivar el cors. el undefined es el origin de postman como de thunderclient
        if(process.argv[2] === '--api'){
            whitelist.push(undefined)
        }
        if(whitelist.includes(origin)) {
            callback(null,true)
        }else{
            callback(new Error('Error de CORS'))
        }
    }
}