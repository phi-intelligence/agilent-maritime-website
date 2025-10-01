#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read current language content
const languageContentPath = path.join(__dirname, '..', 'client/src/data/language-content.json');
const languageContent = JSON.parse(fs.readFileSync(languageContentPath, 'utf8'));

// Reports page structure for all languages
const reportsPageStructure = {
  hero: {
    badge: "📊 Performance & Transparency",
    title: "Reports & Documentation",
    subtitle: "Access our latest financial reports, sustainability initiatives, safety records, and operational performance metrics from our global maritime operations.",
    subscribeUpdates: "Subscribe to Updates",
    downloadAllReports: "Download All Reports",
    stats: [
      { value: "425K+", label: "Vehicles Handled" },
      { value: "99.8%", label: "Safety Score" },
      { value: "96%", label: "Client Satisfaction" }
    ]
  },
  keyMetrics: {
    title: "Key Performance Indicators",
    subtitle: "Latest metrics showcasing our operational excellence and growth.",
    metrics: [
      {
        label: "Vehicles Handled",
        value: "425,000+",
        period: "2023",
        details: "Annual vehicle throughput at Tema Port",
        trend: "+8.5%",
        description: "Total vehicles processed through our RoRo operations"
      },
      {
        label: "RoRo Operations Growth",
        value: "15%",
        period: "YoY",
        details: "Year-over-year growth in operations",
        trend: "+15%",
        description: "Consistent growth in RoRo operations and market share"
      },
      {
        label: "Safety Performance",
        value: "99.8%",
        period: "2023",
        details: "Zero incidents in 2023",
        trend: "0%",
        description: "Outstanding safety record with zero lost-time incidents"
      },
      {
        label: "Client Satisfaction",
        value: "98%",
        period: "2023",
        details: "Customer satisfaction rating",
        trend: "+2%",
        description: "High client satisfaction based on quarterly surveys"
      },
      {
        label: "On-Time Delivery",
        value: "96%",
        period: "2023",
        details: "On-time vessel departures",
        trend: "+3%",
        description: "Reliable scheduling and efficient operations"
      },
      {
        label: "Environmental Score",
        value: "A+",
        period: "2023",
        details: "Environmental compliance rating",
        trend: "Maintained",
        description: "Excellent environmental performance and sustainability"
      }
    ]
  },
  availableReports: {
    title: "Available Reports",
    subtitle: "Download our latest reports and documentation for detailed insights.",
    categories: [
      {
        title: "Annual Reports",
        description: "Comprehensive yearly performance and financial reports",
        reports: [
          { title: "Agilent Maritime Annual Report 2023", date: "March 2024", size: "2.5 MB" },
          { title: "Agilent Maritime Annual Report 2022", date: "March 2023", size: "2.1 MB" },
          { title: "Agilent Maritime Annual Report 2021", date: "March 2022", size: "1.9 MB" }
        ]
      },
      {
        title: "Quarterly Updates",
        description: "Regular operational highlights and performance metrics",
        reports: [
          { title: "Q3 2024 RoRo Operations Update", date: "October 2024", size: "1.2 MB" },
          { title: "Q2 2024 Tema Port Operations Review", date: "July 2024", size: "1.1 MB" },
          { title: "Q1 2024 Financial Summary", date: "April 2024", size: "1.0 MB" }
        ]
      },
      {
        title: "Sustainability Reports",
        description: "Environmental initiatives and ESG compliance documentation",
        reports: [
          { title: "Agilent Maritime Sustainability Report 2023", date: "June 2024", size: "3.2 MB" },
          { title: "Tema Port Environmental Impact Assessment", date: "January 2024", size: "2.8 MB" },
          { title: "Maritime Operations Carbon Footprint Analysis 2023", date: "March 2024", size: "1.5 MB" }
        ]
      },
      {
        title: "Safety & Compliance",
        description: "Safety records, incident reporting, and regulatory compliance",
        reports: [
          { title: "Agilent Maritime Safety Performance 2023", date: "February 2024", size: "2.0 MB" },
          { title: "HSSEQ Management Review 2023", date: "December 2023", size: "1.8 MB" },
          { title: "Port State Control Report - Tema Port", date: "November 2023", size: "1.2 MB" }
        ]
      }
    ]
  },
  transparency: {
    title: "Our Commitment to Transparency",
    description: "At Agilent Maritime, we believe in complete transparency with our stakeholders. Our reports provide comprehensive insights into our financial performance, environmental impact, safety records, and operational excellence.",
    features: [
      "Audited Financial Statements",
      "Third-party Safety Certifications",
      "Environmental Impact Assessments"
    ],
    subscribeButton: "Subscribe to Updates"
  },
  archive: {
    title: "Need Historical Reports?",
    description: "For reports older than 3 years or specific documentation, please contact our team.",
    contactButton: "Contact for Archives"
  }
};

// Add reportsPage to all languages
Object.keys(languageContent).forEach(lang => {
  if (languageContent[lang]) {
    languageContent[lang].reportsPage = JSON.parse(JSON.stringify(reportsPageStructure));
  }
});

// Write updated language content
fs.writeFileSync(languageContentPath, JSON.stringify(languageContent, null, 2));

console.log('✅ Reports page language structure added to all 9 languages');
console.log('📝 Next: Add proper translations for each language');
