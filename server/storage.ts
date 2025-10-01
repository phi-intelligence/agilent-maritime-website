import { type User, type InsertUser, type Contact, type InsertContact } from "@shared/schema";
import { randomUUID } from "crypto";
import { DatabaseStorage } from "./database-storage";

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
  deleteContact(id: string): Promise<void>;
  
  
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contacts: Map<string, Contact>;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
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

  async deleteContact(id: string): Promise<void> {
    this.contacts.delete(id);
  }
}

// Use database storage in production, fallback to memory storage for development
export const storage = process.env.NODE_ENV === 'production' 
  ? new DatabaseStorage() 
  : new MemStorage();
