import { predictHandler, historyHandler } from "./handlers.js";

export const routes = [
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Hello, World!';
        }
    },
    {
        method: 'POST',
        path: '/predict',
        handler: predictHandler,
        options: {
            payload: {
                allow: 'multipart/form-data',
                multipart: true,
                maxBytes: 1000000
            }
        }
    },
    {
        method: 'GET',
        path: '/predict/histories',
        handler: historyHandler
    }
]