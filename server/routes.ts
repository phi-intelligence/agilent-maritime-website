import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
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
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });

  // Get all reports
  app.get('/api/reports', async (req, res) => {
    try {
      const { category } = req.query;
      const reports = category && typeof category === 'string' 
        ? await storage.getReportsByCategory(category)
        : await storage.getAllReports();
      res.json(reports);
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });

  // Download report (increments counter)
  app.post('/api/reports/:id/download', async (req, res) => {
    try {
      const { id } = req.params;
      const report = await storage.getReport(id);
      
      if (!report) {
        return res.status(404).json({ success: false, message: 'Report not found' });
      }
      
      await storage.incrementDownloadCount(id);
      res.json({ 
        success: true, 
        downloadUrl: report.filePath,
        fileName: report.title
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });

  // Language content
  app.get('/api/language/:code', async (req, res) => {
    try {
      const { code } = req.params;
      const content = await storage.getLanguageContent(code);
      res.json(content);
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });

  // Search functionality for services and portfolio
  app.get('/api/search', async (req, res) => {
    try {
      const { q, type } = req.query;
      
      // Mock search results for now
      const searchResults = {
        services: [
          { id: '1', title: 'RoRo Operations', description: 'Roll-on/Roll-off vehicle services', type: 'service' },
          { id: '2', title: 'Container Handling', description: 'Container operations and management', type: 'service' },
          { id: '3', title: 'Heavy Lift Cargo', description: 'Specialized heavy lifting operations', type: 'service' },
        ],
        portfolio: [
          { id: '1', title: 'West Africa Vehicle Terminal', description: 'Major RoRo operations project', type: 'portfolio' },
          { id: '2', title: 'Mining Equipment Project', description: 'Heavy lift cargo operations', type: 'portfolio' },
        ]
      };
      
      let results: any[] = [];
      if (type === 'services' || !type) {
        results = results.concat(searchResults.services);
      }
      if (type === 'portfolio' || !type) {
        results = results.concat(searchResults.portfolio);
      }
      
      // Filter by query if provided
      if (q && typeof q === 'string') {
        const query = q.toLowerCase();
        results = results.filter(item => 
          item.title.toLowerCase().includes(query) || 
          item.description.toLowerCase().includes(query)
        );
      }
      
      res.json(results);
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
