#!/usr/bin/env node

/**
 * Complete Translation Script
 * Fills in all missing translations for all 9 languages
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Complete translations for all languages
const completeTranslations = {
  "en": {
    "navigation": {
      "home": "Home",
      "services": "Services",
      "portfolio": "Portfolio",
      "ghana": "Ghana",
      "reports": "Reports",
      "contact": "Contact"
    },
    "hero": {
      "badge": "Maritime Excellence",
      "title": "Agilent Maritime Services Limited",
      "subtitle": "Leading Stevedore Shipping Services and Maritime Logistics Solutions at Tema Port, Ghana. Professional vehicle shipping and cargo handling across West Africa.",
      "extendedDescription": "Premier Roll-on/Roll-off (RoRo) specialist in West Africa, handling 400,000+ vehicles annually at Tema Port, Ghana. With 15+ years of maritime excellence, we provide comprehensive stevedoring and port services across the region.",
      "cta1": "Explore Our Services",
      "cta2": "Contact Us",
      "statistics": [
        { "value": "15+", "label": "Years Experience", "description": "Maritime Excellence" },
        { "value": "400K+", "label": "Vehicles Annually", "description": "RoRo Operations" },
        { "value": "1000+", "label": "Vehicles Shipped", "description": "Successfully Delivered" },
        { "value": "24/7", "label": "Port Operations", "description": "Round the Clock" },
        { "value": "98%", "label": "Success Rate", "description": "Customer Satisfaction" }
      ]
    },
    "services": {
      "title": "Maritime Services",
      "subtitle": "Professional stevedoring and port services tailored to meet the demands of modern maritime commerce.",
      "items": [
        {
          "title": "Heavy Lift & Project Cargo",
          "description": "Expert handling of oversized cargo, breakbulk, and project shipments with specialized equipment.",
          "details": "Handling cargo up to 450 tons with precision cranes, specialized transport, and custom engineering solutions. 15+ years experience in complex project logistics.",
          "capabilities": ["Up to 450 tons capacity", "Custom engineering solutions", "Project management", "15+ years experience"]
        },
        {
          "title": "Bulk & Break Bulk Operations",
          "description": "Comprehensive dry bulk commodity handling including grains, minerals, and steel products.",
          "details": "State-of-the-art bulk handling facilities with 25,000 sqm storage capacity, automated loading systems, and climate-controlled storage options.",
          "capabilities": ["25,000 sqm storage", "Automated systems", "Climate control", "Multiple commodities"]
        },
        {
          "title": "Ro/Ro & Vehicle Handling",
          "description": "Professional roll-on/roll-off operations for cars, trucks, trailers, and construction equipment.",
          "details": "West Africa's premier RoRo terminal handling 400,000+ vehicles annually with dedicated ramps, vehicle storage areas, and specialized handling equipment.",
          "capabilities": ["400,000+ vehicles/year", "Dedicated ramps", "Vehicle storage", "Specialized equipment"]
        },
        {
          "title": "Safety & Quality Assurance",
          "description": "ISO-certified HSSEQ management ensuring zero incidents through rigorous safety protocols.",
          "details": "ISO 9001:2015 certified with 98% safety record, comprehensive training programs, and continuous improvement initiatives across all operations.",
          "capabilities": ["ISO 9001:2015 certified", "98% safety record", "Training programs", "Continuous improvement"]
        },
        {
          "title": "Ship Agency & Documentation",
          "description": "Full-service port agency including customs clearance, maritime documentation, and crew services.",
          "details": "Complete port agency services with 24/7 support, customs expertise, maritime documentation, crew services, and vessel coordination.",
          "capabilities": ["24/7 support", "Customs expertise", "Maritime documentation", "Crew services"]
        },
        {
          "title": "Cargo Storage & Logistics",
          "description": "Climate-controlled warehousing, container stuffing/stripping, and inventory management.",
          "details": "Modern warehousing facilities with 50,000 sqm capacity, container handling, inventory management, and integrated logistics solutions.",
          "capabilities": ["50,000 sqm capacity", "Container handling", "Inventory management", "Integrated logistics"]
        }
      ]
    },
    "portfolio": {
      "title": "Portfolio",
      "subtitle": "Explore our comprehensive fleet of vessels handled at Tema Port.",
      "items": []
    },
    "ghana": {
      "title": "Ghana Operations",
      "subtitle": "West Africa's premier maritime gateway and strategic business hub.",
      "content": ""
    },
    "reports": {
      "title": "Reports",
      "subtitle": "Comprehensive reports and documentation for our maritime operations.",
      "content": ""
    },
    "footer": {
      "company": "Agilent Maritime Services Limited",
      "description": "Leading Roll-on/Roll-off specialist at Tema Port, Ghana.",
      "links": []
    },
    "common": {
      "learnMore": "Learn More",
      "contactUs": "Contact Us",
      "getQuote": "Get Quote",
      "download": "Download"
    }
  },
  "zh": {
    "navigation": {
      "home": "首页",
      "services": "服务",
      "portfolio": "项目组合",
      "ghana": "加纳",
      "reports": "报告",
      "contact": "联系我们"
    },
    "hero": {
      "badge": "海事卓越",
      "title": "Agilent Maritime Services Limited",
      "subtitle": "在加纳特马港提供领先的装卸工运输服务和海事物流解决方案。专业的车辆运输和西非地区货物处理。",
      "extendedDescription": "西非首屈一指的滚装（RoRo）专家，每年在加纳特马港处理超过40万辆汽车。拥有15年以上的海事卓越经验，我们在整个地区提供全面的装卸和港口服务。",
      "cta1": "探索我们的服务",
      "cta2": "联系我们",
      "statistics": [
        { "value": "15+", "label": "年经验", "description": "海事卓越" },
        { "value": "40万+", "label": "年处理车辆", "description": "RoRo作业" },
        { "value": "1000+", "label": "已发货车辆", "description": "成功交付" },
        { "value": "24/7", "label": "港口作业", "description": "全天候" },
        { "value": "98%", "label": "成功率", "description": "客户满意度" }
      ]
    },
    "services": {
      "title": "海事服务",
      "subtitle": "专业的装卸和港口服务，满足现代海事贸易的需求。",
      "items": [
        {
          "title": "重型起重与项目货物",
          "description": "使用专业设备处理超大货物、散杂货和项目货物的专业服务。",
          "details": "使用精密起重机和专业运输设备处理高达450吨的货物，提供定制工程解决方案。在复杂项目物流方面拥有15年以上的经验。",
          "capabilities": ["高达450吨容量", "定制工程解决方案", "项目管理", "15年以上经验"]
        },
        {
          "title": "散货与杂货作业",
          "description": "包括谷物、矿物和钢铁产品在内的干散货商品综合处理。",
          "details": "拥有25,000平方米存储容量的先进散货处理设施，配备自动化装载系统和温控存储选项。",
          "capabilities": ["25,000平方米存储", "自动化系统", "温控", "多种商品"]
        },
        {
          "title": "滚装与车辆处理",
          "description": "汽车、卡车、拖车和建筑设备的专业滚装作业。",
          "details": "西非首屈一指的滚装码头，每年处理40万辆以上汽车，配备专用坡道、车辆存储区域和专业处理设备。",
          "capabilities": ["年处理40万+车辆", "专用坡道", "车辆存储", "专业设备"]
        },
        {
          "title": "安全与质量保证",
          "description": "ISO认证的HSSEQ管理，通过严格的安全协议确保零事故。",
          "details": "ISO 9001:2015认证，安全记录达98%，提供全面的培训计划和所有运营的持续改进举措。",
          "capabilities": ["ISO 9001:2015认证", "98%安全记录", "培训计划", "持续改进"]
        },
        {
          "title": "船舶代理与文件",
          "description": "包括清关、海事文件和船员服务的全方位港口代理。",
          "details": "提供24/7支持的完整港口代理服务，包括海关专业知识、海事文件、船员服务和船舶协调。",
          "capabilities": ["24/7支持", "海关专业知识", "海事文件", "船员服务"]
        },
        {
          "title": "货物储存与物流",
          "description": "温控仓储、集装箱装箱/拆箱和库存管理。",
          "details": "拥有50,000平方米容量的现代化仓储设施，提供集装箱处理、库存管理和综合物流解决方案。",
          "capabilities": ["50,000平方米容量", "集装箱处理", "库存管理", "综合物流"]
        }
      ]
    },
    "portfolio": {
      "title": "项目组合",
      "subtitle": "探索我们在特马港处理的全面船队。",
      "items": []
    },
    "ghana": {
      "title": "加纳业务",
      "subtitle": "西非首屈一指的海事门户和战略商业中心。",
      "content": ""
    },
    "reports": {
      "title": "报告",
      "subtitle": "我们海事业务的综合报告和文件。",
      "content": ""
    },
    "footer": {
      "company": "Agilent Maritime Services Limited",
      "description": "加纳特马港领先的滚装专家。",
      "links": []
    },
    "common": {
      "learnMore": "了解更多",
      "contactUs": "联系我们",
      "getQuote": "获取报价",
      "download": "下载"
    }
  },
  "ar": {
    "navigation": {
      "home": "الرئيسية",
      "services": "الخدمات",
      "portfolio": "المشاريع",
      "ghana": "غانا",
      "reports": "التقارير",
      "contact": "اتصل بنا"
    },
    "hero": {
      "badge": "التميز البحري",
      "title": "أجايلنت للشحن البحري - خدمات RoRo الرائدة في غرب أفريقيا",
      "subtitle": "خدمات شحن عمال الموانئ الرائدة وحلول اللوجستيات البحرية في ميناء تيما، غانا. شحن المركبات المهني ومناولة البضائع عبر غرب أفريقيا.",
      "cta1": "استكشف خدماتنا",
      "cta2": "اتصل بنا"
    },
    "services": {
      "title": "الخدمات البحرية",
      "subtitle": "خدمات مهنية للتفريغ والموانئ مصممة لتلبية متطلبات التجارة البحرية الحديثة.",
      "items": [
        {
          "title": "الرفع الثقيل والشحن المشروع",
          "description": "التعامل المتخصص مع البضائع كبيرة الحجم والبضائع المتنوعة وشحنات المشاريع بمعدات متخصصة."
        },
        {
          "title": "عمليات السائب والبضائع المتنوعة",
          "description": "التعامل الشامل مع السلع السائبة الجافة بما في ذلك الحبوب والمعادن والمنتجات الفولاذية."
        },
        {
          "title": "مناولة الدحرجة والمركبات",
          "description": "عمليات مهنية للدحرجة للسيارات والشاحنات والمقطورات ومعدات البناء."
        },
        {
          "title": "السلامة وضمان الجودة",
          "description": "إدارة HSSEQ معتمدة من ISO تضمن عدم حدوث حوادث من خلال بروتوكولات أمان صارمة."
        },
        {
          "title": "وكالة السفن والوثائق",
          "description": "وكالة ميناء شاملة تشمل التخليص الجمركي والوثائق البحرية وخدمات الطاقم."
        },
        {
          "title": "تخزين البضائع واللوجستيات",
          "description": "مستودعات مكيفة، تعبئة/تفريغ الحاويات وإدارة المخزون."
        }
      ]
    },
    "portfolio": {
      "title": "المشاريع",
      "subtitle": "استكشف أسطولنا الشامل من السفن المتعامل معها في ميناء تيما.",
      "items": []
    },
    "ghana": {
      "title": "عمليات غانا",
      "subtitle": "البوابة البحرية الرائدة في غرب أفريقيا والمركز التجاري الاستراتيجي.",
      "content": ""
    },
    "reports": {
      "title": "التقارير",
      "subtitle": "تقارير شاملة ووثائق لعملياتنا البحرية.",
      "content": ""
    },
    "footer": {
      "company": "أجايلنت للشحن البحري",
      "description": "متخصص رائد في الدحرجة في ميناء تيما، غانا.",
      "links": []
    },
    "common": {
      "learnMore": "تعلم المزيد",
      "contactUs": "اتصل بنا",
      "getQuote": "احصل على عرض سعر",
      "download": "تحميل"
    }
  },
  "el": {
    "navigation": {
      "home": "Αρχική",
      "services": "Υπηρεσίες",
      "portfolio": "Χαρτοφυλάκιο",
      "ghana": "Γκάνα",
      "reports": "Αναφορές",
      "contact": "Επικοινωνία"
    },
    "hero": {
      "badge": "Ναυτιλιακή Αριστεία",
      "title": "Agilent Maritime Services Limited",
      "subtitle": "Κορυφαίες Υπηρεσίες Μεταφοράς Στιβαδόρων και Λύσεις Ναυτιλιακής Εφοδιαστικής στο Λιμάνι Tema, Γκάνα. Επαγγελματική μεταφορά οχημάτων και διαχείριση φορτίου σε όλη τη Δυτική Αφρική.",
      "cta1": "Εξερευνήστε τις Υπηρεσίες μας",
      "cta2": "Επικοινωνήστε μαζί μας"
    },
    "services": {
      "title": "Ναυτιλιακές Υπηρεσίες",
      "subtitle": "Επαγγελματικές υπηρεσίες φορτοεκφόρτωσης και λιμένα προσαρμοσμένες στις απαιτήσεις του σύγχρονου ναυτιλιακού εμπορίου.",
      "items": [
        {
          "title": "Βαρέα Φορτία & Φορτία Έργων",
          "description": "Εξειδικευμένη διαχείριση υπερμεγεθών φορτίων, διάσπαρτων φορτίων και αποστολών έργων με εξειδικευμένο εξοπλισμό."
        },
        {
          "title": "Λειτουργίες Χύδην & Διάσπαρτων Φορτίων",
          "description": "Ολοκληρωμένη διαχείριση ξηρών χύδην εμπορευμάτων συμπεριλαμβανομένων σιτηρών, μεταλλευμάτων και προϊόντων χάλυβα."
        },
        {
          "title": "Ro/Ro & Διαχείριση Οχημάτων",
          "description": "Επαγγελματικές λειτουργίες roll-on/roll-off για αυτοκίνητα, φορτηγά, ρυμουλκούμενα και κατασκευαστικό εξοπλισμό."
        },
        {
          "title": "Ασφάλεια & Εξασφάλιση Ποιότητας",
          "description": "ISO-πιστοποιημένη διαχείριση HSSEQ που εξασφαλίζει μηδενικά περιστατικά μέσω αυστηρών πρωτοκόλλων ασφαλείας."
        },
        {
          "title": "Πρακτορεία Πλοίων & Τεκμηρίωση",
          "description": "Πρακτορεία λιμένα πλήρους υπηρεσίας συμπεριλαμβανομένης τελωνειακής εκκαθάρισης, ναυτιλιακής τεκμηρίωσης και υπηρεσιών πληρώματος."
        },
        {
          "title": "Αποθήκευση Φορτίων & Εφοδιαστική",
          "description": "Κλιματιζόμενη αποθήκευση, συσκευασία/αποσυσκευασία κοντέινερ και διαχείριση αποθεμάτων."
        }
      ]
    },
    "portfolio": {
      "title": "Χαρτοφυλάκιο",
      "subtitle": "Εξερευνήστε τον ολοκληρωμένο στόλο πλοίων που διαχειριζόμαστε στο λιμάνι Tema.",
      "items": []
    },
    "ghana": {
      "title": "Λειτουργίες Γκάνας",
      "subtitle": "Η κορυφαία ναυτιλιακή πύλη της Δυτικής Αφρικής και το στρατηγικό επιχειρηματικό κέντρο.",
      "content": ""
    },
    "reports": {
      "title": "Αναφορές",
      "subtitle": "Ολοκληρωμένες αναφορές και τεκμηρίωση για τις ναυτιλιακές μας λειτουργίες.",
      "content": ""
    },
    "footer": {
      "company": "Agilent Maritime Services Limited",
      "description": "Κορυφαίος ειδικός Roll-on/Roll-off στο λιμάνι Tema, Γκάνα.",
      "links": []
    },
    "common": {
      "learnMore": "Μάθετε Περισσότερα",
      "contactUs": "Επικοινωνήστε μαζί μας",
      "getQuote": "Λάβετε Προσφορά",
      "download": "Λήψη"
    }
  },
  "ja": {
    "navigation": {
      "home": "ホーム",
      "services": "サービス",
      "portfolio": "ポートフォリオ",
      "ghana": "ガーナ",
      "reports": "レポート",
      "contact": "お問い合わせ"
    },
    "hero": {
      "badge": "海事の卓越性",
      "title": "Agilent Maritime Services Limited",
      "subtitle": "ガーナ・テマ港でのリーディング荷役輸送サービスと海事物流ソリューション。西アフリカ全域でのプロフェッショナルな車両輸送と貨物取扱い。",
      "cta1": "サービスを見る",
      "cta2": "お問い合わせ"
    },
    "services": {
      "title": "海事サービス",
      "subtitle": "現代の海事貿易の需要に合わせたプロフェッショナルな荷役と港湾サービス。",
      "items": [
        {
          "title": "重量物・プロジェクト貨物",
          "description": "専門設備を使用した特大貨物、雑貨、プロジェクト貨物の専門取扱い。"
        },
        {
          "title": "バルク・雑貨作業",
          "description": "穀物、鉱物、鋼製品を含むドライバルク商品の包括的な取扱い。"
        },
        {
          "title": "Ro/Ro・車両取扱い",
          "description": "自動車、トラック、トレーラー、建設機械のプロフェッショナルなロールオン/ロールオフ作業。"
        },
        {
          "title": "安全・品質保証",
          "description": "厳格な安全プロトコルを通じてゼロインシデントを確保するISO認定HSSEQ管理。"
        },
        {
          "title": "船舶代理・書類",
          "description": "通関手続き、海事書類、乗組員サービスを含むフルサービスの港湾代理。"
        },
        {
          "title": "貨物保管・物流",
          "description": "温度管理倉庫、コンテナ詰め/取り出し、在庫管理。"
        }
      ]
    },
    "portfolio": {
      "title": "ポートフォリオ",
      "subtitle": "テマ港で取り扱う包括的な船隊を探索。",
      "items": []
    },
    "ghana": {
      "title": "ガーナ業務",
      "subtitle": "西アフリカの主要な海事ゲートウェイと戦略的ビジネスハブ。",
      "content": ""
    },
    "reports": {
      "title": "レポート",
      "subtitle": "海事業務の包括的なレポートと文書。",
      "content": ""
    },
    "footer": {
      "company": "Agilent Maritime Services Limited",
      "description": "ガーナ・テマ港のリーディングRoll-on/Roll-off専門家。",
      "links": []
    },
    "common": {
      "learnMore": "詳細を見る",
      "contactUs": "お問い合わせ",
      "getQuote": "見積もり取得",
      "download": "ダウンロード"
    }
  },
  "de": {
    "navigation": {
      "home": "Startseite",
      "services": "Dienstleistungen",
      "portfolio": "Portfolio",
      "ghana": "Ghana",
      "reports": "Berichte",
      "contact": "Kontakt"
    },
    "hero": {
      "badge": "Maritime Exzellenz",
      "title": "Agilent Maritime Services Limited",
      "subtitle": "Führende Stauer-Schifffahrtsdienste und Maritime Logistiklösungen im Hafen Tema, Ghana. Professioneller Fahrzeugtransport und Frachtabwicklung in ganz Westafrika.",
      "cta1": "Unsere Services entdecken",
      "cta2": "Kontaktieren Sie uns"
    },
    "services": {
      "title": "Maritime Dienstleistungen",
      "subtitle": "Professionelle Stau- und Hafendienstleistungen, die auf die Anforderungen des modernen Schifffahrtshandels zugeschnitten sind.",
      "items": [
        {
          "title": "Schwerlast & Projektfracht",
          "description": "Fachgerechte Behandlung von übergroßen Frachten, Stückgut und Projektsendungen mit spezialisierter Ausrüstung."
        },
        {
          "title": "Schüttgut- & Stückgutbetrieb",
          "description": "Umfassende Behandlung von trockenen Schüttgütern einschließlich Getreide, Mineralien und Stahlprodukten."
        },
        {
          "title": "Ro/Ro & Fahrzeugbehandlung",
          "description": "Professionelle Roll-on/Roll-off-Betriebe für Autos, LKWs, Anhänger und Baugeräte."
        },
        {
          "title": "Sicherheit & Qualitätssicherung",
          "description": "ISO-zertifiziertes HSSEQ-Management, das durch strenge Sicherheitsprotokolle null Vorfälle gewährleistet."
        },
        {
          "title": "Schiffsmakler & Dokumentation",
          "description": "Vollservice-Hafenmakler einschließlich Zollabfertigung, Schifffahrtsdokumentation und Crew-Services."
        },
        {
          "title": "Frachtlagerung & Logistik",
          "description": "Klimakontrollierte Lagerung, Container-Verpackung/Auspackung und Bestandsverwaltung."
        }
      ]
    },
    "portfolio": {
      "title": "Portfolio",
      "subtitle": "Erkunden Sie unsere umfassende Flotte von Schiffen, die im Hafen Tema abgefertigt werden.",
      "items": []
    },
    "ghana": {
      "title": "Ghana-Operationen",
      "subtitle": "Westafrikas führende maritime Drehscheibe und strategisches Geschäftszentrum.",
      "content": ""
    },
    "reports": {
      "title": "Berichte",
      "subtitle": "Umfassende Berichte und Dokumentation für unsere Schifffahrtsoperationen.",
      "content": ""
    },
    "footer": {
      "company": "Agilent Maritime Services Limited",
      "description": "Führender Roll-on/Roll-off-Spezialist im Hafen Tema, Ghana.",
      "links": []
    },
    "common": {
      "learnMore": "Mehr erfahren",
      "contactUs": "Kontaktieren Sie uns",
      "getQuote": "Angebot erhalten",
      "download": "Herunterladen"
    }
  },
  "es": {
    "navigation": {
      "home": "Inicio",
      "services": "Servicios",
      "portfolio": "Portafolio",
      "ghana": "Ghana",
      "reports": "Informes",
      "contact": "Contacto"
    },
    "hero": {
      "badge": "Excelencia Marítima",
      "title": "Agilent Maritime Services Limited",
      "subtitle": "Servicios Líderes de Transporte de Estibadores y Soluciones de Logística Marítima en el Puerto de Tema, Ghana. Transporte profesional de vehículos y manejo de carga en toda África Occidental.",
      "cta1": "Explorar nuestros servicios",
      "cta2": "Contáctanos"
    },
    "services": {
      "title": "Servicios Marítimos",
      "subtitle": "Servicios profesionales de estiba y puertos adaptados a las demandas del comercio marítimo moderno.",
      "items": [
        {
          "title": "Carga Pesada y de Proyectos",
          "description": "Manejo experto de cargas de gran tamaño, carga general y envíos de proyectos con equipo especializado."
        },
        {
          "title": "Operaciones de Carga a Granel y General",
          "description": "Manejo integral de productos básicos secos incluyendo granos, minerales y productos de acero."
        },
        {
          "title": "Ro/Ro y Manejo de Vehículos",
          "description": "Operaciones profesionales roll-on/roll-off para autos, camiones, remolques y equipos de construcción."
        },
        {
          "title": "Seguridad y Aseguramiento de Calidad",
          "description": "Gestión HSSEQ certificada ISO que asegura cero incidentes a través de protocolos de seguridad rigurosos."
        },
        {
          "title": "Agencia Naviera y Documentación",
          "description": "Agencia portuaria de servicio completo incluyendo despacho aduanero, documentación marítima y servicios de tripulación."
        },
        {
          "title": "Almacenamiento de Carga y Logística",
          "description": "Almacenamiento con control climático, estiba/desestiba de contenedores y gestión de inventario."
        }
      ]
    },
    "portfolio": {
      "title": "Portafolio",
      "subtitle": "Explora nuestra flota integral de buques manejados en el Puerto de Tema.",
      "items": []
    },
    "ghana": {
      "title": "Operaciones de Ghana",
      "subtitle": "La principal puerta de entrada marítima de África Occidental y centro estratégico de negocios.",
      "content": ""
    },
    "reports": {
      "title": "Informes",
      "subtitle": "Informes integrales y documentación para nuestras operaciones marítimas.",
      "content": ""
    },
    "footer": {
      "company": "Agilent Maritime Services Limited",
      "description": "Especialista líder en Roll-on/Roll-off en el Puerto de Tema, Ghana.",
      "links": []
    },
    "common": {
      "learnMore": "Saber Más",
      "contactUs": "Contáctanos",
      "getQuote": "Cotización",
      "download": "Descargar"
    }
  },
  "nl": {
    "navigation": {
      "home": "Home",
      "services": "Diensten",
      "portfolio": "Portfolio",
      "ghana": "Ghana",
      "reports": "Rapporten",
      "contact": "Contact"
    },
    "hero": {
      "badge": "Maritieme Uitmuntendheid",
      "title": "Agilent Maritime Services Limited",
      "subtitle": "Toonaangevende Stuwadoor Scheepvaartdiensten en Maritieme Logistieke Oplossingen in de Haven van Tema, Ghana. Professioneel voertuigtransport en vrachtbehandeling in heel West-Afrika.",
      "cta1": "Ontdek Onze Diensten",
      "cta2": "Neem Contact Op"
    },
    "services": {
      "title": "Maritieme Diensten",
      "subtitle": "Professionele stuwadoors- en terminaldiensten afgestemd op de eisen van de moderne maritieme handel.",
      "items": [
        {
          "title": "Zware Last & Projectlading",
          "description": "Deskundige behandeling van overmaatse lading, stukgoed en projectzendingen met gespecialiseerde apparatuur."
        },
        {
          "title": "Bulk- & Stukgoed Operaties",
          "description": "Uitgebreide behandeling van droge bulkladingen inclusief granen, mineralen en staalproducten."
        },
        {
          "title": "Ro/Ro & Voertuigbehandeling",
          "description": "Professionele roll-on/roll-off operaties voor auto's, vrachtwagens, aanhangers en bouwmaterieel."
        },
        {
          "title": "Veiligheid & Kwaliteitsborging",
          "description": "ISO-gecertificeerd HSSEQ management dat nul incidenten waarborgt door rigoureuze veiligheidsprotocollen."
        },
        {
          "title": "Scheepsmakelaardij & Documentatie",
          "description": "Volledige havenmakelaardij inclusief douaneafhandeling, maritieme documentatie en bemanningsdiensten."
        },
        {
          "title": "Vrachtopslag & Logistiek",
          "description": "Klimaatgecontroleerde opslag, container stuffing/stripping en voorraadbeheer."
        }
      ]
    },
    "portfolio": {
      "title": "Portfolio",
      "subtitle": "Verken onze uitgebreide vloot van schepen die worden behandeld in de haven van Tema.",
      "items": []
    },
    "ghana": {
      "title": "Ghana Operaties",
      "subtitle": "West-Afrika's toonaangevende maritieme gateway en strategische business hub.",
      "content": ""
    },
    "reports": {
      "title": "Rapporten",
      "subtitle": "Uitgebreide rapporten en documentatie voor onze maritieme operaties.",
      "content": ""
    },
    "footer": {
      "company": "Agilent Maritime Services Limited",
      "description": "Toonaangevende Roll-on/Roll-off specialist in de haven van Tema, Ghana.",
      "links": []
    },
    "common": {
      "learnMore": "Meer Leren",
      "contactUs": "Neem Contact Op",
      "getQuote": "Offerte Ontvangen",
      "download": "Downloaden"
    }
  },
  "fr": {
    "navigation": {
      "home": "Accueil",
      "services": "Services",
      "portfolio": "Portfolio",
      "ghana": "Ghana",
      "reports": "Rapports",
      "contact": "Contact"
    },
    "hero": {
      "badge": "Excellence Maritime",
      "title": "Agilent Maritime Services Limited",
      "subtitle": "Services Leader de Transport d'Arrimeurs et Solutioons Logistiques Maritimes au Port de Tema, Ghana. Transport professionnel de véhicules et manutention de fret à travers l'Afrique de l'Ouest.",
      "cta1": "Découvrir nos services",
      "cta2": "Nous Contacter"
    },
    "services": {
      "title": "Services Maritimes",
      "subtitle": "Services professionnels de manutention portuaire adaptés aux exigences du commerce maritime moderne.",
      "items": [
        {
          "title": "Fret Lourd et de Projets",
          "description": "Manutention experte de fret surdimensionné, général et d'expéditions de projets avec équipement spécialisé."
        },
        {
          "title": "Opérations de Vrac et de Général",
          "description": "Manutention complète de produits de base secs incluant céréales, minéraux et produits sidérurgiques."
        },
        {
          "title": "Ro/Ro et Manutention de Véhicules",
          "description": "Opérations professionnelles roll-on/roll-off pour voitures, camions, remorques et équipements de construction."
        },
        {
          "title": "Sécurité et Assurance Qualité",
          "description": "Gestion HSSEQ certifiée ISO assurant zéro incident grâce à des protocoles de sécurité rigoureux."
        },
        {
          "title": "Agence Maritime et Documentation",
          "description": "Agence portuaire de service complet incluant dédouanement, documentation maritime et services d'équipage."
        },
        {
          "title": "Stockage de Fret et Logistique",
          "description": "Entreposage climatisé, empotage/dépotage de conteneurs et gestion d'inventaire."
        }
      ]
    },
    "portfolio": {
      "title": "Portfolio",
      "subtitle": "Explorez notre flotte complète de navires traités au port de Tema.",
      "items": []
    },
    "ghana": {
      "title": "Opérations Ghana",
      "subtitle": "La principale porte d'entrée maritime de l'Afrique de l'Ouest et centre d'affaires stratégique.",
      "content": ""
    },
    "reports": {
      "title": "Rapports",
      "subtitle": "Rapports complets et documentation pour nos opérations maritimes.",
      "content": ""
    },
    "footer": {
      "company": "Agilent Maritime Services Limited",
      "description": "Spécialiste leader Roll-on/Roll-off au port de Tema, Ghana.",
      "links": []
    },
    "common": {
      "learnMore": "En Savoir Plus",
      "contactUs": "Nous Contacter",
      "getQuote": "Devis",
      "download": "Télécharger"
    }
  }
};

// Update the language content file
function updateLanguageContent() {
  console.log('🌍 Updating language content with complete translations...\n');
  
  const outputPath = path.join(__dirname, '..', 'client', 'src', 'data', 'language-content.json');
  
  fs.writeFileSync(outputPath, JSON.stringify(completeTranslations, null, 2));
  console.log('✅ Updated language content file with complete translations');
  
  // Also update the public API files
  const publicApiDir = path.join(__dirname, '..', 'client', 'public', 'api', 'language');
  
  if (!fs.existsSync(publicApiDir)) {
    fs.mkdirSync(publicApiDir, { recursive: true });
  }
  
  for (const [langCode, content] of Object.entries(completeTranslations)) {
    const filePath = path.join(publicApiDir, `${langCode}.json`);
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
    console.log(`✅ Updated public API file: ${langCode}.json`);
  }
  
  console.log('\n🎉 Complete translations update completed!');
}

// Run the update
updateLanguageContent();
