import { type User, type InsertUser, type Contact, type InsertContact, type Report, type InsertReport, type LanguageContent } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact management
  createContact(contact: InsertContact): Promise<Contact>;
  getAllContacts(): Promise<Contact[]>;
  getContact(id: string): Promise<Contact | undefined>;
  markContactResponded(id: string): Promise<void>;
  
  // Reports management
  getAllReports(): Promise<Report[]>;
  getReportsByCategory(category: string): Promise<Report[]>;
  getReport(id: string): Promise<Report | undefined>;
  incrementDownloadCount(id: string): Promise<void>;
  
  // Language content
  getLanguageContent(languageCode: string): Promise<LanguageContent[]>;
  setLanguageContent(languageCode: string, contentKey: string, content: any): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contacts: Map<string, Contact>;
  private reports: Map<string, Report>;
  private languageContent: Map<string, LanguageContent>;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.reports = new Map();
    this.languageContent = new Map();
    
    // Initialize with sample reports
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample reports
    const sampleReports = [
      {
        id: randomUUID(),
        title: "Annual Report 2023",
        category: "annual",
        filePath: "/reports/annual-2023.pdf",
        fileSize: "2.5 MB",
        publishDate: new Date("2024-03-15"),
        downloadCount: "156"
      },
      {
        id: randomUUID(),
        title: "Q3 2024 Performance Update",
        category: "quarterly",
        filePath: "/reports/q3-2024.pdf",
        fileSize: "1.2 MB",
        publishDate: new Date("2024-10-15"),
        downloadCount: "89"
      },
      {
        id: randomUUID(),
        title: "Sustainability Report 2023",
        category: "sustainability",
        filePath: "/reports/sustainability-2023.pdf",
        fileSize: "3.2 MB",
        publishDate: new Date("2024-06-01"),
        downloadCount: "234"
      }
    ];
    
    sampleReports.forEach(report => {
      this.reports.set(report.id, report);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = {
      ...insertContact,
      id,
      company: insertContact.company || null,
      createdAt: new Date(),
      responded: false
    };
    this.contacts.set(id, contact);
    return contact;
  }
  
  async getAllContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
  
  async getContact(id: string): Promise<Contact | undefined> {
    return this.contacts.get(id);
  }
  
  async markContactResponded(id: string): Promise<void> {
    const contact = this.contacts.get(id);
    if (contact) {
      contact.responded = true;
      this.contacts.set(id, contact);
    }
  }
  
  async getAllReports(): Promise<Report[]> {
    return Array.from(this.reports.values()).sort(
      (a, b) => b.publishDate.getTime() - a.publishDate.getTime()
    );
  }
  
  async getReportsByCategory(category: string): Promise<Report[]> {
    return Array.from(this.reports.values())
      .filter(report => report.category === category)
      .sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime());
  }
  
  async getReport(id: string): Promise<Report | undefined> {
    return this.reports.get(id);
  }
  
  async incrementDownloadCount(id: string): Promise<void> {
    const report = this.reports.get(id);
    if (report && report.downloadCount) {
      const count = parseInt(report.downloadCount) + 1;
      report.downloadCount = count.toString();
      this.reports.set(id, report);
    }
  }
  
  async getLanguageContent(languageCode: string): Promise<LanguageContent[]> {
    return Array.from(this.languageContent.values())
      .filter(content => content.languageCode === languageCode);
  }
  
  async setLanguageContent(languageCode: string, contentKey: string, content: any): Promise<void> {
    const id = `${languageCode}-${contentKey}`;
    const languageContentItem: LanguageContent = {
      id,
      languageCode,
      contentKey,
      content
    };
    this.languageContent.set(id, languageContentItem);
  }
}

export const storage = new MemStorage();
