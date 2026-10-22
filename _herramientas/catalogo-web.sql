-- Catálogo de addons de WoW Bolivia para la web (tabla `addons` del módulo addons, BD del CMS).
-- Generado por _herramientas/publicar.mjs. Repositorio: https://github.com/Aniquilo/wowbolivia-addons
-- Importar DESPUÉS de abrir /addons una vez (crea las columnas install_*). Se puede volver a importar:
-- no duplica addons y actualiza la versión publicada (install_ref) de los que ya existen.

-- Deadly Boss Mods
INSERT INTO addons (name, category, version, language, author, summary, description, url, image, screenshots, status, submitted_by, submitter, install_type, install_source, install_ref, install_folders, created_at, updated_at)
  SELECT 'Deadly Boss Mods', 'raids', '10.1.13_alpha', 'multi', 'Barsoom, Bunny67, Zidras, DBM-Frostmourne contributors, original DBM team', 'Avisos y temporizadores de jefes para mazmorras y bandas de toda la expansión.', 'Avisos y temporizadores de jefes para mazmorras y bandas de toda la expansión.
Autor original: Barsoom, Bunny67, Zidras, DBM-Frostmourne contributors, original DBM team.
Origen: https://github.com/Zidras/DBM-Warmane (commit 6165654fb4, 2026-08-16).
Licencia: Creative Commons BY-NC-SA 3.0.
Carpetas: DBM-AQ20, DBM-AQ40, DBM-Azeroth, DBM-BlackTemple, DBM-BWL, DBM-ChamberOfAspects, DBM-Coliseum, DBM-Core, DBM-EyeOfEternity, DBM-Gruul, DBM-GUI, DBM-Hyjal, DBM-Icecrown, DBM-Karazhan, DBM-Magtheridon, DBM-MC, DBM-Naxx, DBM-Onyxia, DBM-Outland, DBM-Party-BC, DBM-Party-Classic, DBM-Party-WotLK, DBM-PvP, DBM-Serpentshrine, DBM-SpellTimers, DBM-StatusBarTimers, DBM-Sunwell, DBM-TheEye, DBM-Ulduar, DBM-VanillaNaxx, DBM-VanillaOnyxia, DBM-VoA, DBM-VPVEM, DBM-WorldEvents, DBM-ZG, DBM-ZulAman.
Empaquetado por WoW Bolivia para instalarlo desde el launcher; el código es el original.', 'https://github.com/Aniquilo/wowbolivia-addons/tree/dbm', '', '', '1', '0', 'WoW Bolivia', 'github', 'Aniquilo/wowbolivia-addons', 'ded5ab269fb88ef763f3bce0b57156e012e2e874', '', UNIX_TIMESTAMP(), UNIX_TIMESTAMP() FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM addons WHERE name = 'Deadly Boss Mods');
UPDATE addons SET install_type = 'github', install_source = 'Aniquilo/wowbolivia-addons', install_ref = 'ded5ab269fb88ef763f3bce0b57156e012e2e874', version = '10.1.13_alpha', updated_at = UNIX_TIMESTAMP()
  WHERE name = 'Deadly Boss Mods' AND (install_source = 'Aniquilo/wowbolivia-addons' OR install_source = '');

-- Details! Damage Meter
INSERT INTO addons (name, category, version, language, author, summary, description, url, image, screenshots, status, submitted_by, submitter, install_type, install_source, install_ref, install_folders, created_at, updated_at)
  SELECT 'Details! Damage Meter', 'combat', '', 'multi', 'Terciob (versión 3.3.5: Bunny67)', 'Medidor de daño, sanación y amenaza con gráficos y desglose por habilidad.', 'Medidor de daño, sanación y amenaza con gráficos y desglose por habilidad.
