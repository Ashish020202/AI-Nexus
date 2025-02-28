import axios from "axios";
import Mailjet from "node-mailjet";
import { Request,Response } from "express";
import dotenv from 'dotenv';
dotenv.config();
const HUGGING_FACE_TOKEN= process.env.HUGGING_FACE_TOKEN
const HUGGING_FACE_API_URL = process.env.HUGGING_FACE_API_URL_

const generateEmailContent = async (emailType: string, userDetails: string) => {
    const prompt = `Write a professional and structured ${emailType} email based on the following details: ${userDetails}. 
    - Start with a proper greeting.
    - Clearly state the purpose of the email.
    - End with a polite closing statement.
    - Keep the response well-formatted and readable.`;
  
    try {
      const response = await axios.post(
         HUGGING_FACE_API_URL||'',
        { inputs: prompt },
        { headers: { Authorization: `Bearer ${process.env.HUGGING_FACE_TOKEN}` } }
      );
  
      console.log("Full response:", JSON.stringify(response.data, null, 2));
  
      // ✅ Extract the text correctly
      if (Array.isArray(response.data) && response.data.length > 0 && response.data[0].generated_text) {
        return response.data[0].generated_text;
      } else {
        return "Sorry, we couldn't generate the email content. Please try again.";
      }
    } catch (error) {
      console.error("Error generating email:", error);
      return "Error generating email content.";
    }
  };
  
  // Mailjet Email Sender
  const sendEmail = async (to: string, from: string, subject: string, body: string) => {
    const mailjet = Mailjet.apiConnect(process.env.MAILJET_API_KEY!, process.env.MAILJET_SECRET_KEY!);
  
    
  
    try {
      const result = await mailjet.post("send", { version: "v3.1" }).request({
        Messages: [
          {
            From: { Email: from, Name: "Your Service" },
            To: [{ Email: to, Name: "Recipient" }],
            Subject: subject,
            TextPart: body,
            HTMLPart: `<html><body><p>${body.replace(/\n/g, "<br>")}</p></body></html>`, // Proper formatting
          },
        ],
      });
  
      console.log("Mailjet Response:", JSON.stringify(result.body, null, 2));
  
      console.log("Email sent:", result.body);
      return { success: true, data: result.body };
    } catch (error: any) {
      console.error("Error sending email:", error.message);
      return { success: false, error: error.message };
    }
  };

  export const genEmail =async (req: Request, res: any) => {
    const { to, from, emailType, userDetails } = req.body;
  
    if (!to || !from || !emailType || !userDetails) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }
  
    const emailContent = await generateEmailContent(emailType, userDetails);
    const subject = `Automated Email: ${emailType}`;
  
    const emailResponse = await sendEmail(to, from, subject, emailContent);
  
    if (emailResponse.success) {
      res.status(200).json({ success: true, message: "AI-generated email sent successfully!" });
    } else {
      res.status(500).json({ success: false, message: "Failed to send AI-generated email." });
    }
  };