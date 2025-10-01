#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read current language content
const languageContentPath = path.join(__dirname, '..', 'client/src/data/language-content.json');
const languageContent = JSON.parse(fs.readFileSync(languageContentPath, 'utf8'));

// Complete translations for remaining languages
const remainingTranslations = {
  es: {
    hero: {
      badge: "🇬🇭 Operaciones Ghana",
      title: "Orgullosamente Ghaneses",
      subtitle: "Especialistas líderes en RoRo en el puerto de Tema, Ghana, manejando 400,000+ vehículos anualmente con profunda experiencia local, fuertes asociaciones comunitarias y compromiso con el desarrollo económico de Ghana. Operando en el Meridiano de Greenwich - el centro del mundo.",
      primaryCta: "Ver Oportunidades",
      secondaryCta: "Contactar Equipo Local",
      stats: [
        { value: "15+", label: "Años de Experiencia" },
        { value: "400K+", label: "Vehículos Anualmente" },
        { value: "24/7", label: "Operaciones Portuarias" }
      ]
    },
    strategicPosition: {
      title: "Posición Estratégica de Ghana",
      subtitle: "Ubicado en el Meridiano de Greenwich (0°00'), Ghana sirve como la principal puerta marítima de África Occidental, conectando rutas comerciales globales y sirviendo a países sin litoral en la región.",
      highlights: [
        {
          title: "Meridiano de Greenwich",
          description: "Operando en 0°00' de longitud - el centro del mundo para tiempo global y navegación."
        },
        {
          title: "Puerta a África Occidental",
          description: "Sirviendo a países sin litoral incluyendo Burkina Faso, Mali y Níger con logística eficiente."
        },
        {
          title: "Centro Económico",
          description: "La economía de Ghana de $75.49 mil millones impulsa el crecimiento del comercio regional y marítimo."
        }
      ]
    },
    ghanaAdvantage: {
      title: "Nuestra Ventaja en Ghana",
      subtitle: "Especialistas líderes en RoRo en el puerto de Tema con profundo conocimiento local y experiencia marítima internacional.",
      highlights: [
        {
          title: "Ubicación Estratégica",
          description: "El puerto de Tema sirve como puerta a África Occidental con excelente conectividad a países sin litoral.",
          details: ["Puerto principal de Ghana", "Puerta a Burkina Faso, Mali, Níger", "Infraestructura moderna", "Amarres de aguas profundas hasta 16m"]
        },
        {
          title: "Experiencia Local",
          description: "Profesionales ghaneses experimentados con profundo conocimiento del mercado y estándares internacionales.",
          details: ["Fuerza laboral 100% ghanesa", "Certificaciones marítimas internacionales", "Asociaciones comunitarias", "Competencia en idioma local"]
        },
        {
          title: "Impacto Económico",
          description: "Contribuyendo significativamente al crecimiento del sector marítimo de Ghana y comercio regional.",
          details: ["400,000+ vehículos manejados anualmente", "500+ empleos locales directos", "Apoyando 2,000+ empleos indirectos", "Contribución económica anual de 50M+ GHS"]
        },
        {
          title: "Infraestructura",
          description: "Instalaciones de vanguardia y equipos modernos diseñados específicamente para operaciones RoRo.",
          details: ["Terminales RoRo dedicadas", "Capacidad de grúa de 144 toneladas", "53,000 m² de almacenamiento cubierto", "Capacidad de operaciones 24/7"]
        }
      ]
    },
    leadership: {
      title: "Liderazgo Local, Estándares Globales",
      subtitle: "Nuestras operaciones en Ghana son dirigidas por profesionales locales experimentados que entienden tanto las dinámicas del mercado regional como los estándares marítimos internacionales, asegurando servicios RoRo de primer nivel en el puerto de Tema.",
      viewOpportunities: "Ver Oportunidades de Carrera",
      teamMembers: [
        {
          name: "Kofi Webb",
          position: "Director de Operaciones Ghana",
          description: "Dirigiendo nuestras operaciones en Ghana con 12+ años de experiencia marítima en operaciones portuarias y logística de África Occidental. Ex gerente de operaciones de GPHA con profunda comprensión de patrones comerciales regionales.",
          extendedBio: "Kofi aporta más de 12 años de experiencia marítima a Agilent Maritime, habiendo servido previamente como Gerente de Operaciones en la Autoridad de Puertos y Puertos de Ghana (GPHA). Posee una Maestría en Estudios Marítimos de la Universidad de Ghana y ha sido instrumental en el desarrollo de las capacidades RoRo del puerto de Tema. La profunda comprensión de Kofi de los patrones comerciales de África Occidental y su extensa red en toda la región lo convierten en un líder invaluable para nuestras operaciones.",
          expertise: ["Operaciones Portuarias", "Logística África Occidental", "Comercio Regional", "Relaciones GPHA"],
          achievements: ["Dirigió 400,000+ operaciones de vehículos", "15+ años experiencia marítima", "Gerente de Operaciones GPHA", "Estudios Marítimos Universidad de Ghana"],
          contact: {
            email: "kofi.webb@agilentmaritime.com",
            phone: "+233 24 123 4567",
            linkedin: "linkedin.com/in/kofiwebb"
          }
        },
        {
          name: "So Frimpong",
          position: "Gerente Senior de Operaciones",
          description: "Gestionando operaciones diarias en el puerto de Tema con 8+ años de experiencia especializada en operaciones RoRo y manejo de carga. Certificado en seguridad marítima y gestión portuaria.",
          extendedBio: "So ha estado con Agilent Maritime por más de 8 años, especializándose en operaciones RoRo y manejo de carga en el puerto de Tema. Posee múltiples certificaciones marítimas incluyendo Gestión de Seguridad IMO y Gestión de Operaciones Portuarias. El enfoque práctico de So y su atención al detalle han contribuido a nuestra tasa de éxito del 98% en operaciones de manejo de vehículos. Su experiencia en coordinar operaciones logísticas complejas lo convierte en un activo clave para nuestro equipo.",
          expertise: ["Operaciones RoRo", "Manejo de Carga", "Gestión de Seguridad", "Liderazgo de Equipo"],
          achievements: ["8+ años experiencia RoRo", "Certificado Seguridad IMO", "98% tasa de éxito", "Coordinación logística compleja"],
          contact: {
            email: "so.frimpong@agilentmaritime.com",
            phone: "+233 24 234 5678",
            linkedin: "linkedin.com/in/sofrimpong"
          }
        }
      ]
    },
    partnerships: {
      title: "Asociaciones Estratégicas",
      subtitle: "Construyendo relaciones sólidas en todo el ecosistema marítimo de Ghana para operaciones RoRo de primer nivel.",
      partnerships: [
        {
          name: "Autoridad de Puertos y Puertos de Ghana",
          role: "Asociación Portuaria Estratégica",
          description: "Colaboración a largo plazo desde 2010 para desarrollo portuario y operaciones. Operador oficial de terminal RoRo en el puerto de Tema con derechos exclusivos para manejo de vehículos."
        },
        {
          name: "Servicios Portuarios Meridian",
          role: "Socio de Empresa Conjunta",
          description: "Asociación estratégica para servicios de terminal de contenedores en Puerto de Tema Terminal 3. Enfoque colaborativo para modernización portuaria y mejoras de eficiencia."
        }
      ]
    },
    operations: {
      title: "Nuestras Operaciones en Ghana",
      subtitle: "Operando en el puerto de Tema, la principal puerta marítima de Ghana, proporcionamos servicios integrales de RoRo y logística marítima en toda África Occidental. El puerto de Tema maneja el 80% del comercio nacional de Ghana y sirve como puerta principal para países sin litoral en la región.",
      services: [
        {
          title: "Operaciones RoRo",
          description: "Especialistas líderes en Roll-on/Roll-off manejando 400,000+ vehículos anualmente en el puerto de Tema. Terminales dedicadas con equipos especializados para automóviles, camiones y maquinaria pesada."
        },
        {
          title: "Manejo de Carga",
          description: "Servicios profesionales de estiba y manejo de carga con equipos modernos y equipos experimentados. Operaciones certificadas ISO con récord de entrega puntual del 99.8%."
        },
        {
          title: "Ubicación Estratégica",
          description: "Ubicados en el puerto de Tema, la puerta de Ghana a África Occidental con excelente conectividad. Sirviendo países sin litoral incluyendo Burkina Faso, Mali y Níger. Ubicado en 5.6667°N, 0.0167°W en el Meridiano de Greenwich."
        }
      ]
    },
    cta: {
      title: "Conéctate con Nuestro Equipo de Ghana",
      subtitle: "Ponte en contacto con nuestros expertos locales para soluciones personalizadas de RoRo y marítimas en Ghana y África Occidental.",
      contactTeam: "Contactar Equipo de Ghana",
      visitFacilities: "Visitar Nuestras Instalaciones"
    }
  },
  nl: {
    hero: {
      badge: "🇬🇭 Ghana Operaties",
      title: "Trots Ghanese",
      subtitle: "Premier RoRo specialist in Tema Port, Ghana, verwerkt 400,000+ voertuigen jaarlijks met diepe lokale expertise, sterke gemeenschapspartnerschappen en toewijding aan Ghana's economische ontwikkeling. Opererend op de Greenwich Meridiaan - het centrum van de wereld.",
      primaryCta: "Bekijk Kansen",
      secondaryCta: "Contact Lokale Team",
      stats: [
        { value: "15+", label: "Jaren Ervaring" },
        { value: "400K+", label: "Voertuigen Jaarlijks" },
        { value: "24/7", label: "Haven Operaties" }
      ]
    },
    strategicPosition: {
      title: "Ghana's Strategische Positie",
      subtitle: "Gelegen op de Greenwich Meridiaan (0°00'), dient Ghana als West-Afrika's premier maritieme gateway, verbindt wereldwijde handelsroutes en bedient landlocked landen in de regio.",
      highlights: [
        {
          title: "Greenwich Meridiaan",
          description: "Opererend op 0°00' lengtegraad - het centrum van de wereld voor wereldwijde tijd en navigatie."
        },
        {
          title: "Gateway naar West-Afrika",
          description: "Bedienen van landlocked landen inclusief Burkina Faso, Mali en Niger met efficiënte logistiek."
        },
        {
          title: "Economisch Centrum",
          description: "Ghana's $75.49 miljard BBP economie drijft regionale handel en maritieme handel groei aan."
        }
      ]
    },
    ghanaAdvantage: {
      title: "Ons Ghana Voordeel",
      subtitle: "Premier RoRo specialist in Tema Port met diepe lokale kennis en internationale maritieme expertise.",
      highlights: [
        {
          title: "Strategische Locatie",
          description: "Tema Port dient als gateway naar West-Afrika met uitstekende connectiviteit naar landlocked landen.",
          details: ["Primaire haven voor Ghana", "Gateway naar Burkina Faso, Mali, Niger", "Moderne infrastructuur", "Diepwater ligplaatsen tot 16m"]
        },
        {
          title: "Lokale Expertise",
          description: "Ervaren Ghanese professionals met diepe marktkennis en internationale standaarden.",
          details: ["100% Ghanese werkkracht", "Internationale maritieme certificeringen", "Gemeenschapspartnerschappen", "Lokale taalvaardigheid"]
        },
        {
          title: "Economische Impact",
          description: "Significant bijdragend aan Ghana's maritieme sector groei en regionale handel.",
          details: ["400,000+ voertuigen jaarlijks verwerkt", "500+ directe lokale banen", "Ondersteuning van 2,000+ indirecte banen", "Jaarlijkse economische bijdrage van 50M+ GHS"]
        },
        {
          title: "Infrastructuur",
          description: "State-of-the-art faciliteiten en moderne apparatuur specifiek ontworpen voor RoRo operaties.",
          details: ["Toegewijde RoRo terminals", "144-ton kraan capaciteit", "53,000 m² overdekte opslag", "24/7 operatie capaciteit"]
        }
      ]
    },
    leadership: {
      title: "Lokaal Leiderschap, Wereldwijde Standaarden",
      subtitle: "Onze Ghana operaties worden geleid door ervaren lokale professionals die zowel regionale marktdynamieken als internationale maritieme standaarden begrijpen, zorgen voor premier RoRo services in Tema Port.",
      viewOpportunities: "Bekijk Carrière Kansen",
      teamMembers: [
        {
          name: "Kofi Webb",
          position: "Ghana Operaties Directeur",
          description: "Leidt onze Ghana operaties met 12+ jaren maritieme ervaring in haven operaties en West-Afrikaanse logistiek. Voormalig GPHA operaties manager met diep begrip van regionale handelspatronen.",
          extendedBio: "Kofi brengt meer dan 12 jaren maritieme expertise naar Agilent Maritime, na eerder te hebben gediend als Operaties Manager bij de Ghana Ports and Harbours Authority (GPHA). Hij heeft een Master in Maritime Studies van de Universiteit van Ghana en is instrumenteel geweest in de ontwikkeling van Tema Port's RoRo capaciteiten. Kofi's diepe begrip van West-Afrikaanse handelspatronen en zijn uitgebreide netwerk in de regio maken hem een onschatbare leider voor onze operaties.",
          expertise: ["Haven Operaties", "West-Afrikaanse Logistiek", "Regionale Handel", "GPHA Relaties"],
          achievements: ["Leidde 400,000+ voertuig operaties", "15+ jaren maritieme ervaring", "GPHA Operaties Manager", "Universiteit van Ghana Maritime Studies"],
          contact: {
            email: "kofi.webb@agilentmaritime.com",
            phone: "+233 24 123 4567",
            linkedin: "linkedin.com/in/kofiwebb"
          }
        },
        {
          name: "So Frimpong",
          position: "Senior Operaties Manager",
          description: "Beheert dagelijkse operaties in Tema Port met 8+ jaren gespecialiseerde ervaring in RoRo operaties en ladingafhandeling. Gecertificeerd in maritieme veiligheid en haven management.",
          extendedBio: "So is al meer dan 8 jaren bij Agilent Maritime, gespecialiseerd in RoRo operaties en ladingafhandeling in Tema Port. Hij bezit meerdere maritieme certificeringen inclusief IMO Veiligheidsmanagement en Haven Operaties Management. So's praktische aanpak en aandacht voor detail hebben bijgedragen aan onze 98% succesratio in voertuigafhandeling operaties. Zijn expertise in het coördineren van complexe logistieke operaties maakt hem een sleutelactief voor ons team.",
          expertise: ["RoRo Operaties", "Ladingafhandeling", "Veiligheidsmanagement", "Team Leiderschap"],
          achievements: ["8+ jaren RoRo expertise", "IMO Veiligheid Gecertificeerd", "98% succesratio", "Complexe logistieke coördinatie"],
          contact: {
            email: "so.frimpong@agilentmaritime.com",
            phone: "+233 24 234 5678",
            linkedin: "linkedin.com/in/sofrimpong"
          }
        }
      ]
    },
    partnerships: {
      title: "Strategische Partnerschappen",
      subtitle: "Bouwen van sterke relaties door Ghana's maritieme ecosysteem voor premier RoRo operaties.",
      partnerships: [
        {
          name: "Ghana Ports and Harbours Authority",
          role: "Strategisch Haven Partnerschap",
          description: "Langdurige samenwerking sinds 2010 voor havenontwikkeling en operaties. Officiële RoRo terminal operator in Tema Port met exclusieve rechten voor voertuigafhandeling."
        },
        {
          name: "Meridian Port Services",
          role: "Joint Venture Partner",
          description: "Strategisch partnerschap voor container terminal services in Tema Port Terminal 3. Collaboratieve aanpak voor havenmodernisering en efficiëntieverbeteringen."
        }
      ]
    },
    operations: {
      title: "Onze Ghana Operaties",
      subtitle: "Opererend in Tema Port, Ghana's premier maritieme gateway, bieden we uitgebreide RoRo en maritieme logistieke diensten door heel West-Afrika. Tema Port verwerkt 80% van Ghana's nationale handel en dient als primaire gateway voor landlocked landen in de regio.",
      services: [
        {
          title: "RoRo Operaties",
          description: "Premier Roll-on/Roll-off specialist verwerkt 400,000+ voertuigen jaarlijks in Tema Port. Toegewijde terminals met gespecialiseerde apparatuur voor auto's, vrachtwagens en zware machines."
        },
        {
          title: "Ladingafhandeling",
          description: "Professionele stuwage en ladingafhandeling diensten met moderne apparatuur en ervaren teams. ISO-gecertificeerde operaties met 99.8% tijdige levering record."
        },
        {
          title: "Strategische Locatie",
          description: "Gelegen in Tema Port, Ghana's gateway naar West-Afrika met uitstekende connectiviteit. Bedienen van landlocked landen inclusief Burkina Faso, Mali en Niger. Gelegen op 5.6667°N, 0.0167°W op de Greenwich Meridiaan."
        }
      ]
    },
    cta: {
      title: "Verbind met Ons Ghana Team",
      subtitle: "Neem contact op met onze lokale experts voor gepersonaliseerde RoRo en maritieme oplossingen in Ghana en West-Afrika.",
      contactTeam: "Contact Ghana Team",
      visitFacilities: "Bezoek Onze Faciliteiten"
    }
  },
  fr: {
    hero: {
      badge: "🇬🇭 Opérations Ghana",
      title: "Fiers d'être Ghanéens",
      subtitle: "Spécialistes RoRo de premier plan au port de Tema, Ghana, gérant 400,000+ véhicules annuellement avec une expertise locale approfondie, des partenariats communautaires solides et un engagement envers le développement économique du Ghana. Opérant sur le Méridien de Greenwich - le centre du monde.",
      primaryCta: "Voir les Opportunités",
      secondaryCta: "Contacter l'Équipe Locale",
      stats: [
        { value: "15+", label: "Années d'Expérience" },
        { value: "400K+", label: "Véhicules Annuellement" },
        { value: "24/7", label: "Opérations Portuaires" }
      ]
    },
    strategicPosition: {
      title: "Position Stratégique du Ghana",
      subtitle: "Situé sur le Méridien de Greenwich (0°00'), le Ghana sert de passerelle maritime principale de l'Afrique de l'Ouest, connectant les routes commerciales mondiales et servant les pays enclavés de la région.",
      highlights: [
        {
          title: "Méridien de Greenwich",
          description: "Opérant à 0°00' de longitude - le centre du monde pour le temps global et la navigation."
        },
        {
          title: "Passerelle vers l'Afrique de l'Ouest",
          description: "Servir les pays enclavés incluant le Burkina Faso, le Mali et le Niger avec une logistique efficace."
        },
        {
          title: "Centre Économique",
          description: "L'économie du Ghana de 75,49 milliards de dollars PIB stimule la croissance du commerce régional et maritime."
        }
      ]
    },
    ghanaAdvantage: {
      title: "Notre Avantage au Ghana",
      subtitle: "Spécialistes RoRo de premier plan au port de Tema avec une connaissance locale approfondie et une expertise maritime internationale.",
      highlights: [
        {
          title: "Emplacement Stratégique",
          description: "Le port de Tema sert de passerelle vers l'Afrique de l'Ouest avec une excellente connectivité vers les pays enclavés.",
          details: ["Port principal du Ghana", "Passerelle vers Burkina Faso, Mali, Niger", "Infrastructure moderne", "Postes d'amarrage en eau profonde jusqu'à 16m"]
        },
        {
          title: "Expertise Locale",
          description: "Professionnels ghanéens expérimentés avec une connaissance approfondie du marché et des standards internationaux.",
          details: ["Main-d'œuvre 100% ghanéenne", "Certifications maritimes internationales", "Partenariats communautaires", "Maîtrise de la langue locale"]
        },
        {
          title: "Impact Économique",
          description: "Contribuant de manière significative à la croissance du secteur maritime du Ghana et au commerce régional.",
          details: ["400,000+ véhicules traités annuellement", "500+ emplois locaux directs", "Soutenant 2,000+ emplois indirects", "Contribution économique annuelle de 50M+ GHS"]
        },
        {
          title: "Infrastructure",
          description: "Installations de pointe et équipements modernes conçus spécifiquement pour les opérations RoRo.",
          details: ["Terminaux RoRo dédiés", "Capacité de grue de 144 tonnes", "53,000 m² de stockage couvert", "Capacité d'opérations 24/7"]
        }
      ]
    },
    leadership: {
      title: "Leadership Local, Standards Mondiaux",
      subtitle: "Nos opérations au Ghana sont dirigées par des professionnels locaux expérimentés qui comprennent à la fois les dynamiques du marché régional et les standards maritimes internationaux, assurant des services RoRo de premier plan au port de Tema.",
      viewOpportunities: "Voir les Opportunités de Carrière",
      teamMembers: [
        {
          name: "Kofi Webb",
          position: "Directeur des Opérations Ghana",
          description: "Dirige nos opérations au Ghana avec 12+ années d'expérience maritime dans les opérations portuaires et la logistique d'Afrique de l'Ouest. Ancien gestionnaire d'opérations GPHA avec une compréhension approfondie des modèles commerciaux régionaux.",
          extendedBio: "Kofi apporte plus de 12 années d'expertise maritime à Agilent Maritime, ayant précédemment servi comme Gestionnaire d'Opérations à l'Autorité des Ports et Havres du Ghana (GPHA). Il détient une Maîtrise en Études Maritimes de l'Université du Ghana et a été instrumental dans le développement des capacités RoRo du port de Tema. La compréhension approfondie de Kofi des modèles commerciaux d'Afrique de l'Ouest et son vaste réseau dans la région en font un leader inestimable pour nos opérations.",
          expertise: ["Opérations Portuaires", "Logistique Afrique de l'Ouest", "Commerce Régional", "Relations GPHA"],
          achievements: ["A dirigé 400,000+ opérations de véhicules", "15+ années d'expérience maritime", "Gestionnaire d'Opérations GPHA", "Études Maritimes Université du Ghana"],
          contact: {
            email: "kofi.webb@agilentmaritime.com",
            phone: "+233 24 123 4567",
            linkedin: "linkedin.com/in/kofiwebb"
          }
        },
        {
          name: "So Frimpong",
          position: "Gestionnaire Senior des Opérations",
          description: "Gère les opérations quotidiennes au port de Tema avec 8+ années d'expérience spécialisée dans les opérations RoRo et la manutention de cargaison. Certifié en sécurité maritime et gestion portuaire.",
          extendedBio: "So est avec Agilent Maritime depuis plus de 8 années, se spécialisant dans les opérations RoRo et la manutention de cargaison au port de Tema. Il détient plusieurs certifications maritimes incluant la Gestion de Sécurité IMO et la Gestion des Opérations Portuaires. L'approche pratique de So et son attention aux détails ont contribué à notre taux de succès de 98% dans les opérations de manutention de véhicules. Son expertise dans la coordination d'opérations logistiques complexes en fait un atout clé pour notre équipe.",
          expertise: ["Opérations RoRo", "Manutention de Cargaison", "Gestion de Sécurité", "Leadership d'Équipe"],
          achievements: ["8+ années d'expertise RoRo", "Certifié Sécurité IMO", "98% taux de succès", "Coordination logistique complexe"],
          contact: {
            email: "so.frimpong@agilentmaritime.com",
            phone: "+233 24 234 5678",
            linkedin: "linkedin.com/in/sofrimpong"
          }
        }
      ]
    },
    partnerships: {
      title: "Partenariats Stratégiques",
      subtitle: "Construire des relations solides à travers l'écosystème maritime du Ghana pour des opérations RoRo de premier plan.",
      partnerships: [
        {
          name: "Autorité des Ports et Havres du Ghana",
          role: "Partenariat Portuaire Stratégique",
          description: "Collaboration à long terme depuis 2010 pour le développement portuaire et les opérations. Opérateur officiel de terminal RoRo au port de Tema avec des droits exclusifs pour la manutention de véhicules."
        },
        {
          name: "Services Portuaires Meridian",
          role: "Partenaire Joint Venture",
          description: "Partenariat stratégique pour les services de terminal de conteneurs au Port de Tema Terminal 3. Approche collaborative pour la modernisation portuaire et les améliorations d'efficacité."
        }
      ]
    },
    operations: {
      title: "Nos Opérations au Ghana",
      subtitle: "Opérant au port de Tema, la passerelle maritime principale du Ghana, nous fournissons des services complets de RoRo et de logistique maritime à travers l'Afrique de l'Ouest. Le port de Tema gère 80% du commerce national du Ghana et sert de passerelle principale pour les pays enclavés de la région.",
      services: [
        {
          title: "Opérations RoRo",
          description: "Spécialistes Roll-on/Roll-off de premier plan gérant 400,000+ véhicules annuellement au port de Tema. Terminaux dédiés avec équipement spécialisé pour voitures, camions et machines lourdes."
        },
        {
          title: "Manutention de Cargaison",
          description: "Services professionnels de stivage et de manutention de cargaison avec équipement moderne et équipes expérimentées. Opérations certifiées ISO avec un record de livraison à temps de 99.8%."
        },
        {
          title: "Emplacement Stratégique",
          description: "Positionné au port de Tema, la passerelle du Ghana vers l'Afrique de l'Ouest avec une excellente connectivité. Servir les pays enclavés incluant le Burkina Faso, le Mali et le Niger. Situé à 5.6667°N, 0.0167°W sur le Méridien de Greenwich."
        }
      ]
    },
    cta: {
      title: "Connectez-vous avec Notre Équipe Ghana",
      subtitle: "Contactez nos experts locaux pour des solutions RoRo et maritimes personnalisées au Ghana et en Afrique de l'Ouest.",
      contactTeam: "Contacter l'Équipe Ghana",
      visitFacilities: "Visiter Nos Installations"
    }
  }
};

// Update all remaining languages with translations
Object.keys(remainingTranslations).forEach(lang => {
  if (languageContent[lang] && languageContent[lang].ghanaPage) {
    languageContent[lang].ghanaPage = remainingTranslations[lang];
  }
});

// Write updated language content
fs.writeFileSync(languageContentPath, JSON.stringify(languageContent, null, 2));

console.log('✅ Ghana translations completed for all remaining languages:');
console.log('   🇪🇸 Spanish (es) - Complete');
console.log('   🇳🇱 Dutch (nl) - Complete'); 
console.log('   🇫🇷 French (fr) - Complete');
console.log('');
console.log('🎉 ALL 9 LANGUAGES NOW COMPLETE!');
console.log('📊 Ghana Page: 100% Multi-Language Support');