Autor original: Terciob (versión 3.3.5: Bunny67).
Origen: https://github.com/Bunny67/Details-WotLK (commit 97e1cac2e4, 2021-04-12).
Licencia: GPL-3.0 (módulos) / del autor.
Carpetas: Details, Details_3DModelsPaths, Details_ChartViewer, Details_DataStorage, Details_DeathGraphs, Details_EncounterDetails, Details_SunderCount, Details_TimeLine, Details_TinyThreat.
Empaquetado por WoW Bolivia para instalarlo desde el launcher; el código es el original.', 'https://github.com/Aniquilo/wowbolivia-addons/tree/details', '', '', '1', '0', 'WoW Bolivia', 'github', 'Aniquilo/wowbolivia-addons', '1bc11643799ccfec28f453f2d16ed9dbcdad6f02', '', UNIX_TIMESTAMP(), UNIX_TIMESTAMP() FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM addons WHERE name = 'Details! Damage Meter');
UPDATE addons SET install_type = 'github', install_source = 'Aniquilo/wowbolivia-addons', install_ref = '1bc11643799ccfec28f453f2d16ed9dbcdad6f02', version = '', updated_at = UNIX_TIMESTAMP()
  WHERE name = 'Details! Damage Meter' AND (install_source = 'Aniquilo/wowbolivia-addons' OR install_source = '');

-- Skada
INSERT INTO addons (name, category, version, language, author, summary, description, url, image, screenshots, status, submitted_by, submitter, install_type, install_source, install_ref, install_folders, created_at, updated_at)
  SELECT 'Skada', 'combat', '1.8.87', 'multi', 'Kader (bkader#5341)', 'Medidor de daño y sanación modular y ligero, ideal para bandas.', 'Medidor de daño y sanación modular y ligero, ideal para bandas.
