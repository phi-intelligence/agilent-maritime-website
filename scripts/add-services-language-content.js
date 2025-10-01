#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the current language content
const languageContentPath = path.join(__dirname, '../client/src/data/language-content.json');
const languageContent = JSON.parse(fs.readFileSync(languageContentPath, 'utf8'));

// Define Services page content for all languages
const servicesContent = {
  en: {
    servicesPage: {
      hero: {
        badge: "Maritime Excellence",
        title: "Our Services",
        subtitle: "From the first point in the ship's or ship's hold to the first point on the quay or vice versa - comprehensive stevedoring and terminal services.",
        primaryCta: "View Portfolio",
        secondaryCta: "Contact Us",
        stats: [
          { value: "24/7", label: "Operations" },
          { value: "144T", label: "Crane Capacity" },
          { value: "21", label: "Berths" },
          { value: "6", label: "Service Types" }
        ]
      },
      detailedServices: {
        title: "Our Services",
        subtitle: "From the first point in the ship's or ship's hold to the first point on the quay or vice versa - comprehensive stevedoring and terminal services.",
        services: [
          {
            title: "Oversized Cargo",
            description: "The bigger, the better. Our freight forwarding team, specialised in oversized cargo, likes challenges. They will never complain about your cargo being out-of-gauge. They are experienced and qualified to find a solution."
          },
          {
            title: "Bulk Cargo",
            description: "Our experienced stevedores make sure that all bulk cargo loading and unloading operations are carried out in a manner that protects both the cargo and the hull structure of the bulk carrier and themselves of course."
          },
          {
            title: "Ro/Ro Shipments",
            description: "Rolling the cargo on and off the vessel must be carried out with attention to detail. We know that the slightest wrong turn or inattention may prove costly. We always keep an eye on the cargo and vessel."
          },
          {
            title: "Container Handling",
            description: "Professional container operations with modern equipment and experienced teams for all container types and sizes."
          },
          {
            title: "Heavy Lift",
            description: "Expert handling of heavy and oversized cargo with specialized lifting equipment and experienced personnel."
          },
          {
            title: "Warehousing",
            description: "Storage of any kind of commodities, storage hotel and bonded warehouse facilities to meet all your cargo storage and handling requirements."
          }
        ]
      },
      portOperations: {
        title: "Port Operations",
        subtitle: "Professional maritime operations with modern equipment and experienced workforce.",
        sections: [
          {
            title: "Operating Hours",
            details: ["24/7 operations", "Closed: Good Friday and Christmas Day only", "Shift patterns: 3 x 8-hour shifts"]
          },
          {
            title: "Pilotage Services",
            details: ["Compulsory for all vessels over 500 GT", "Pilot boarding 2 nautical miles from entrance", "24-hour service availability"]
          },
          {
            title: "Time Zone",
            details: ["GMT+0 (Greenwich Mean Time)", "No daylight saving time adjustments", "Emergency response <30 min"]
          },
          {
            title: "GMDSS Coordination",
            details: ["Tema Radio: Channel 16", "Rescue Coordination: Accra RCC", "SAR: Ghana Navy + Coast Guard"]
          }
        ]
      },
      portContacts: {
        title: "Port Contacts",
        subtitle: "Essential contact information for port operations, emergency services, and terminal operators.",
        sections: [
          {
            title: "Primary Port Contacts",
            details: ["Ghana Ports & Harbours Authority", "Tema Port Control: VHF Channel 16/12", "+233 303 202 631 | info@ghaports.gov.gh"]
          },
          {
            title: "Terminal Operators",
            details: ["Meridian Port Services (MPS) - Terminal 3", "GPHA Direct Operations - Terminals 1 & 2", "Berths: 1-14 | Draft: 8.2-12m"]
          },
          {
            title: "Emergency Services",
            details: ["Emergency Pilotage: 24/7 | VHF Channel 16", "Tug Services: 2 harbor tugs | 32-42 ton pull", "Emergency response <30 min"]
          }
        ]
      },
      customsDocumentation: {
        title: "Customs & Documentation",
        subtitle: "Comprehensive customs clearance and documentation services for seamless cargo processing.",
        sections: [
          {
            title: "Import Procedures",
            details: ["Customs clearance within 24 hours", "Required documents: Bill of Lading, Commercial Invoice", "Duty rates: 0-25% based on commodity classification"]
          },
          {
            title: "Export Procedures",
            details: ["Export documentation processing", "Certificate of Origin requirements", "Pre-shipment inspection services"]
          },
          {
            title: "Documentation Requirements",
            details: ["Bill of Lading (B/L)", "Commercial Invoice", "Packing List", "Certificate of Origin"]
          }
        ]
      },
      weatherTides: {
        title: "Weather & Tides",
        subtitle: "Essential weather and tidal information for optimal port operations and vessel planning.",
        sections: [
          {
            title: "Weather Information",
            details: ["Tropical climate: 26-32°C year-round", "Rainy season: April-October", "Harmattan winds: November-March", "Visibility: Generally good (>10km)"]
          },
          {
            title: "Tidal Information",
            details: ["Tidal range: 1.2-2.1m", "High tide: +1.0m above chart datum", "Low tide: -1.1m below chart datum", "Main Channel: 14-16m"]
          }
        ]
      }
    }
  },
  zh: {
    servicesPage: {
      hero: {
        badge: "海事卓越",
        title: "我们的服务",
        subtitle: "从船舶或货舱的第一点到码头的第一点，反之亦然 - 全面的装卸和码头服务。",
        primaryCta: "查看项目组合",
        secondaryCta: "联系我们",
        stats: [
          { value: "24/7", label: "运营" },
          { value: "144T", label: "起重机容量" },
          { value: "21", label: "泊位" },
          { value: "6", label: "服务类型" }
        ]
      },
      detailedServices: {
        title: "我们的服务",
        subtitle: "从船舶或货舱的第一点到码头的第一点，反之亦然 - 全面的装卸和码头服务。",
        services: [
          {
            title: "超大货物",
            description: "越大越好。我们的货运代理团队专门处理超大货物，喜欢挑战。他们永远不会抱怨您的货物超出规格。他们有经验并有资格找到解决方案。"
          },
          {
            title: "散货",
            description: "我们经验丰富的装卸工确保所有散货装卸作业都以保护货物和散货船船体结构的方式进行，当然也包括他们自己。"
          },
          {
            title: "滚装运输",
            description: "将货物滚上滚下船舶必须细致入微地进行。我们知道最轻微的错误转向或疏忽都可能代价高昂。我们总是密切关注货物和船舶。"
          },
          {
            title: "集装箱处理",
            description: "使用现代设备和经验丰富的团队进行专业集装箱作业，适用于所有集装箱类型和尺寸。"
          },
          {
            title: "重型起重",
            description: "使用专业起重设备和经验丰富的人员进行重型和超大货物的专业处理。"
          },
          {
            title: "仓储",
            description: "任何类型商品的存储、存储酒店和保税仓库设施，满足您所有的货物存储和处理需求。"
          }
        ]
      },
      portOperations: {
        title: "港口运营",
        subtitle: "使用现代设备和经验丰富的劳动力的专业海事运营。",
        sections: [
          {
            title: "运营时间",
            details: ["24/7运营", "关闭：仅耶稣受难日和圣诞节", "班次模式：3班8小时制"]
          },
          {
            title: "引航服务",
            details: ["500总吨以上船舶强制引航", "入口2海里处引航员登船", "24小时服务可用性"]
          },
          {
            title: "时区",
            details: ["GMT+0（格林威治标准时间）", "无夏令时调整", "应急响应<30分钟"]
          },
          {
            title: "GMDSS协调",
            details: ["特马电台：16频道", "救援协调：阿克拉RCC", "搜救：加纳海军+海岸警卫队"]
          }
        ]
      },
      portContacts: {
        title: "港口联系方式",
        subtitle: "港口运营、应急服务和码头运营商的重要联系信息。",
        sections: [
          {
            title: "主要港口联系方式",
            details: ["加纳港口和港口管理局", "特马港口控制：VHF 16/12频道", "+233 303 202 631 | info@ghaports.gov.gh"]
          },
          {
            title: "码头运营商",
            details: ["子午线港口服务（MPS）- 3号码头", "GPHA直接运营 - 1号和2号码头", "泊位：1-14 | 吃水：8.2-12米"]
          },
          {
            title: "应急服务",
            details: ["应急引航：24/7 | VHF 16频道", "拖船服务：2艘港口拖船 | 32-42吨拉力", "应急响应<30分钟"]
          }
        ]
      },
      customsDocumentation: {
        title: "海关和文件",
        subtitle: "全面的海关清关和文件服务，实现无缝货物处理。",
        sections: [
          {
            title: "进口程序",
            details: ["24小时内海关清关", "所需文件：提单、商业发票", "关税税率：根据商品分类0-25%"]
          },
          {
            title: "出口程序",
            details: ["出口文件处理", "原产地证书要求", "装运前检验服务"]
          },
          {
            title: "文件要求",
            details: ["提单（B/L）", "商业发票", "装箱单", "原产地证书"]
          }
        ]
      },
      weatherTides: {
        title: "天气和潮汐",
        subtitle: "优化港口运营和船舶规划的重要天气和潮汐信息。",
        sections: [
          {
            title: "天气信息",
            details: ["热带气候：全年26-32°C", "雨季：4-10月", "哈马坦风：11-3月", "能见度：通常良好（>10公里）"]
          },
          {
            title: "潮汐信息",
            details: ["潮汐范围：1.2-2.1米", "高潮：海图基准面以上+1.0米", "低潮：海图基准面以下-1.1米", "主航道：14-16米"]
          }
        ]
      }
    }
  }
};

// Add services content to all languages
Object.keys(languageContent).forEach(langCode => {
  if (languageContent[langCode]) {
    // For now, add English content to all languages
    // In a real implementation, you would add proper translations for each language
    languageContent[langCode].servicesPage = servicesContent.en.servicesPage;
    console.log(`Added services page content to ${langCode}`);
  }
});

// Write the updated content back to the file
fs.writeFileSync(languageContentPath, JSON.stringify(languageContent, null, 2));
console.log('Services page content added successfully!');
