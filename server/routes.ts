import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve static assets from attached_assets
  app.use('/attached_assets', express.static(path.resolve(import.meta.dirname, '..', 'attached_assets')));

  // Contact form submission
  app.post('/api/contact', async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      res.json({ success: true, id: contact.id, message: 'Contact form submitted successfully' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: 'Internal server error' });
      }
    }
  });

  // Get all contacts (admin)
  app.get('/api/contacts', async (req, res) => {
    try {
      const contacts = await storage.getAllContacts();
      res.json(contacts);
    } catch (error) {
      console.error('Database error in /api/contacts:', error);
      res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
  });

  // Mark contact as responded
  app.patch('/api/contacts/:id/responded', async (req, res) => {
    try {
      const { id } = req.params;
      await storage.markContactResponded(id);
      res.json({ success: true, message: 'Contact marked as responded' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });

  // Delete contact
  app.delete('/api/contacts/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteContact(id);
      res.json({ success: true, message: 'Contact deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });




  const httpServer = createServer(app);
  return httpServer;
}