Autor original: Kader (bkader#5341).
Origen: https://github.com/bkader/Skada-WoTLK (commit 5653a241a7, 2024-03-23).
Licencia: MIT.
Carpetas: Skada, SkadaImprovement, SkadaStorage.
Empaquetado por WoW Bolivia para instalarlo desde el launcher; el código es el original.', 'https://github.com/Aniquilo/wowbolivia-addons/tree/skada', '', '', '1', '0', 'WoW Bolivia', 'github', 'Aniquilo/wowbolivia-addons', '1186f5158dfbd6c10c2e252a17455aa9550778dc', '', UNIX_TIMESTAMP(), UNIX_TIMESTAMP() FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM addons WHERE name = 'Skada');
UPDATE addons SET install_type = 'github', install_source = 'Aniquilo/wowbolivia-addons', install_ref = '1186f5158dfbd6c10c2e252a17455aa9550778dc', version = '1.8.87', updated_at = UNIX_TIMESTAMP()
  WHERE name = 'Skada' AND (install_source = 'Aniquilo/wowbolivia-addons' OR install_source = '');

-- WeakAuras
INSERT INTO addons (name, category, version, language, author, summary, description, url, image, screenshots, status, submitted_by, submitter, install_type, install_source, install_ref, install_folders, created_at, updated_at)
  SELECT 'WeakAuras', 'buffs', '5.22.1', 'multi', 'The WeakAuras Team', 'Muestra beneficios, perjuicios, tiempos de reutilización y alertas totalmente a tu gusto.', 'Muestra beneficios, perjuicios, tiempos de reutilización y alertas totalmente a tu gusto.
Autor original: The WeakAuras Team.
Origen: https://github.com/NoM0Re/WeakAuras-WotLK (commit 8a7f4b0b7e, 2026-10-18).
Licencia: GPL-2.0.
Carpetas: APIDocumentation, WeakAuras, WeakAurasArchive, WeakAurasModelPaths, WeakAurasOptions, WeakAurasStopMotion, WeakAurasTemplates.
Empaquetado por WoW Bolivia para instalarlo desde el launcher; el código es el original.', 'https://github.com/Aniquilo/wowbolivia-addons/tree/weakauras', '', '', '1', '0', 'WoW Bolivia', 'github', 'Aniquilo/wowbolivia-addons', '4c7ee1da280c5d628d2837cdacc7f17eff091eae', '', UNIX_TIMESTAMP(), UNIX_TIMESTAMP() FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM addons WHERE name = 'WeakAuras');
UPDATE addons SET install_type = 'github', install_source = 'Aniquilo/wowbolivia-addons', install_ref = '4c7ee1da280c5d628d2837cdacc7f17eff091eae', version = '5.22.1', updated_at = UNIX_TIMESTAMP()
  WHERE name = 'WeakAuras' AND (install_source = 'Aniquilo/wowbolivia-addons' OR install_source = '');

-- ElvUI
INSERT INTO addons (name, category, version, language, author, summary, description, url, image, screenshots, status, submitted_by, submitter, install_type, install_source, install_ref, install_folders, created_at, updated_at)
  SELECT 'ElvUI', 'ui', '6.09', 'multi', 'Elv, Bunny', 'Reemplazo completo de la interfaz: marcos, barras, bolsas y chat modernos.', 'Reemplazo completo de la interfaz: marcos, barras, bolsas y chat modernos.
Autor original: Elv, Bunny.
Origen: https://github.com/ElvUI-WotLK/ElvUI (commit 58ea24f797, 2022-10-26).
Licencia: Sin licencia publicada (del autor).
Carpetas: ElvUI, ElvUI_OptionsUI.
Empaquetado por WoW Bolivia para instalarlo desde el launcher; el código es el original.', 'https://github.com/Aniquilo/wowbolivia-addons/tree/elvui', '', '', '1', '0', 'WoW Bolivia', 'github', 'Aniquilo/wowbolivia-addons', 'ec7e0b9416b9f4d30e6d73d6aaed0e3302b8f997', '', UNIX_TIMESTAMP(), UNIX_TIMESTAMP() FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM addons WHERE name = 'ElvUI');
UPDATE addons SET install_type = 'github', install_source = 'Aniquilo/wowbolivia-addons', install_ref = 'ec7e0b9416b9f4d30e6d73d6aaed0e3302b8f997', version = '6.09', updated_at = UNIX_TIMESTAMP()
  WHERE name = 'ElvUI' AND (install_source = 'Aniquilo/wowbolivia-addons' OR install_source = '');

-- Questie
INSERT INTO addons (name, category, version, language, author, summary, description, url, image, screenshots, status, submitted_by, submitter, install_type, install_source, install_ref, install_folders, created_at, updated_at)
  SELECT 'Questie', 'quests', '10.0.1-335', 'multi', 'Aldori + Original Questie Team', 'Muestra en el mapa y el minimapa dónde están tus misiones, objetivos y PNJ.', 'Muestra en el mapa y el minimapa dónde están tus misiones, objetivos y PNJ.
Autor original: Aldori + Original Questie Team.
Origen: https://github.com/Aldori15/Questie (commit d695e9048e, 2026-10-16).
Licencia: Sin licencia publicada (del autor).
Carpetas: Questie-335.
Empaquetado por WoW Bolivia para instalarlo desde el launcher; el código es el original.', 'https://github.com/Aniquilo/wowbolivia-addons/tree/questie', '', '', '1', '0', 'WoW Bolivia', 'github', 'Aniquilo/wowbolivia-addons', '6a7ddbb25d6e2046e349050e1848d6169d4cb4c1', '', UNIX_TIMESTAMP(), UNIX_TIMESTAMP() FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM addons WHERE name = 'Questie');
UPDATE addons SET install_type = 'github', install_source = 'Aniquilo/wowbolivia-addons', install_ref = '6a7ddbb25d6e2046e349050e1848d6169d4cb4c1', version = '10.0.1-335', updated_at = UNIX_TIMESTAMP()
  WHERE name = 'Questie' AND (install_source = 'Aniquilo/wowbolivia-addons' OR install_source = '');

-- Auctionator
INSERT INTO addons (name, category, version, language, author, summary, description, url, image, screenshots, status, submitted_by, submitter, install_type, install_source, install_ref, install_folders, created_at, updated_at)
  SELECT 'Auctionator', 'auction', '2.6.8', 'multi', 'Zirco', 'Casa de subastas más fácil: precios claros y publicar en pocos clics.', 'Casa de subastas más fácil: precios claros y publicar en pocos clics.
Autor original: Zirco.
Origen: https://github.com/alchem1ster/WotLK-Auctionator (commit b4e3eb68dc, 2023-05-14).
Licencia: Sin licencia publicada (del autor).
Carpetas: Auctionator.
Empaquetado por WoW Bolivia para instalarlo desde el launcher; el código es el original.', 'https://github.com/Aniquilo/wowbolivia-addons/tree/auctionator', '', '', '1', '0', 'WoW Bolivia', 'github', 'Aniquilo/wowbolivia-addons', '9f1860327c06dc7440fa9c094abc1e0a1dccee01', '', UNIX_TIMESTAMP(), UNIX_TIMESTAMP() FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM addons WHERE name = 'Auctionator');
UPDATE addons SET install_type = 'github', install_source = 'Aniquilo/wowbolivia-addons', install_ref = '9f1860327c06dc7440fa9c094abc1e0a1dccee01', version = '2.6.8', updated_at = UNIX_TIMESTAMP()
  WHERE name = 'Auctionator' AND (install_source = 'Aniquilo/wowbolivia-addons' OR install_source = '');

-- Bagnon
INSERT INTO addons (name, category, version, language, author, summary, description, url, image, screenshots, status, submitted_by, submitter, install_type, install_source, install_ref, install_folders, created_at, updated_at)
  SELECT 'Bagnon', 'bags', '2.13.3', 'multi', 'Tuller', 'Junta todas tus bolsas en una sola ventana con búsqueda e inventario de tus personajes.', 'Junta todas tus bolsas en una sola ventana con búsqueda e inventario de tus personajes.
Autor original: Tuller.
Origen: https://github.com/RichSteini/Bagnon-3.3.5 (commit 27a08f8981, 2023-10-18).
Licencia: MIT.
Carpetas: Bagnon, Bagnon_Config, Bagnon_Forever, Bagnon_GuildBank, Bagnon_Tooltips, Bagnon_VoidStorage.
Empaquetado por WoW Bolivia para instalarlo desde el launcher; el código es el original.', 'https://github.com/Aniquilo/wowbolivia-addons/tree/bagnon', '', '', '1', '0', 'WoW Bolivia', 'github', 'Aniquilo/wowbolivia-addons', 'e0510b2b18f8d27afbbd7f661f1e72c82e2b54f3', '', UNIX_TIMESTAMP(), UNIX_TIMESTAMP() FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM addons WHERE name = 'Bagnon');
UPDATE addons SET install_type = 'github', install_source = 'Aniquilo/wowbolivia-addons', install_ref = 'e0510b2b18f8d27afbbd7f661f1e72c82e2b54f3', version = '2.13.3', updated_at = UNIX_TIMESTAMP()
  WHERE name = 'Bagnon' AND (install_source = 'Aniquilo/wowbolivia-addons' OR install_source = '');

-- AdiBags
INSERT INTO addons (name, category, version, language, author, summary, description, url, image, screenshots, status, submitted_by, submitter, install_type, install_source, install_ref, install_folders, created_at, updated_at)
  SELECT 'AdiBags', 'bags', '3.3.5', 'multi', 'Adirelle, backported to 3.3.5 by Sattva#7238 - discord', 'Bolsas en una sola vista, ordenadas automáticamente por tipo de objeto.', 'Bolsas en una sola vista, ordenadas automáticamente por tipo de objeto.
Autor original: Adirelle, backported to 3.3.5 by Sattva#7238 - discord.
Origen: https://github.com/Sattva-108/AdiBags (commit d8b49ed56d, 2025-07-09).
Licencia: Sin licencia publicada (del autor).
Carpetas: AdiBags.
Empaquetado por WoW Bolivia para instalarlo desde el launcher; el código es el original.', 'https://github.com/Aniquilo/wowbolivia-addons/tree/adibags', '', '', '1', '0', 'WoW Bolivia', 'github', 'Aniquilo/wowbolivia-addons', 'c8be427f3f26f44ad3d6fedb3fe95253f924e4bc', '', UNIX_TIMESTAMP(), UNIX_TIMESTAMP() FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM addons WHERE name = 'AdiBags');
UPDATE addons SET install_type = 'github', install_source = 'Aniquilo/wowbolivia-addons', install_ref = 'c8be427f3f26f44ad3d6fedb3fe95253f924e4bc', version = '3.3.5', updated_at = UNIX_TIMESTAMP()
  WHERE name = 'AdiBags' AND (install_source = 'Aniquilo/wowbolivia-addons' OR install_source = '');

-- Grid2
INSERT INTO addons (name, category, version, language, author, summary, description, url, image, screenshots, status, submitted_by, submitter, install_type, install_source, install_ref, install_folders, created_at, updated_at)
  SELECT 'Grid2', 'unitframes', 'r736', 'multi', 'Kader (bkader#5341)', 'Marcos de grupo y banda compactos, pensados para sanadores.', 'Marcos de grupo y banda compactos, pensados para sanadores.
Autor original: Kader (bkader#5341).
Origen: https://github.com/bkader/Grid2-WoTLK (commit fc8d5e139b, 2022-10-04).
Licencia: Sin licencia publicada (del autor).
Carpetas: Grid2, Grid2AoeHeals, Grid2Options.
Empaquetado por WoW Bolivia para instalarlo desde el launcher; el código es el original.', 'https://github.com/Aniquilo/wowbolivia-addons/tree/grid2', '', '', '1', '0', 'WoW Bolivia', 'github', 'Aniquilo/wowbolivia-addons', 'b34220d6846a27a5b21e1658cf04bb03daf2f3fc', '', UNIX_TIMESTAMP(), UNIX_TIMESTAMP() FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM addons WHERE name = 'Grid2');
UPDATE addons SET install_type = 'github', install_source = 'Aniquilo/wowbolivia-addons', install_ref = 'b34220d6846a27a5b21e1658cf04bb03daf2f3fc', version = 'r736', updated_at = UNIX_TIMESTAMP()
  WHERE name = 'Grid2' AND (install_source = 'Aniquilo/wowbolivia-addons' OR install_source = '');

-- Immersion
INSERT INTO addons (name, category, version, language, author, summary, description, url, image, screenshots, status, submitted_by, submitter, install_type, install_source, install_ref, install_folders, created_at, updated_at)
  SELECT 'Immersion', 'quests', '1.4.14', 'multi', 'Sebastian Lindfors', 'Ventanas de misiones y conversaciones más bonitas, al estilo de las expansiones modernas.', 'Ventanas de misiones y conversaciones más bonitas, al estilo de las expansiones modernas.
Autor original: Sebastian Lindfors.
Origen: https://github.com/s0h2x/Immersion-WotLK (commit e0b208b2ae, 2024-11-06).
Licencia: Artistic License 2.0.
Carpetas: Immersion.
Empaquetado por WoW Bolivia para instalarlo desde el launcher; el código es el original.', 'https://github.com/Aniquilo/wowbolivia-addons/tree/immersion', '', '', '1', '0', 'WoW Bolivia', 'github', 'Aniquilo/wowbolivia-addons', '78a0a483a636f52e678c7e9d5a4c2a9fc6d37cdd', '', UNIX_TIMESTAMP(), UNIX_TIMESTAMP() FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM addons WHERE name = 'Immersion');
UPDATE addons SET install_type = 'github', install_source = 'Aniquilo/wowbolivia-addons', install_ref = '78a0a483a636f52e678c7e9d5a4c2a9fc6d37cdd', version = '1.4.14', updated_at = UNIX_TIMESTAMP()
  WHERE name = 'Immersion' AND (install_source = 'Aniquilo/wowbolivia-addons' OR install_source = '');

-- Leatrix Maps
INSERT INTO addons (name, category, version, language, author, summary, description, url, image, screenshots, status, submitted_by, submitter, install_type, install_source, install_ref, install_folders, created_at, updated_at)
  SELECT 'Leatrix Maps', 'map', '3.5.44', 'multi', 'Leatrix', 'Mapa del mundo mejorado: ventana movible, coordenadas, niveles de zona y mapa revelado.', 'Mapa del mundo mejorado: ventana movible, coordenadas, niveles de zona y mapa revelado.
Autor original: Leatrix.
Origen: https://github.com/5Buttons/Leatrix-Maps-3.3.5 (commit c5e36489fe, 2026-10-19).
Licencia: Sin licencia publicada (del autor).
Carpetas: Leatrix_Maps.
Empaquetado por WoW Bolivia para instalarlo desde el launcher; el código es el original.', 'https://github.com/Aniquilo/wowbolivia-addons/tree/leatrix-maps', '', '', '1', '0', 'WoW Bolivia', 'github', 'Aniquilo/wowbolivia-addons', 'dbbfcb187432bfbe2b24e25ee6d698772a3ffd1d', '', UNIX_TIMESTAMP(), UNIX_TIMESTAMP() FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM addons WHERE name = 'Leatrix Maps');
UPDATE addons SET install_type = 'github', install_source = 'Aniquilo/wowbolivia-addons', install_ref = 'dbbfcb187432bfbe2b24e25ee6d698772a3ffd1d', version = '3.5.44', updated_at = UNIX_TIMESTAMP()
  WHERE name = 'Leatrix Maps' AND (install_source = 'Aniquilo/wowbolivia-addons' OR install_source = '');

-- Leatrix Plus
INSERT INTO addons (name, category, version, language, author, summary, description, url, image, screenshots, status, submitted_by, submitter, install_type, install_source, install_ref, install_folders, created_at, updated_at)
  SELECT 'Leatrix Plus', 'ui', '3.3.5 (3.0.131)', 'multi', 'Leatrix', 'Decenas de mejoras de calidad de vida: misiones, vendedores, chat, marcos y más.', 'Decenas de mejoras de calidad de vida: misiones, vendedores, chat, marcos y más.
Autor original: Leatrix.
Origen: https://github.com/Sattva-108/Leatrix_Plus (commit cfa45770ac, 2026-08-31).
Licencia: Sin licencia publicada (del autor).
Carpetas: Leatrix_Plus.
Empaquetado por WoW Bolivia para instalarlo desde el launcher; el código es el original.', 'https://github.com/Aniquilo/wowbolivia-addons/tree/leatrix-plus', '', '', '1', '0', 'WoW Bolivia', 'github', 'Aniquilo/wowbolivia-addons', 'e3970abee5c738e1857a30f6d5b2bc282d8fc67f', '', UNIX_TIMESTAMP(), UNIX_TIMESTAMP() FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM addons WHERE name = 'Leatrix Plus');
UPDATE addons SET install_type = 'github', install_source = 'Aniquilo/wowbolivia-addons', install_ref = 'e3970abee5c738e1857a30f6d5b2bc282d8fc67f', version = '3.3.5 (3.0.131)', updated_at = UNIX_TIMESTAMP()
  WHERE name = 'Leatrix Plus' AND (install_source = 'Aniquilo/wowbolivia-addons' OR install_source = '');

-- xCT+
INSERT INTO addons (name, category, version, language, author, summary, description, url, image, screenshots, status, submitted_by, submitter, install_type, install_source, install_ref, install_folders, created_at, updated_at)
  SELECT 'xCT+', 'combat', '3.8.5', 'multi', 'Dandruff (Hypopheria Remaster)', 'Texto de combate flotante limpio y configurable (daño, sanación, recursos).', 'Texto de combate flotante limpio y configurable (daño, sanación, recursos).
Autor original: Dandruff (Hypopheria Remaster).
Origen: https://github.com/hypopheria2k/xCT_Plus_wotlk (commit 8c9969e089, 2026-05-01).
Licencia: Sin licencia publicada (del autor).
Carpetas: xCT+.
Empaquetado por WoW Bolivia para instalarlo desde el launcher; el código es el original.', 'https://github.com/Aniquilo/wowbolivia-addons/tree/xct', '', '', '1', '0', 'WoW Bolivia', 'github', 'Aniquilo/wowbolivia-addons', 'f4f36bfe61781bba3b9099696d0d8200b4513d04', '', UNIX_TIMESTAMP(), UNIX_TIMESTAMP() FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM addons WHERE name = 'xCT+');
UPDATE addons SET install_type = 'github', install_source = 'Aniquilo/wowbolivia-addons', install_ref = 'f4f36bfe61781bba3b9099696d0d8200b4513d04', version = '3.8.5', updated_at = UNIX_TIMESTAMP()
  WHERE name = 'xCT+' AND (install_source = 'Aniquilo/wowbolivia-addons' OR install_source = '');

-- pretty_minimap
INSERT INTO addons (name, category, version, language, author, summary, description, url, image, screenshots, status, submitted_by, submitter, install_type, install_source, install_ref, install_folders, created_at, updated_at)
  SELECT 'pretty_minimap', 'map', '1.0', 'multi', 's0high', 'Minimapa con un diseño moderno y limpio.', 'Minimapa con un diseño moderno y limpio.
Autor original: s0high.
Origen: https://github.com/s0h2x/pretty_minimap (commit fed2300492, 2023-04-19).
Licencia: Sin licencia publicada (del autor).
Carpetas: pretty_minimap.
Empaquetado por WoW Bolivia para instalarlo desde el launcher; el código es el original.', 'https://github.com/Aniquilo/wowbolivia-addons/tree/pretty-minimap', '', '', '1', '0', 'WoW Bolivia', 'github', 'Aniquilo/wowbolivia-addons', '7acda814b7200e221fbcf07cca34787144df2040', '', UNIX_TIMESTAMP(), UNIX_TIMESTAMP() FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM addons WHERE name = 'pretty_minimap');
UPDATE addons SET install_type = 'github', install_source = 'Aniquilo/wowbolivia-addons', install_ref = '7acda814b7200e221fbcf07cca34787144df2040', version = '1.0', updated_at = UNIX_TIMESTAMP()
  WHERE name = 'pretty_minimap' AND (install_source = 'Aniquilo/wowbolivia-addons' OR install_source = '');

-- Carbonite
INSERT INTO addons (name, category, version, language, author, summary, description, url, image, screenshots, status, submitted_by, submitter, install_type, install_source, install_ref, install_folders, created_at, updated_at)
  SELECT 'Carbonite', 'map', '3.34c9', 'multi', 'Carbon Based Creations, LLC', 'Mapa completo con ayudante de misiones, rutas y recolección.', 'Mapa completo con ayudante de misiones, rutas y recolección.
Autor original: Carbon Based Creations, LLC.
Origen: https://github.com/anzz1/Carbonite-3.3.5 (commit ca4254e623, 2025-10-19).
Licencia: Sin licencia publicada (del autor).
Carpetas: Carbonite, CarboniteItems, CarboniteNodes, CarboniteTransfer.
Empaquetado por WoW Bolivia para instalarlo desde el launcher; el código es el original.', 'https://github.com/Aniquilo/wowbolivia-addons/tree/carbonite', '', '', '1', '0', 'WoW Bolivia', 'github', 'Aniquilo/wowbolivia-addons', '968496b347160141614bba8624de30953dede0aa', '', UNIX_TIMESTAMP(), UNIX_TIMESTAMP() FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM addons WHERE name = 'Carbonite');
UPDATE addons SET install_type = 'github', install_source = 'Aniquilo/wowbolivia-addons', install_ref = '968496b347160141614bba8624de30953dede0aa', version = '3.34c9', updated_at = UNIX_TIMESTAMP()
  WHERE name = 'Carbonite' AND (install_source = 'Aniquilo/wowbolivia-addons' OR install_source = '');

-- MoveAnything
INSERT INTO addons (name, category, version, language, author, summary, description, url, image, screenshots, status, submitted_by, submitter, install_type, install_source, install_ref, install_folders, created_at, updated_at)
  SELECT 'MoveAnything', 'ui', '18.0.8', 'multi', 'Wagthaa', 'Mueve, escala u oculta casi cualquier elemento de la interfaz.', 'Mueve, escala u oculta casi cualquier elemento de la interfaz.
Autor original: Wagthaa.
Origen: https://github.com/sirus-addons/MoveAnything (commit d82cf92608, 2025-07-18).
Licencia: Sin licencia publicada (del autor).
Carpetas: MoveAnything.
Empaquetado por WoW Bolivia para instalarlo desde el launcher; el código es el original.', 'https://github.com/Aniquilo/wowbolivia-addons/tree/moveanything', '', '', '1', '0', 'WoW Bolivia', 'github', 'Aniquilo/wowbolivia-addons', 'fbf7315a5553c1e11d1c3d67d8e0e1a5f821d8b1', '', UNIX_TIMESTAMP(), UNIX_TIMESTAMP() FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM addons WHERE name = 'MoveAnything');
UPDATE addons SET install_type = 'github', install_source = 'Aniquilo/wowbolivia-addons', install_ref = 'fbf7315a5553c1e11d1c3d67d8e0e1a5f821d8b1', version = '18.0.8', updated_at = UNIX_TIMESTAMP()
  WHERE name = 'MoveAnything' AND (install_source = 'Aniquilo/wowbolivia-addons' OR install_source = '');

-- GearScore
INSERT INTO addons (name, category, version, language, author, summary, description, url, image, screenshots, status, submitted_by, submitter, install_type, install_source, install_ref, install_folders, created_at, updated_at)
  SELECT 'GearScore', 'tooltips', '3.1.17 - Release', 'multi', 'Mirrikat45', 'Calcula el GearScore de cada jugador y lo muestra en su descripción y en la inspección.', 'Calcula el GearScore de cada jugador y lo muestra en su descripción y en la inspección.
Autor original: Mirrikat45.
Licencia: Del autor.
Carpetas: BonusScanner, GearScore.
Empaquetado por WoW Bolivia para instalarlo desde el launcher; el código es el original.', 'https://github.com/Aniquilo/wowbolivia-addons/tree/gearscore', '', '', '1', '0', 'WoW Bolivia', 'github', 'Aniquilo/wowbolivia-addons', '1f94a4cb5967442866ceea8a19e5c9a5f1bb124a', '', UNIX_TIMESTAMP(), UNIX_TIMESTAMP() FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM addons WHERE name = 'GearScore');
UPDATE addons SET install_type = 'github', install_source = 'Aniquilo/wowbolivia-addons', install_ref = '1f94a4cb5967442866ceea8a19e5c9a5f1bb124a', version = '3.1.17 - Release', updated_at = UNIX_TIMESTAMP()
  WHERE name = 'GearScore' AND (install_source = 'Aniquilo/wowbolivia-addons' OR install_source = '');

-- IDs
INSERT INTO addons (name, category, version, language, author, summary, description, url, image, screenshots, status, submitted_by, submitter, install_type, install_source, install_ref, install_folders, created_at, updated_at)
  SELECT 'IDs', 'tooltips', '1.0.2', 'multi', 'Aegir', 'Muestra el ID de objetos, hechizos, misiones y logros en sus descripciones.', 'Muestra el ID de objetos, hechizos, misiones y logros en sus descripciones.
Autor original: Aegir.
Licencia: Del autor.
Carpetas: IDs.
Empaquetado por WoW Bolivia para instalarlo desde el launcher; el código es el original.', 'https://github.com/Aniquilo/wowbolivia-addons/tree/ids', '', '', '1', '0', 'WoW Bolivia', 'github', 'Aniquilo/wowbolivia-addons', 'ad1af6ec0b1315ff83713e341bdc0177e3d82678', '', UNIX_TIMESTAMP(), UNIX_TIMESTAMP() FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM addons WHERE name = 'IDs');
UPDATE addons SET install_type = 'github', install_source = 'Aniquilo/wowbolivia-addons', install_ref = 'ad1af6ec0b1315ff83713e341bdc0177e3d82678', version = '1.0.2', updated_at = UNIX_TIMESTAMP()
  WHERE name = 'IDs' AND (install_source = 'Aniquilo/wowbolivia-addons' OR install_source = '');
