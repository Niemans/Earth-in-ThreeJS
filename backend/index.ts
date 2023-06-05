import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import  * as authRoutes from './routes/userRoutes'
import  * as comRoutes from './routes/commentRoutes'
import  * as flightRoutes from './routes/flightRoutes'
import  * as placeRoutes from './routes/placeRoutes'
import * as errorController from './controllers/errorController'

const app = express();
const ports = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use((req:Request, res:Response, next:NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next()
});


app.use('/auth', authRoutes.router);
app.use('/comment', comRoutes.router);
app.use('/place', placeRoutes.router);
app.use('/flight', flightRoutes.router);
app.use(errorController.get404);
app.use(errorController.get500);



app.listen(ports, () => console.log(`port ${ports}`));




