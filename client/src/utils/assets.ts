/**
 * Asset Loading Utilities for Amplify + S3 Deployment
 * Handles asset URL generation and loading for S3 storage
 */

// Asset base URL for S3 (configured during deployment)
const ASSET_BASE_URL = process.env.NODE_ENV === 'production' 
  ? `https://${process.env.VITE_S3_BUCKET_NAME}.s3.${process.env.VITE_AWS_REGION}.amazonaws.com/public` 
  : '/assets';

/**
 * Generate asset URL for S3 or local development
 */
export const getAssetUrl = (path: string): string => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${ASSET_BASE_URL}/${cleanPath}`;
};

/**
 * Preload image asset
 */
export const loadImage = (path: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${path}`));
    img.src = getAssetUrl(path);
  });
};

/**
 * Preload video asset
 */
export const loadVideo = (path: string): Promise<HTMLVideoElement> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.oncanplaythrough = () => resolve(video);
    video.onerror = () => reject(new Error(`Failed to load video: ${path}`));
    video.src = getAssetUrl(path);
    video.load();
  });
};

/**
 * Preload 3D model asset
 */
export const loadModel = (path: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fetch(getAssetUrl(path))
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load model: ${path}`);
        }
        return response.blob();
      })
      .then(blob => {
        const url = URL.createObjectURL(blob);
        resolve(url);
      })
      .catch(reject);
  });
};

/**
 * Asset path constants for organized structure
 */
export const ASSET_PATHS = {
  // Hero assets
  HERO: {
    LOGO: 'images/hero/agilient_maritime_logo.png',
    PORT_AERIAL: 'images/hero/Tema_Port_aerial_view_2afebff1.png',
    VIDEO_HOME: 'videos/hero/hero-home.mp4',
    VIDEO_CARGO: 'videos/hero/cargo.mp4',
    VIDEO_SERVICES: 'videos/hero/services.mp4',
    VIDEO_TEMA: 'videos/hero/tema.mp4',
    VIDEO_PORT: 'videos/hero/port-video.mp4',
  },
  
  // Background videos
  BACKGROUNDS: {
    SHIP_MOVEMENT: 'videos/backgrounds/ship_movement.mp4',
    TEM2: 'videos/backgrounds/tem2.mp4',
    CARGO_SHIP: 'videos/backgrounds/cargo-ship-KQ97UHV.mp4',
    SHIPPING_PORT: 'videos/backgrounds/shipping-cargo-port-82CRGXV.mp4',
    SHIP: 'videos/Ship.mp4', // The specific Ship.mp4 video for mission section
  },
  
  // Generated images
  GENERATED: {
    CARGO_STORAGE: 'images/generated/Cargo_storage_logistics_ae8eb2ba.png',
    CONTAINER_HANDLING: 'images/generated/Container_handling_operations_4cd67679.png',
    CONTAINER_OPERATIONS: 'images/generated/Container_operations_showcase_4ee11e9f.png',
    HEAVY_LIFT: 'images/generated/Heavy_lift_operations_c2cd67679.png',
    RORO_OPERATIONS: 'images/generated/RoRo_operations_showcase_42f7be0c.png',
    RORO_VEHICLE: 'images/generated/RoRo_vehicle_operations_5541d066.png',
    MARITIME_BG_1: 'images/generated/Maritime_port_hero_background_94b32449.png',
    MARITIME_BG_2: 'images/generated/Maritime_port_hero_background_c7c571e5.png',
    EXECUTIVE_TEAM: 'images/generated/Executive_team_member_1cf2e48c.png',
    WATER_DROP: 'images/generated/realistic-water-drop-with-ecosystem.jpg',
  },
  
  // Stock images
  STOCK: {
    PORT_CRANE: 'images/stock/port_crane_operation_7be1f647.jpg',
    PORT_OPERATIONS: 'images/stock/port_operations_carg_5753cff0.jpg',
    SHIPPING_CONTAINERS: 'images/stock/shipping_containers__b425af26.jpg',
    SHIPPING_PORT: 'images/stock/shipping_port_cargo__78eb8f30.jpg',
    GHANA_PORT: 'images/stock/ghana_port_infrastru_7ef9101d.jpg',
    WATER: 'images/stock/water.jpeg',
  },
  
  // Team images
  TEAM: {
    KOFI_WEBB: 'images/team/kofiwebb.jpg',
    SO_FRIMPONG: 'images/team/so-frimpong.png',
    GPHA_LOGO: 'images/team/logo_gpha.png',
    MERIDIAN_LOGO: 'images/team/Meridian-Port-Services.png',
  },
  
  // Vessel images (53 vessels)
  VESSELS: {
    MV_SARIKA_NAREE: 'images/vessels/mv_sarika_naree.jpg',
    MV_PARADISE_ACE: 'images/vessels/mv_paradise_ace.jpg',
    MV_MARIA: 'images/vessels/mv_maria.jpg',
    MV_MELINA: 'images/vessels/mv_melina.jpg',
    MV_INA_LOTTE: 'images/vessels/mv_ina_lotte.jpg',
    MV_JADE_1: 'images/vessels/mv_jade_1.jpg',
    MV_LMZ_ARIEL: 'images/vessels/mv_lmz_ariel.jpg',
    MV_OCEAN_MELODY: 'images/vessels/mv_ocean_melody.jpg',
    MV_WO_LONG_SONG: 'images/vessels/mv_wo_long_song.jpg',
    MV_LIVADI: 'images/vessels/mv_livadi.jpg',
    MV_ALPHA_BULKER: 'images/vessels/mv_alpha_bulker.jpg',
    MV_ASIA_PEARL_II: 'images/vessels/mv_asia_pearl_ii.jpg',
    MV_FEDERAL_TOKORO: 'images/vessels/mv_federal_tokoro.jpg',
    MV_STAR_KAPPA: 'images/vessels/mv_star_kappa.jpg',
    MV_SHRIKE: 'images/vessels/mv_shrike.jpg',
    MV_GLOBE_TROTTER: 'images/vessels/mv_globe_trotter.jpg',
    MV_MAGIC_SEAS: 'images/vessels/mv_magic_seas.jpg',
    MV_BALTIC_WASP: 'images/vessels/mv_baltic_wasp.jpg',
    MV_HA_LONG_BAY: 'images/vessels/mv_ha_long_bay.jpg',
    MV_ARCADIA: 'images/vessels/mv_arcadia.jpg',
    MV_PACIFIC_VALOR: 'images/vessels/mv_pacific_valor.jpg',
    MV_FEDERAL_SABLE: 'images/vessels/mv_federal_sable.jpg',
    MV_ELIPIDA_S: 'images/vessels/mv_elipida_s.jpg',
    MV_XING_RU_HAI: 'images/vessels/mv_xing_ru_hai.jpg',
    MV_PERELIK: 'images/vessels/mv_perelik.jpg',
    MV_DOGAN_BEY: 'images/vessels/mv_dogan_bey.jpg',
    MV_STAR_PISCES: 'images/vessels/mv_star_pisces.jpg',
    MV_KHADEEJA_JAHAN: 'images/vessels/mv_khadeeja_jahan.jpg',
    MV_YU_HENGXEAN_FENG: 'images/vessels/mv_yu_hengxean_feng.jpg',
    MV_GIULIA: 'images/vessels/mv_giulia.jpg',
    MV_SHANG_YUAN_MEN: 'images/vessels/mv_shang_yuan_men.jpg',
    MV_TONG_JI_MEN: 'images/vessels/mv_tong_ji_men.jpg',
    ESL_AUSTRALIA: 'images/vessels/esl_australia.jpg',
    MV_AFRICAN_KALMIA: 'images/vessels/mv_african_kalmia.jpg',
    MV_BREADBOX_ORYX: 'images/vessels/mv_breadbox_oryx.jpg',
    MV_BALTIC_SCORPION: 'images/vessels/mv_baltic_scorpion.jpg',
    GRANDE_BENIN: 'images/vessels/grande_benin.jpg',
    MV_POAVOSA_PORAVE: 'images/vessels/mv_poavosa_porave.jpg',
    GRANDE_LUANDA: 'images/vessels/grande_luanda.jpg',
    MV_ALBATROSS: 'images/vessels/mv_albatross.jpg',
    MV_SFL_SPEY: 'images/vessels/mv_sfl_spey.jpg',
    GRANDE_SENEGAL: 'images/vessels/grande_senegal.jpg',
    MV_NAVIGATOR_B: 'images/vessels/mv_navigator_b.jpg',
    MV_JIN_YUANLING: 'images/vessels/mv_jin_yuanling.jpg',
    GRANDE_LAGOS: 'images/vessels/grande_lagos.jpg',
    MV_ABYSSINIAN: 'images/vessels/mv_abyssinian.jpg',
    GRANDE_COTONOU: 'images/vessels/grande_cotonou.jpg',
    MV_UNICLOUD: 'images/vessels/mv_unicloud.jpg',
    MV_LUCKY_TRADER: 'images/vessels/mv_lucky_trader.jpg',
    MV_ASIA_PEARL_IV: 'images/vessels/mv_asia_pearl_iv.jpg',
  },
  
  // 3D Models
  MODELS: {
    CRANE_HARBOUR: 'models/crane_harbour.glb',
    SWIMMING: 'models/SWIMMING.glb',
  },
  
  // Textures
  TEXTURES: {
    EARTH: 'images/textures/earth.jpg',
    EARTH_B: 'images/textures/earthb.jpg',
    EARTH_C: 'images/textures/earthc.jpg',
    LIGHT: 'images/textures/light.jpg',
  },
} as const;

/**
 * Preload critical assets for better performance
 */
export const preloadCriticalAssets = async (): Promise<void> => {
  const criticalAssets = [
    ASSET_PATHS.HERO.LOGO,
    ASSET_PATHS.HERO.PORT_AERIAL,
    ASSET_PATHS.HERO.VIDEO_HOME,
  ];
  
  try {
    await Promise.all(criticalAssets.map(loadImage));
    console.log('Critical assets preloaded successfully');
  } catch (error) {
    console.warn('Some critical assets failed to preload:', error);
  }
};

/**
 * Optimize asset loading with lazy loading
 */
export const createLazyImageLoader = (src: string, alt: string = '') => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = getAssetUrl(src);
    img.alt = alt;
  });
};

/**
 * Create video element with proper attributes
 */
export const createVideoElement = (src: string, options: {
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  poster?: string;
} = {}) => {
  const video = document.createElement('video');
  video.src = getAssetUrl(src);
  video.autoplay = options.autoplay ?? true;
  video.muted = options.muted ?? true;
  video.loop = options.loop ?? true;
  video.playsInline = options.playsInline ?? true;
  
  if (options.poster) {
    video.poster = getAssetUrl(options.poster);
  }
  
  return video;
};
