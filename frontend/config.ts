
// Here we have localhost url of backend in environment var and on aws deployement we have relative path.

const  BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "/api";


export {BACKEND_URL}