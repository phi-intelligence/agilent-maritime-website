const fs = require('fs');
const path = require('path');

// Read the Portfolio.tsx file
const filePath = 'client/src/pages/Portfolio.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Vessel image mappings
const vesselMappings = {
  'mv_sarika_naree.jpg': 'MV_SARIKA_NAREE',
  'mv_paradise_ace.jpg': 'MV_PARADISE_ACE',
  'mv_maria.jpg': 'MV_MARIA',
  'mv_melina.jpg': 'MV_MELINA',
  'mv_ina_lotte.jpg': 'MV_INA_LOTTE',
  'mv_jade_1.jpg': 'MV_JADE_1',
  'mv_lmz_ariel.jpg': 'MV_LMZ_ARIEL',
  'mv_ocean_melody.jpg': 'MV_OCEAN_MELODY',
  'mv_wo_long_song.jpg': 'MV_WO_LONG_SONG',
  'mv_livadi.jpg': 'MV_LIVADI',
  'mv_alpha_bulker.jpg': 'MV_ALPHA_BULKER',
  'mv_asia_pearl_ii.jpg': 'MV_ASIA_PEARL_II',
  'mv_federal_tokoro.jpg': 'MV_FEDERAL_TOKORO',
  'mv_star_kappa.jpg': 'MV_STAR_KAPPA',
  'mv_shrike.jpg': 'MV_SHRIKE',
  'mv_globe_trotter.jpg': 'MV_GLOBE_TROTTER',
  'mv_magic_seas.jpg': 'MV_MAGIC_SEAS',
  'mv_baltic_wasp.jpg': 'MV_BALTIC_WASP',
  'mv_ha_long_bay.jpg': 'MV_HA_LONG_BAY',
  'mv_arcadia.jpg': 'MV_ARCADIA',
  'mv_pacific_valor.jpg': 'MV_PACIFIC_VALOR',
  'mv_federal_sable.jpg': 'MV_FEDERAL_SABLE',
  'mv_elipida_s.jpg': 'MV_ELIPIDA_S',
  'mv_xing_ru_hai.jpg': 'MV_XING_RU_HAI',
  'mv_perelik.jpg': 'MV_PERELIK',
  'mv_dogan_bey.jpg': 'MV_DOGAN_BEY',
  'mv_star_pisces.jpg': 'MV_STAR_PISCES',
  'mv_khadeeja_jahan.jpg': 'MV_KHADEEJA_JAHAN',
  'mv_yu_hengxean_feng.jpg': 'MV_YU_HENGXEAN_FENG',
  'mv_giulia.jpg': 'MV_GIULIA',
  'mv_shang_yuan_men.jpg': 'MV_SHANG_YUAN_MEN',
  'mv_tong_ji_men.jpg': 'MV_TONG_JI_MEN',
  'esl_australia.jpg': 'ESL_AUSTRALIA',
  'mv_african_kalmia.jpg': 'MV_AFRICAN_KALMIA',
  'mv_breadbox_oryx.jpg': 'MV_BREADBOX_ORYX',
  'mv_baltic_scorpion.jpg': 'MV_BALTIC_SCORPION',
  'grande_benin.jpg': 'GRANDE_BENIN',
  'mv_poavosa_porave.jpg': 'MV_POAVOSA_PORAVE',
  'grande_luanda.jpg': 'GRANDE_LUANDA',
  'mv_albatross.jpg': 'MV_ALBATROSS',
  'mv_sfl_spey.jpg': 'MV_SFL_SPEY',
  'grande_senegal.jpg': 'GRANDE_SENEGAL',
  'mv_navigator_b.jpg': 'MV_NAVIGATOR_B',
  'mv_jin_yuanling.jpg': 'MV_JIN_YUANLING',
  'grande_lagos.jpg': 'GRANDE_LAGOS',
  'mv_abyssinian.jpg': 'MV_ABYSSINIAN',
  'grande_cotonou.jpg': 'GRANDE_COTONOU',
  'mv_unicloud.jpg': 'MV_UNICLOUD',
  'mv_lucky_trader.jpg': 'MV_LUCKY_TRADER',
  'mv_asia_pearl_iv.jpg': 'MV_ASIA_PEARL_IV'
};

// Update vessel image paths
Object.entries(vesselMappings).forEach(([filename, constantName]) => {
  const oldPath = `"/attached_assets/vessels/${filename}"`;
  const newPath = `getAssetUrl(ASSET_PATHS.VESSELS.${constantName})`;
  
  content = content.replace(new RegExp(oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newPath);
});

// Write the updated content back to the file
fs.writeFileSync(filePath, content);
console.log('Vessel image paths updated successfully!');
