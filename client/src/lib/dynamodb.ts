/**
 * DynamoDB Integration for Agilent Maritime
 * Handles contact management and data storage
 */

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, ScanCommand, UpdateCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';

// DynamoDB client configuration
const client = new DynamoDBClient({
  region: process.env.VITE_AWS_REGION || 'us-east-1',
  credentials: process.env.VITE_AWS_ACCESS_KEY_ID && process.env.VITE_AWS_SECRET_ACCESS_KEY ? {
    accessKeyId: process.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.VITE_AWS_SECRET_ACCESS_KEY,
  } : undefined, // Use default credential chain if no explicit credentials
});

const docClient = DynamoDBDocumentClient.from(client);

// Table names
export const TABLES = {
  CONTACTS: process.env.VITE_DYNAMODB_TABLE_NAME || 'agilent-maritime-contacts',
} as const;

// Contact interface
export interface Contact {
  id: string;
  name: string;
  email: string;
  company?: string;
  message: string;
  createdAt: string;
  responded: boolean;
  responseNotes?: string;
}

// DynamoDB operations
export class DynamoDBService {
  // Create a new contact
  static async createContact(contact: Omit<Contact, 'id' | 'createdAt' | 'responded'>): Promise<Contact> {
    const newContact: Contact = {
      ...contact,
      id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      responded: false,
    };

    const command = new PutCommand({
      TableName: TABLES.CONTACTS,
      Item: newContact,
    });

    await docClient.send(command);
    return newContact;
  }

  // Get all contacts
  static async getAllContacts(): Promise<Contact[]> {
    const command = new ScanCommand({
      TableName: TABLES.CONTACTS,
    });

    const result = await docClient.send(command);
    return result.Items as Contact[] || [];
  }

  // Get contact by ID
  static async getContact(id: string): Promise<Contact | null> {
    const command = new GetCommand({
      TableName: TABLES.CONTACTS,
      Key: { id },
    });

    const result = await docClient.send(command);
    return result.Item as Contact || null;
  }

  // Update contact
  static async updateContact(id: string, updates: Partial<Contact>): Promise<Contact | null> {
    const command = new UpdateCommand({
      TableName: TABLES.CONTACTS,
      Key: { id },
      UpdateExpression: 'SET #responded = :responded, #responseNotes = :responseNotes',
      ExpressionAttributeNames: {
        '#responded': 'responded',
        '#responseNotes': 'responseNotes',
      },
      ExpressionAttributeValues: {
        ':responded': updates.responded ?? false,
        ':responseNotes': updates.responseNotes ?? '',
      },
      ReturnValues: 'ALL_NEW',
    });

    const result = await docClient.send(command);
    return result.Attributes as Contact || null;
  }

  // Delete contact
  static async deleteContact(id: string): Promise<boolean> {
    const command = new DeleteCommand({
      TableName: TABLES.CONTACTS,
      Key: { id },
    });

    await docClient.send(command);
    return true;
  }

  // Mark contact as responded
  static async markAsResponded(id: string, responseNotes?: string): Promise<Contact | null> {
    return this.updateContact(id, {
      responded: true,
      responseNotes: responseNotes || '',
    });
  }
}

// Export for use in components
export default DynamoDBService;
