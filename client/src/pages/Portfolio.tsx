import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PortfolioSection } from "@/components/PortfolioSection";
import { PageHero } from "@/components/PageHero";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Ship, Users, Award, TrendingUp, Search, Filter, Eye, X, MapPin, Calendar, Gauge, Anchor } from "lucide-react";
import { VesselCard, VesselDetails } from "@/components/PortfolioCards";
import { VesselTimeline } from "@/components/VesselTimeline";
import { useLocation } from "wouter";
import { useState, useMemo, useRef } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { getAssetUrl, ASSET_PATHS } from "@/utils/assets";

// Enhanced vessel fleet data with comprehensive specifications

// Genuine vessel fleet data from Agilent Maritime operations
const vesselFleet: VesselDetails[] = [
  {
    name: "MV SARIKA NAREE",
    image: getAssetUrl(ASSET_PATHS.VESSELS.MV_SARIKA_NAREE),
    type: "Bulk Carrier",
    series: "MV",
    flagCountry: "🇹🇭 Thailand",
    builtYear: 2015,
    imo: "9726425",
    mmsi: "567123000",
    grossTonnage: 35420,
    deadweight: 63023,
    length: 199.8,
    beam: 32.2,
    draft: 14.2,
    serviceSpeed: 14.5,
    class: "Handymax",
    enginePower: 8200,
    manager: "Star Bulk Management",
    classification: "DNV",
    shipyard: "Sanfu Ship Engineering",
    cargoType: "Bulk Carrier",
    originCountry: "Thailand"
  },
  {
    name: "MV PARADISE ACE",
    image: getAssetUrl(ASSET_PATHS.VESSELS.MV_PARADISE_ACE),
    type: "Vehicles Carrier",
    series: "MV",
    flagCountry: "🇵🇦 Panama",
    builtYear: 2004,
    imo: "9293648",
    mmsi: "352142000",
    grossTonnage: 60175,
    deadweight: 21600,
    length: 199.9,
    beam: 32.2,
    draft: 9.5,
    serviceSpeed: 20.0,
    class: "Large Car Carrier",
    enginePower: 11030,
    manager: "NYK Car Carrier",
    classification: "NK",
    shipyard: "Mitsubishi Heavy Industries Kobe",
    cargoType: "Vehicles Carrier",
    originCountry: "Panama"
  },
  {
    name: "MV MARIA",
    image: getAssetUrl(ASSET_PATHS.VESSELS.MV_MARIA),
    type: "Heavy Lift Cargo",
    series: "MV",
    flagCountry: "🇩🇪 Germany",
    builtYear: 2005,
    imo: "9266566",
    mmsi: "211234000",
    grossTonnage: 12649,
    deadweight: 17400,
    length: 157.5,
    beam: 25,
    draft: 8.5,
    serviceSpeed: 12.5,
    class: "Heavy Lift Type 161",
    enginePower: 4120,
    manager: "SAL Heavy Lift",
    classification: "GL",
    shipyard: "Sietas KG Hamburg",
    cargoType: "Heavy Lift Cargo",
    originCountry: "Germany"
  },
  {
    name: "MV MELINA",
    image: getAssetUrl(ASSET_PATHS.VESSELS.MV_MELINA),
    type: "Bulk Carrier",
    series: "MV",
    flagCountry: "🇱🇷 Liberia",
    builtYear: 2011,
    imo: "9472156",
    mmsi: "636012345",
    grossTonnage: 21922,
    deadweight: 37186,
    length: 179.9,
    beam: 30,
    draft: 11.8,
    serviceSpeed: 14.0,
    class: "Handysize",
    enginePower: 6850,
    manager: "Diana Shipping",
    classification: "ABS",
    shipyard: "Oshima Shipbuilding",
    cargoType: "Bulk Carrier",
    originCountry: "Liberia"
  },
  {
    name: "MV INA LOTTE",
    image: getAssetUrl(ASSET_PATHS.VESSELS.MV_INA_LOTTE),
    type: "Bulk Carrier",
    series: "MV",
    flagCountry: "🇰🇾 Cayman Islands",
    builtYear: 2011,
    imo: "9574030",
    mmsi: "319012345",
    grossTonnage: 22824,
    deadweight: 38267,
    length: 179.9,
    beam: 30,
    draft: 12.2,
    serviceSpeed: 14.0,
    class: "Handysize",
    enginePower: 6850,
    manager: "Blumenthal JMK Hamburg",
    classification: "DNV",
    shipyard: "Imabari Shipbuilding",
    cargoType: "Bulk Carrier",
    originCountry: "Cayman Islands"
  },
  {
    name: "MV JADE 1",
    image: getAssetUrl(ASSET_PATHS.VESSELS.MV_JADE_1),
    type: "Bulk Carrier",
    series: "MV",
    flagCountry: "🇵🇦 Panama",
    builtYear: 1998,
    imo: "9162411",
    mmsi: "370123456",
    grossTonnage: 18915,
    deadweight: 30420,
    length: 169.9,
    beam: 27.2,
    draft: 10.5,
    serviceSpeed: 13.5,
    class: "Handysize",
    enginePower: 5890,
    manager: "Oldendorff Carriers",
    classification: "NK",
    shipyard: "Imabari Shipbuilding",
    cargoType: "Bulk Carrier",
    originCountry: "Panama"
  },
  {
    name: "MV LMZ ARIEL",
    image: getAssetUrl(ASSET_PATHS.VESSELS.MV_LMZ_ARIEL),
    type: "Bulk Carrier",
    series: "MV",
    flagCountry: "🇲🇭 Marshall Islands",
    builtYear: 2009,
    imo: "9445672",
    mmsi: "538012345",
    grossTonnage: 21067,
    deadweight: 35893,
    length: 179.9,
    beam: 28.4,
    draft: 11.8,
    serviceSpeed: 13.8,
    class: "Handysize",
    enginePower: 6450,
    manager: "LMZ Shipping",
    classification: "BV",
    shipyard: "Yangfan Group",
    cargoType: "Bulk Carrier",
    originCountry: "Marshall Islands"
  },
  {
    name: "MV OCEAN MELODY",
    image: getAssetUrl(ASSET_PATHS.VESSELS.MV_OCEAN_MELODY),
    type: "Bulk Carrier",
    series: "MV",
    flagCountry: "🇵🇦 Panama",
    builtYear: 2007,
    imo: "9356784",
    mmsi: "370987654",
    grossTonnage: 28567,
    deadweight: 47892,
    length: 189.9,
    beam: 32.2,
    draft: 13.2,
    serviceSpeed: 14.2,
    class: "Handymax",
    enginePower: 7200,
    manager: "Ocean Melody Shipping",
    classification: "NK",
    shipyard: "Tsuneishi Shipbuilding",
    cargoType: "Bulk Carrier",
    originCountry: "Panama"
  },
  {
    name: "MV WO LONG-SONG",
    image: getAssetUrl(ASSET_PATHS.VESSELS.MV_WO_LONG_SONG),
    type: "Bulk Carrier",
    series: "MV",
    flagCountry: "🇭🇰 Hong Kong",
    builtYear: 2009,
    imo: "9416783",
    mmsi: "563177300",
    grossTonnage: 17858,
    deadweight: 28467,
    length: 169.9,
    beam: 27.2,
    draft: 10.8,
    serviceSpeed: 13.5,
    class: "Handysize",
    enginePower: 5720,
    manager: "Wo Long Shipping",
    classification: "CCS",
    shipyard: "Jiangsu Yangzijiang",
    cargoType: "Bulk Carrier",
    originCountry: "Hong Kong"
  },
  {
    name: "MV LIVADI",
    image: getAssetUrl(ASSET_PATHS.VESSELS.MV_LIVADI),
    type: "Bulk Carrier",
    series: "MV",
    flagCountry: "🇲🇭 Marshall Islands",
    builtYear: 2009,
    imo: "9445698",
    mmsi: "538098765",
    grossTonnage: 35890,
    deadweight: 61245,
    length: 199.9,
    beam: 32.2,
    draft: 14.1,
    serviceSpeed: 14.5,
    class: "Supramax",
    enginePower: 8200,
    manager: "Star Bulk Management",
    classification: "ABS",
    shipyard: "New Century Shipbuilding",
    cargoType: "Bulk Carrier",
    originCountry: "Marshall Islands"
  },
  {
    name: "MV ALPHA BULKER",
    image: getAssetUrl(ASSET_PATHS.VESSELS.MV_ALPHA_BULKER),
    type: "Bulk Carrier",
    series: "MV",
    flagCountry: "🇵🇦 Panama",
    builtYear: 2012,
    imo: "9567234",
    mmsi: "370567890",
    grossTonnage: 37456,
    deadweight: 63782,
    length: 199.9,
    beam: 32.2,
    draft: 14.3,
    serviceSpeed: 14.5,
    class: "Supramax",
    enginePower: 8200,
    manager: "Alpha Marine Management",
    classification: "DNV",
    shipyard: "Chengxi Shipyard",
    cargoType: "Bulk Carrier",
    originCountry: "Panama"
  },
  {
    name: "MV ASIA PEARL II",
    image: getAssetUrl(ASSET_PATHS.VESSELS.MV_ASIA_PEARL_II),
    type: "Bulk Carrier",
    series: "MV",
    flagCountry: "🇸🇬 Singapore",
    builtYear: 2010,
    imo: "9456123",
    mmsi: "566123456",
    grossTonnage: 33567,
    deadweight: 56890,
    length: 190,
    beam: 31,
    draft: 13.5,
    serviceSpeed: 14.0,
    class: "Supramax",
    enginePower: 7800,
    manager: "Asia Pearl Shipping",
    classification: "ABS",
    shipyard: "Shanghai Shipyard",
    cargoType: "Bulk Carrier",
    originCountry: "Singapore"
  },
  {
    name: "MV FEDERAL TOKORO",
    image: getAssetUrl(ASSET_PATHS.VESSELS.MV_FEDERAL_TOKORO),
    type: "Bulk Carrier",
    series: "MV",
    flagCountry: "🇵🇦 Panama",
    builtYear: 2008,
    imo: "9398765",
    mmsi: "370234567",
    grossTonnage: 29876,
    deadweight: 52341,
    length: 189.9,
    beam: 32.2,
    draft: 13.8,
    serviceSpeed: 14.2,
    class: "Handymax",
    enginePower: 7480,
    manager: "Federal Marine",
    classification: "NK",
    shipyard: "Oshima Shipbuilding",
    cargoType: "Bulk Carrier",
    originCountry: "Panama"
  },
  {
    name: "MV STAR KAPPA",
    image: getAssetUrl(ASSET_PATHS.VESSELS.MV_STAR_KAPPA),
    type: "Bulk Carrier",
    series: "MV",
    flagCountry: "🇲🇭 Marshall Islands",
    builtYear: 2012,
    imo: "9567890",
    mmsi: "538567890",
    grossTonnage: 36789,
    deadweight: 63421,
    length: 199.9,
    beam: 32.2,
    draft: 14.2,
    serviceSpeed: 14.5,
    class: "Supramax",
    enginePower: 8200,
    manager: "Star Bulk Carriers",
    classification: "ABS",
    shipyard: "New Times Shipbuilding",
    cargoType: "Bulk Carrier",
    originCountry: "Marshall Islands"
  },
  {
    name: "MV SHRIKE",
    image: getAssetUrl(ASSET_PATHS.VESSELS.MV_SHRIKE),
    type: "Bulk Carrier",
    series: "MV",
    flagCountry: "🇵🇦 Panama",
    builtYear: 2002,
    imo: "9237187",
    mmsi: "538002876",
    grossTonnage: 26534,
    deadweight: 46789,
    length: 189.9,
    beam: 30.5,
    draft: 12.9,
    serviceSpeed: 13.8,
    class: "Handymax",
    enginePower: 6920,
    manager: "Genco Shipping",
    classification: "NK",
    shipyard: "Oshima Shipbuilding",
    cargoType: "Bulk Carrier",
    originCountry: "Panama"
  },
  {
    name: "MV GLOBE TROTTER",
    image: getAssetUrl(ASSET_PATHS.VESSELS.MV_GLOBE_TROTTER),
    type: "Bulk Carrier",
    series: "MV",
    flagCountry: "🇲🇹 Malta",
    builtYear: 2009,
    imo: "9445671",
    mmsi: "248123456",
    grossTonnage: 21067,
    deadweight: 35893,
    length: 179.9,
    beam: 28.4,
    draft: 11.8,
    serviceSpeed: 13.8,
    class: "Handysize",
    enginePower: 6450,
    manager: "Globetrotter Shipping",
    classification: "DNV",
    shipyard: "Yangfan Group",
    cargoType: "Bulk Carrier",
    originCountry: "Malta"
  },
  {
    name: "MV MAGIC SEAS",
    image: getAssetUrl(ASSET_PATHS.VESSELS.MV_MAGIC_SEAS),
    type: "Bulk Carrier",
    series: "MV",
    flagCountry: "🇱🇷 Liberia",
    builtYear: 2016,
    imo: "9736169",
    mmsi: "636091234",
    grossTonnage: 37265,
    deadweight: 63301,
    length: 199.9,
    beam: 32.2,
    draft: 14.2,
    serviceSpeed: 14.5,
    class: "Supramax",
    enginePower: 8200,
    manager: "Allseas Marine Athens",
    classification: "ABS",
    shipyard: "Dayang Shipbuilding",
    cargoType: "Bulk Carrier",
    originCountry: "Liberia"
  },
  {
    name: "MV BALTIC WASP",
    image: getAssetUrl(ASSET_PATHS.VESSELS.MV_BALTIC_WASP),
    type: "Bulk Carrier",
    series: "MV",
    flagCountry: "🇲🇭 Marshall Islands",
    builtYear: 2014,
    imo: "9722015",
    mmsi: "538005900",
    grossTonnage: 37486,
    deadweight: 63389,
    length: 199.9,
    beam: 32.2,
    draft: 14.3,
    serviceSpeed: 14.5,
    class: "Ultramax",
    enginePower: 8200,
    manager: "Genco Shipping",
    classification: "DNV",
    shipyard: "Zhoushan Shipyard",
    cargoType: "Bulk Carrier",
    originCountry: "Marshall Islands"
  },
  {
    name: "MV HA LONG BAY",
    image: getAssetUrl(ASSET_PATHS.VESSELS.MV_HA_LONG_BAY),
    type: "Bulk Carrier",
    series: "MV",
    flagCountry: "🇬🇧 United Kingdom",
    builtYear: 2007,
    imo: "9343625",
    mmsi: "235103287",
    grossTonnage: 28456,
    deadweight: 49876,
    length: 189.9,
    beam: 32.2,
    draft: 13.2,
    serviceSpeed: 14.0,
    class: "Handymax",
    enginePower: 7200,
    manager: "Ha Long Shipping",
    classification: "LR",
    shipyard: "Mitsui Engineering",
    cargoType: "Bulk Carrier",
    originCountry: "United Kingdom"
  },
  {
    name: "MV ARCADIA",
    image: getAssetUrl(ASSET_PATHS.VESSELS.MV_ARCADIA),
    type: "Bulk Carrier",
    series: "MV",
    flagCountry: "🇱🇷 Liberia",
    builtYear: 2009,
    imo: "9445689",
    mmsi: "636098765",
    grossTonnage: 35890,
    deadweight: 61245,
    length: 199.9,
    beam: 32.2,
    draft: 14.1,
    serviceSpeed: 14.5,
    class: "Supramax",
    enginePower: 8200,
    manager: "Arcadia Shipping",
    classification: "ABS",
    shipyard: "New Century Shipbuilding",
    cargoType: "Bulk Carrier",
    originCountry: "Liberia"
  },
  {
    name: "MV PACIFIC VALOR",
    image: getAssetUrl(ASSET_PATHS.VESSELS.MV_PACIFIC_VALOR),
    type: "Bulk Carrier",
    series: "MV",
    flagCountry: "🇭🇰 Hong Kong",
    builtYear: 2010,
    imo: "9456789",
    mmsi: "563456789",
    grossTonnage: 34567,
    deadweight: 58234,
    length: 190,
    beam: 31,
    draft: 13.8,
    serviceSpeed: 14.2,
    class: "Supramax",
    enginePower: 7800,
    manager: "Pacific Valor Shipping",
    classification: "CCS",
    shipyard: "Jiangsu Yangzijiang",
    cargoType: "Bulk Carrier",
    originCountry: "Hong Kong"
  },
  {
    name: "MV FEDERAL SABLE",
    image: getAssetUrl(ASSET_PATHS.VESSELS.MV_FEDERAL_SABLE),
    type: "Bulk Carrier",
    series: "MV",
    flagCountry: "🇲🇭 Marshall Islands",
    builtYear: 2012,
    imo: "9567891",
    mmsi: "538567891",
    grossTonnage: 36789,
    deadweight: 63421,
    length: 199.9,
    beam: 32.2,
    draft: 14.2,
    serviceSpeed: 14.5,
    class: "Supramax",
    enginePower: 8200,
    manager: "Federal Marine",
    classification: "ABS",
    shipyard: "New Times Shipbuilding",
    cargoType: "Bulk Carrier",
    originCountry: "Marshall Islands"
  },
  {
    name: "MV ELIPIDA S",
    image: getAssetUrl(ASSET_PATHS.VESSELS.MV_ELIPIDA_S),
    type: "Bulk Carrier",
    series: "MV",
    flagCountry: "🇬🇷 Greece",
    builtYear: 2003,
    imo: "9254630",
    mmsi: "241234567",
    grossTonnage: 28567,
    deadweight: 47234,
    length: 189.9,
    beam: 30.5,
    draft: 12.9,
    serviceSpeed: 13.8,
    class: "Handymax",
    enginePower: 6920,
    manager: "Elipida Shipping",
    classification: "LR",
    shipyard: "Tsuneishi Shipbuilding",
    cargoType: "Bulk Carrier",
    originCountry: "Greece"
  },
  {
    name: "MV XING RU HAI",
    image: getAssetUrl(ASSET_PATHS.VESSELS.MV_XING_RU_HAI),
    type: "Bulk Carrier",
    series: "MV",
    flagCountry: "🇭🇰 Hong Kong",
    builtYear: 2010,
    imo: "9456790",
    mmsi: "563456790",
    grossTonnage: 34567,
    deadweight: 58234,
    length: 190,
    beam: 31,
    draft: 13.8,
    serviceSpeed: 14.2,
    class: "Supramax",
    enginePower: 7800,
    manager: "Xing Ru Shipping",
    classification: "CCS",
    shipyard: "Jiangsu Yangzijiang",
    cargoType: "Bulk Carrier",
    originCountry: "Hong Kong"
  },
  {
    name: "MV PERELIK",
    image: getAssetUrl(ASSET_PATHS.VESSELS.MV_PERELIK),
    type: "Bulk Carrier",
    series: "MV",
    flagCountry: "🇲🇹 Malta",
    builtYear: 2009,
    imo: "9445672",
    mmsi: "248234567",
    grossTonnage: 21067,
    deadweight: 35893,
    length: 179.9,
    beam: 28.4,
    draft: 11.8,
    serviceSpeed: 13.8,
    class: "Handysize",
    enginePower: 6450,
    manager: "Perelik Shipping",
    classification: "DNV",
    shipyard: "Yangfan Group",
    cargoType: "Bulk Carrier",
    originCountry: "Malta"
  },
  {
    name: "MV DOGAN BEY",
    image: getAssetUrl(ASSET_PATHS.VESSELS.MV_DOGAN_BEY),
    type: "Bulk Carrier",
    series: "MV",
    flagCountry: "🇲🇭 Marshall Islands",
    builtYear: 2012,
    imo: "9567892",
    mmsi: "538567892",
    grossTonnage: 36789,
    deadweight: 63421,
    length: 199.9,
    beam: 32.2,
    draft: 14.2,
    serviceSpeed: 14.5,
    class: "Supramax",
    enginePower: 8200,
    manager: "Karadeniz Holdings",
    classification: "ABS",
    shipyard: "New Times Shipbuilding",
    cargoType: "Bulk Carrier",
    originCountry: "Marshall Islands"
  },
  {
    name: "MV STAR PISCES",
    image: getAssetUrl(ASSET_PATHS.VESSELS.MV_STAR_PISCES),
    type: "Bulk Carrier",
    series: "MV",
    flagCountry: "🇲🇭 Marshall Islands",
    builtYear: 2012,
    imo: "9567893",
    mmsi: "538567893",
    grossTonnage: 36789,
    deadweight: 63421,
    length: 199.9,
    beam: 32.2,
    draft: 14.2,
    serviceSpeed: 14.5,
    class: "Supramax",
    enginePower: 8200,
    manager: "Star Bulk Carriers",
    classification: "ABS",
    shipyard: "New Times Shipbuilding",
    cargoType: "Bulk Carrier",
    originCountry: "Marshall Islands"
  },
  {
    name: "MV KHADEEJA JAHAN",
    image: getAssetUrl(ASSET_PATHS.VESSELS.MV_KHADEEJA_JAHAN),
    type: "Bulk Carrier",
    series: "MV",
    flagCountry: "🇧🇩 Bangladesh",
    builtYear: 1998,
    imo: "9159438",
    mmsi: "405123456",
    grossTonnage: 16234,
    deadweight: 26567,
    length: 169.9,
    beam: 27.2,
    draft: 10.1,
    serviceSpeed: 13.2,
    class: "Handysize",
    enginePower: 5480,
    manager: "Khadeeja Shipping",
    classification: "NK",
    shipyard: "Oshima Shipbuilding",
    cargoType: "Bulk Carrier",
    originCountry: "Bangladesh"
  },
  {
    name: "MV YU HENGXEAN FENG",
    image: getAssetUrl(ASSET_PATHS.VESSELS.MV_YU_HENGXEAN_FENG),
    type: "Vehicles Carrier",
    series: "MV",
    flagCountry: "🇨🇳 China",
    builtYear: 1998,
    imo: "9166895",
    mmsi: "412163000",
    grossTonnage: 53240,
    deadweight: 18900,
    length: 190,
    beam: 32.2,
    draft: 8.8,
    serviceSpeed: 19.5,
    class: "Medium Car Carrier",
    enginePower: 9480,
    manager: "NYKCOS Car Carrier",
    classification: "NK",
    shipyard: "Mitsubishi Heavy Industries",
    cargoType: "Vehicles Carrier",
    originCountry: "China"
  },
  {
    name: "MV Giulia",
    image: getAssetUrl(ASSET_PATHS.VESSELS.MV_GIULIA),
    type: "Bulk Carrier",
    series: "MV",
    flagCountry: "🇲🇹 Malta",
    builtYear: 2013,
    imo: "9638135",
    mmsi: "248345678",
    grossTonnage: 11456,
    deadweight: 17890,
    length: 139.9,
    beam: 22.8,
    draft: 8.2,
    serviceSpeed: 12.5,
    class: "Mini Bulk",
    enginePower: 6050,
    manager: "Giulia Shipping",
    classification: "RINA",
    shipyard: "Zhoushan Shipyard",
    cargoType: "Bulk Carrier",
    originCountry: "Malta"
  },
  {
    name: "MV Shang Yuan Men",
    image: getAssetUrl(ASSET_PATHS.VESSELS.MV_SHANG_YUAN_MEN),
    type: "Bulk Carrier",
    series: "MV",
    flagCountry: "🇵🇦 Panama",
    builtYear: 1994,
    imo: "9070723",
    mmsi: "370345678",
    grossTonnage: 15234,
    deadweight: 24567,
    length: 159.9,
    beam: 25,
    draft: 9.5,
    serviceSpeed: 12.8,
    class: "Handysize",
    enginePower: 5200,
    manager: "Shang Yuan Shipping",
    classification: "NK",
    shipyard: "Oshima Shipbuilding",
    cargoType: "Bulk Carrier",
    originCountry: "Panama"
  },
  {
    name: "MV Tong Ji Men",
    image: getAssetUrl(ASSET_PATHS.VESSELS.MV_TONG_JI_MEN),
    type: "Bulk Carrier",
    series: "MV",
    flagCountry: "🇵🇦 Panama",
    builtYear: 1994,
    imo: "9070724",
    mmsi: "370345679",
    grossTonnage: 15234,
    deadweight: 24567,
    length: 159.9,
    beam: 25,
    draft: 9.5,
    serviceSpeed: 12.8,
    class: "Handysize",
    enginePower: 5200,
    manager: "Tong Ji Shipping",
    classification: "NK",
    shipyard: "Oshima Shipbuilding",
    cargoType: "Bulk Carrier",
    originCountry: "Panama"
  },
  {
    name: "ESL Australia",
    image: getAssetUrl(ASSET_PATHS.VESSELS.ESL_AUSTRALIA),
    type: "Bulk Carrier",
    series: "ESL",
    flagCountry: "🇨🇾 Cyprus",
    builtYear: 2008,
    imo: "9365661",
    mmsi: "209139000",
    grossTonnage: 17234,
    deadweight: 28567,
    length: 169.9,
    beam: 27.2,
    draft: 10.2,
    serviceSpeed: 13.5,
    class: "Handysize Multi-purpose",
    enginePower: 5720,
    manager: "ESL Shipping",
    classification: "DNV",
    shipyard: "Guangzhou Wenchong",
    cargoType: "Bulk Carrier",
    originCountry: "Cyprus"
  },
  {
    name: "MV African Kalmia",
    image: getAssetUrl(ASSET_PATHS.VESSELS.MV_AFRICAN_KALMIA),
    type: "Bulk Carrier",
    series: "MV",
    flagCountry: "🇱🇷 Liberia",
    builtYear: 2009,
    imo: "9445690",
    mmsi: "636098766",
    grossTonnage: 35890,
    deadweight: 61245,
    length: 199.9,
    beam: 32.2,
    draft: 14.1,
    serviceSpeed: 14.5,
    class: "Supramax",
    enginePower: 8200,
    manager: "African Kalmia Shipping",
    classification: "ABS",
    shipyard: "New Century Shipbuilding",
    cargoType: "Bulk Carrier",
    originCountry: "Liberia"
  },
  {
    name: "MV Breadbox Oryx",
    image: getAssetUrl(ASSET_PATHS.VESSELS.MV_BREADBOX_ORYX),
    type: "Bulk Carrier",
    series: "MV",
    flagCountry: "🇵🇹 Madeira",
    builtYear: 2009,
    imo: "9445691",
    mmsi: "255098767",
    grossTonnage: 35890,
    deadweight: 61245,
    length: 199.9,
    beam: 32.2,
    draft: 14.1,
    serviceSpeed: 14.5,
    class: "Supramax",
    enginePower: 8200,
    manager: "Breadbox Shipping",
    classification: "ABS",
    shipyard: "New Century Shipbuilding",
    cargoType: "Bulk Carrier",
    originCountry: "Madeira"
  },
  {
    name: "MV Baltic Scorpion",
    image: getAssetUrl(ASSET_PATHS.VESSELS.MV_BALTIC_SCORPION),
    type: "Bulk Carrier",
    series: "MV",
    flagCountry: "🇲🇭 Marshall Islands",
    builtYear: 2014,
    imo: "9722016",
    mmsi: "538005901",
    grossTonnage: 37486,
    deadweight: 63389,
    length: 199.9,
    beam: 32.2,
    draft: 14.3,
    serviceSpeed: 14.5,
    class: "Ultramax",
    enginePower: 8200,
    manager: "Genco Shipping",
    classification: "DNV",
    shipyard: "Zhoushan Shipyard",
    cargoType: "Bulk Carrier",
    originCountry: "Marshall Islands"
  },
  {
    name: "Grande Benin",
    image: getAssetUrl(ASSET_PATHS.VESSELS.GRANDE_BENIN),
    type: "Ro-Ro",
    series: "Grande",
    flagCountry: "🇮🇹 Italy",
    builtYear: 2010,
    imo: "9377470",
    mmsi: "247275402",
    grossTonnage: 47231,
    deadweight: 12500,
    length: 214,
    beam: 25.8,
    draft: 7.2,
    serviceSpeed: 20.5,
    class: "Grande Marocco Class",
    enginePower: 13500,
    manager: "Grimaldi Lines",
    classification: "RINA",
    shipyard: "Uljanik Croatia",
    cargoType: "Ro-Ro",
    originCountry: "Italy"
  },
  {
    name: "MV Poavosa Porave",
    image: getAssetUrl(ASSET_PATHS.VESSELS.MV_POAVOSA_PORAVE),
    type: "Bulk Carrier",
    series: "MV",
    flagCountry: "🇵🇦 Panama",
    builtYear: 2010,
    imo: "9456791",
    mmsi: "654456791",
    grossTonnage: 34567,
    deadweight: 58234,
    length: 190,
    beam: 31,
    draft: 13.8,
    serviceSpeed: 14.2,
    class: "Supramax",
    enginePower: 7800,
    manager: "Navigator Shipping",
    classification: "BV",
    shipyard: "Chinese Shipyard",
    cargoType: "Bulk Carrier",
    originCountry: "Panama"
  },
  {
    name: "Grande Luanda",
    image: getAssetUrl(ASSET_PATHS.VESSELS.GRANDE_LUANDA),
    type: "Ro-Ro",
    series: "Grande",
    flagCountry: "🇮🇹 Italy",
    builtYear: 2014,
    imo: "9672088",
    mmsi: "247341100",
    grossTonnage: 71543,
    deadweight: 18500,
    length: 267,
    beam: 28.8,
    draft: 8.2,
    serviceSpeed: 22.0,
    class: "Grande Lagos Class",
    enginePower: 18000,
    manager: "Grimaldi Lines",
    classification: "RINA",
    shipyard: "Hyundai Mipo Dockyard",
    cargoType: "Ro-Ro",
    originCountry: "Italy"
  },
  {
    name: "MV Albatross",
    image: getAssetUrl(ASSET_PATHS.VESSELS.MV_ALBATROSS),
    type: "Bulk Carrier",
    series: "MV",
    flagCountry: "🇵🇦 Panama",
    builtYear: 2010,
    imo: "9456792",
    mmsi: "563456792",
    grossTonnage: 34567,
    deadweight: 58234,
    length: 190,
    beam: 31,
    draft: 13.8,
    serviceSpeed: 14.2,
    class: "Supramax",
    enginePower: 7800,
    manager: "Jin Yuanling Shipping",
    classification: "CCS",
    shipyard: "Jiangsu Yangzijiang",
    cargoType: "Bulk Carrier",
    originCountry: "Panama"
  },
  {
    name: "MV SFL Spey",
    image: getAssetUrl(ASSET_PATHS.VESSELS.MV_SFL_SPEY),
    type: "Bulk Carrier",
    series: "MV",
    flagCountry: "🇭🇰 Hong Kong",
    builtYear: 2012,
    imo: "9587219",
    mmsi: "477353900",
    grossTonnage: 34567,
    deadweight: 58234,
    length: 190,
    beam: 31,
    draft: 13.8,
    serviceSpeed: 14.2,
    class: "Supramax",
    enginePower: 7800,
    manager: "Ship Finance Management",
    classification: "DNV",
    shipyard: "Jiangsu Yangzijiang",
    cargoType: "Bulk Carrier",
    originCountry: "Hong Kong"
  },
  {
    name: "Grande Senegal",
    image: getAssetUrl(ASSET_PATHS.VESSELS.GRANDE_SENEGAL),
    type: "Ro-Ro",
    series: "Grande",
    flagCountry: "🇮🇹 Italy",
    builtYear: 2010,
    imo: "9377470",
    mmsi: "247275402",
    grossTonnage: 47231,
    deadweight: 12500,
    length: 214,
    beam: 25.8,
    draft: 7.2,
    serviceSpeed: 20.5,
    class: "Grande Marocco Class",
    enginePower: 13500,
    manager: "Grimaldi Lines",
    classification: "RINA",
    shipyard: "Uljanik Croatia",
    cargoType: "Ro-Ro",
    originCountry: "Italy"
  },
  {
    name: "MV Navigator B",
    image: getAssetUrl(ASSET_PATHS.VESSELS.MV_NAVIGATOR_B),
    type: "Bulk Carrier",
    series: "MV",
    flagCountry: "🇰🇲 Comoros",
    builtYear: 2010,
    imo: "9456791",
    mmsi: "654456791",
    grossTonnage: 34567,
    deadweight: 58234,
    length: 190,
    beam: 31,
    draft: 13.8,
    serviceSpeed: 14.2,
    class: "Supramax",
    enginePower: 7800,
    manager: "Navigator Shipping",
    classification: "BV",
    shipyard: "Chinese Shipyard",
    cargoType: "Bulk Carrier",
    originCountry: "Comoros"
  },
  {
    name: "MV Jin Yuanling",
    image: getAssetUrl(ASSET_PATHS.VESSELS.MV_JIN_YUANLING),
    type: "Bulk Carrier",
    series: "MV",
    flagCountry: "🇭🇰 Hong Kong",
    builtYear: 2010,
    imo: "9456792",
    mmsi: "563456792",
    grossTonnage: 34567,
    deadweight: 58234,
    length: 190,
    beam: 31,
    draft: 13.8,
    serviceSpeed: 14.2,
    class: "Supramax",
    enginePower: 7800,
    manager: "Jin Yuanling Shipping",
    classification: "CCS",
    shipyard: "Jiangsu Yangzijiang",
    cargoType: "Bulk Carrier",
    originCountry: "Hong Kong"
  },
  {
    name: "Grande Lagos",
    image: getAssetUrl(ASSET_PATHS.VESSELS.GRANDE_LAGOS),
    type: "Ro-Ro",
    series: "Grande",
    flagCountry: "🇮🇹 Italy",
    builtYear: 2014,
    imo: "9672088",
    mmsi: "247341100",
    grossTonnage: 71543,
    deadweight: 18500,
    length: 267,
    beam: 28.8,
    draft: 8.2,
    serviceSpeed: 22.0,
    class: "Grande Lagos Class",
    enginePower: 18000,
    manager: "Grimaldi Lines",
    classification: "RINA",
    shipyard: "Hyundai Mipo Dockyard",
    cargoType: "Ro-Ro",
    originCountry: "Italy"
  },
  {
    name: "MV Abyssinian",
    image: getAssetUrl(ASSET_PATHS.VESSELS.MV_ABYSSINIAN),
    type: "Bulk Carrier",
    series: "MV",
    flagCountry: "🇲🇭 Marshall Islands",
    builtYear: 2014,
    imo: "9722017",
    mmsi: "538005902",
    grossTonnage: 37486,
    deadweight: 63389,
    length: 199.9,
    beam: 32.2,
    draft: 14.3,
    serviceSpeed: 14.5,
    class: "Ultramax",
    enginePower: 8200,
    manager: "Genco Shipping",
    classification: "DNV",
    shipyard: "Zhoushan Shipyard",
    cargoType: "Bulk Carrier",
    originCountry: "Marshall Islands"
  },
  {
    name: "Grande Cotonou",
    image: getAssetUrl(ASSET_PATHS.VESSELS.GRANDE_COTONOU),
    type: "Ro-Ro",
    series: "Grande",
    flagCountry: "🇮🇹 Italy",
    builtYear: 2014,
    imo: "9672090",
    mmsi: "247341101",
    grossTonnage: 71543,
    deadweight: 18500,
    length: 267,
    beam: 28.8,
    draft: 8.2,
    serviceSpeed: 22.0,
    class: "Grande Lagos Class",
    enginePower: 18000,
    manager: "Grimaldi Lines",
    classification: "RINA",
    shipyard: "Hyundai Mipo Dockyard",
    cargoType: "Ro-Ro",
    originCountry: "Italy"
  },
  {
    name: "MV Unicloud",
    image: getAssetUrl(ASSET_PATHS.VESSELS.MV_UNICLOUD),
    type: "Bulk Carrier",
    series: "MV",
    flagCountry: "🇬🇮 Gibraltar",
    builtYear: 2010,
    imo: "9456793",
    mmsi: "233456793",
    grossTonnage: 34567,
    deadweight: 58234,
    length: 190,
    beam: 31,
    draft: 13.8,
    serviceSpeed: 14.2,
    class: "Supramax",
    enginePower: 7800,
    manager: "Unicloud Shipping",
    classification: "BV",
    shipyard: "Chinese Shipyard",
    cargoType: "Bulk Carrier",
    originCountry: "Gibraltar"
  },
  {
    name: "MV Lucky Trader",
    image: getAssetUrl(ASSET_PATHS.VESSELS.MV_LUCKY_TRADER),
    type: "Bulk Fertilizer",
    series: "MV",
    flagCountry: "🇵🇦 Panama",
    builtYear: 2010,
    imo: "9456794",
    mmsi: "370456794",
    grossTonnage: 34567,
    deadweight: 58234,
    length: 190,
    beam: 31,
    draft: 13.8,
    serviceSpeed: 14.2,
    class: "Supramax",
    enginePower: 7800,
    manager: "Lucky Trader Shipping",
    classification: "BV",
    shipyard: "Chinese Shipyard",
    cargoType: "Bulk Fertilizer",
    originCountry: "Panama"
  },
  {
    name: "MV ASIA PEARL IV",
    image: getAssetUrl(ASSET_PATHS.VESSELS.MV_ASIA_PEARL_IV),
    type: "Bulk Carrier",
    series: "MV",
    flagCountry: "🇱🇷 Liberia",
    builtYear: 2010,
    imo: "9502764",
    mmsi: "636442000",
    grossTonnage: 34567,
    deadweight: 58234,
    length: 190,
    beam: 31,
    draft: 13.8,
    serviceSpeed: 14.2,
    class: "Supramax",
    enginePower: 7800,
    manager: "Samios Shipping",
    classification: "BV",
    shipyard: "Jiangsu Yangzijiang",
    cargoType: "Bulk Carrier",
    originCountry: "Liberia"
  }
];
export default function Portfolio() {
  const { content } = useLanguage();
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSeries, setSelectedSeries] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedVessel, setSelectedVessel] = useState<VesselDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Vessel section ref
  const vesselsSectionRef = useRef<HTMLElement>(null);

  const handleViewProjects = () => {
    console.log('View Projects clicked');
    // TODO: Navigate to projects section or external projects page
  };

  const handleContactUs = () => {
    console.log('Contact Us clicked');
    setLocation('/contact');
  };

  const handleVesselClick = (vessel: VesselDetails) => {
    setSelectedVessel(vessel);
    setIsModalOpen(true);
  };

  // Filter vessels based on search and filters
  const filteredVessels = useMemo(() => {
    return vesselFleet.filter(vessel => {
      const matchesSearch = vessel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           vessel.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           vessel.manager.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           vessel.flagCountry.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSeries = selectedSeries === "all" || vessel.series === selectedSeries;
      const matchesType = selectedType === "all" || vessel.type === selectedType;
      
      return matchesSearch && matchesSeries && matchesType;
    });
  }, [searchQuery, selectedSeries, selectedType]);

  // Get unique series and types for filter options
  const availableSeries = useMemo(() => {
    const series = Array.from(new Set(vesselFleet.map(v => v.series)));
    return [{ value: "all", label: "All Series" }, ...series.map(s => ({ value: s, label: s }))];
  }, []);

  const availableTypes = useMemo(() => {
    const types = Array.from(new Set(vesselFleet.map(v => v.type)));
    return [{ value: "all", label: "All Types" }, ...types.map(t => ({ value: t, label: t }))];
  }, []);

  return (
    <div className="min-h-screen bg-background" data-testid="page-portfolio">
      
      <Navigation />
      
      <PageHero
        videoUrl={getAssetUrl(ASSET_PATHS.HERO.VIDEO_SERVICES)}
        imageUrl={getAssetUrl(ASSET_PATHS.GENERATED.CONTAINER_OPERATIONS)}
        badge={content.portfolioPage?.hero?.badge || "Our Work"}
        title={content.portfolioPage?.hero?.title || "Our Portfolio"}
        subtitle={content.portfolioPage?.hero?.subtitle || "Showcasing successful maritime projects, client partnerships, and operational excellence across West Africa."}
        primaryCta={{
          text: content.portfolioPage?.hero?.primaryCta || "View Projects",
          onClick: handleViewProjects
        }}
        secondaryCta={{
          text: content.portfolioPage?.hero?.secondaryCta || "Contact Us",
          onClick: handleContactUs
        }}
        stats={content.portfolioPage?.hero?.stats || [
          { value: "12+", label: "Major Projects" },
          { value: "98%", label: "Success Rate" },
          { value: "$400M+", label: "Total Value" }
        ]}
        scrollTarget="portfolio-content"
      />

      <main id="portfolio-content">
        {/* Vessel Fleet Section */}
        <section 
          ref={vesselsSectionRef}
          className="py-16 relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800"
        >
          
          <div className="w-full px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {content.portfolioPage?.vesselFleet?.title || "Our Vessel Fleet"}
              </h2>
              <p className="text-lg text-white/90 max-w-3xl mx-auto">
                {content.portfolioPage?.vesselFleet?.subtitle || "Professional maritime operations with modern equipment and experienced teams."}
              </p>
            </div>
            
            {/* Search and Filter Controls */}
            <div className="mb-8 space-y-4">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder={content.portfolioPage?.vesselFleet?.searchPlaceholder || "Search vessels by name, type, or manager..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/90 backdrop-blur-sm border-white/20"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={selectedSeries}
                    onChange={(e) => setSelectedSeries(e.target.value)}
                    className="px-3 py-2 rounded-lg bg-white/90 backdrop-blur-sm border border-white/20 text-sm"
                  >
                    {availableSeries.map(series => (
                      <option key={series.value} value={series.value}>{series.label}</option>
                    ))}
                  </select>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="px-3 py-2 rounded-lg bg-white/90 backdrop-blur-sm border border-white/20 text-sm"
                  >
                    {availableTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Vessel Timeline */}
            {filteredVessels.length > 0 ? (
              <VesselTimeline 
                vessels={filteredVessels}
                scrollProgress={0}
                onVesselClick={handleVesselClick}
              />
            ) : (
              <div className="text-center py-12">
                <Ship className="h-16 w-16 text-white/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  {content.portfolioPage?.vesselFleet?.noVesselsFound || "No Vessels Found"}
                </h3>
                <p className="text-white/70">
                  {vesselFleet.length === 0 
                    ? (content.portfolioPage?.vesselFleet?.noVesselsMessage || "Vessel fleet information will be updated with actual Agilent Maritime vessels.")
                    : (content.portfolioPage?.vesselFleet?.noVesselsSearchMessage || "Try adjusting your search criteria to find vessels.")
                  }
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Portfolio Projects Section */}
        <PortfolioSection />
      </main>

      {/* Vessel Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Ship className="h-5 w-5" />
              {selectedVessel?.name}
            </DialogTitle>
          </DialogHeader>
          {selectedVessel && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={selectedVessel.image}
                    alt={selectedVessel.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {content.portfolioPage?.vesselModal?.basicInfo || "Basic Information"}
                    </h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><span className="font-medium">{content.portfolioPage?.vesselModal?.labels?.type || "Type"}:</span> {selectedVessel.type}</div>
                      <div><span className="font-medium">{content.portfolioPage?.vesselModal?.labels?.series || "Series"}:</span> {selectedVessel.series}</div>
                      <div><span className="font-medium">{content.portfolioPage?.vesselModal?.labels?.flag || "Flag"}:</span> {selectedVessel.flagCountry}</div>
                      <div><span className="font-medium">{content.portfolioPage?.vesselModal?.labels?.built || "Built"}:</span> {selectedVessel.builtYear || 'N/A'}</div>
                      <div><span className="font-medium">{content.portfolioPage?.vesselModal?.labels?.imo || "IMO"}:</span> {selectedVessel.imo || 'N/A'}</div>
                      <div><span className="font-medium">{content.portfolioPage?.vesselModal?.labels?.mmsi || "MMSI"}:</span> {selectedVessel.mmsi || 'N/A'}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    {content.portfolioPage?.vesselModal?.technicalSpecs || "Technical Specifications"}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>{content.portfolioPage?.vesselModal?.labels?.grossTonnage || "Gross Tonnage"}:</span>
                      <span className="font-medium">{selectedVessel.grossTonnage?.toLocaleString() || 'N/A'} {content.portfolioPage?.vesselModal?.units?.gt || "GT"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{content.portfolioPage?.vesselModal?.labels?.deadweight || "Deadweight"}:</span>
                      <span className="font-medium">{selectedVessel.deadweight?.toLocaleString() || 'N/A'} {content.portfolioPage?.vesselModal?.units?.dwt || "DWT"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{content.portfolioPage?.vesselModal?.labels?.length || "Length"}:</span>
                      <span className="font-medium">{selectedVessel.length || 'N/A'}{content.portfolioPage?.vesselModal?.units?.meters || "m"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{content.portfolioPage?.vesselModal?.labels?.beam || "Beam"}:</span>
                      <span className="font-medium">{selectedVessel.beam || 'N/A'}{content.portfolioPage?.vesselModal?.units?.meters || "m"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{content.portfolioPage?.vesselModal?.labels?.draft || "Draft"}:</span>
                      <span className="font-medium">{selectedVessel.draft || 'N/A'}{content.portfolioPage?.vesselModal?.units?.meters || "m"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{content.portfolioPage?.vesselModal?.labels?.serviceSpeed || "Service Speed"}:</span>
                      <span className="font-medium">{selectedVessel.serviceSpeed || 'N/A'} {content.portfolioPage?.vesselModal?.units?.knots || "knots"}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    {content.portfolioPage?.vesselModal?.classification || "Classification"}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>{content.portfolioPage?.vesselModal?.labels?.class || "Class"}:</span>
                      <span className="font-medium">{selectedVessel.class || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{content.portfolioPage?.vesselModal?.labels?.enginePower || "Engine Power"}:</span>
                      <span className="font-medium">{selectedVessel.enginePower?.toLocaleString() || 'N/A'} {content.portfolioPage?.vesselModal?.units?.kw || "kW"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{content.portfolioPage?.vesselModal?.labels?.classification || "Classification"}:</span>
                      <span className="font-medium">{selectedVessel.classification || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{content.portfolioPage?.vesselModal?.labels?.shipyard || "Shipyard"}:</span>
                      <span className="font-medium">{selectedVessel.shipyard || 'N/A'}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    {content.portfolioPage?.vesselModal?.operations || "Operations"}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>{content.portfolioPage?.vesselModal?.labels?.manager || "Manager"}:</span>
                      <span className="font-medium">{selectedVessel.manager || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{content.portfolioPage?.vesselModal?.labels?.cargoType || "Cargo Type"}:</span>
                      <span className="font-medium">{selectedVessel.cargoType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{content.portfolioPage?.vesselModal?.labels?.origin || "Origin"}:</span>
                      <span className="font-medium">{selectedVessel.originCountry}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}