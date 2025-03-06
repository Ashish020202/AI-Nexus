const { CohereClientV2 } = require('cohere-ai');
import {Request, Response } from "express";
import dotenv from 'dotenv';
dotenv.config();
const Text_API_KEY = process.env.TEXT_API_KEY;


const cohere = new CohereClientV2({
    token:Text_API_KEY,
  });

export const getTextGen = async (req:Request,res:Response) => {

    try {
        const { message } = req.body; // Extract user message from request
    
        if (!message) {
           res.status(400).json({ error: "Message is required" });
           return
        }
    
        const response = await cohere.chat({
          model: "command-r-plus",
          messages: [{ role: "user", content: message }],
        });
    
        res.json(response);
      } catch (error) {
        console.error("Error calling Cohere API:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }

}
