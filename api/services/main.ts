import { Request, Response } from 'express';

const main = async(req: Request, res: Response) => {
    try {
        //.. 
        res.send('welcome to the spatial api!');
    } catch (error) {
        console.error(error);
    }
}

export default main;