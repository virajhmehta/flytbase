import express from "express"
import cors from "cors"
import cookieParser  from "cookie-parser"

const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,

}))

app.use(express.json({limit:"16kb"}))

app.use(express.urlencoded({extended: true, limit: "16kb"}))

app.use(express.static("public"))
app.use(cookieParser())



import userRoutes from './routes/users.js';
import siteRoutes from './routes/sites.js';
import droneRoutes from './routes/drones.js';
import missionRoutes from './routes/missions.js';
import categoryRoutes from './routes/categories.js';


app.use('/api/users', userRoutes);
app.use('/api/sites', siteRoutes);
app.use('/api/drones', droneRoutes);
app.use('/api/missions', missionRoutes);
app.use('/api/categories', categoryRoutes);

export {app}