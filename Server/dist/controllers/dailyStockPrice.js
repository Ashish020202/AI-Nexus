"use strict";
// // 2MAGXLF0DV7IXSZE
// import { Request, Response } from "express";
// import { error } from "console";
// import { getstockService } from "../services/dailyStockServices";
// export const getStocksPrice = async (req:Request,res:Response) => {
//     try {
//     const symbol = req.body;
//     if(!symbol) {
//         res.status(400).json({error:"stock symb is req"})
//         return
//     }
//     const stockdata =await getstockService(symbol);
//     console.log("stock data",stockdata);
//     if(!stockdata){
//         res.status(400).json({error:"data not found"})
//         return
//     }
//     res.json(stockdata);
//     } catch (error) {
//         console.error("Error:", error);
//        res.status(500).json({ error: "Internal server error" });
//     }
// }
