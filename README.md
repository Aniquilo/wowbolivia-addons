# Addons de WoW Bolivia

Addons para **World of Warcraft 3.3.5a** empaquetados por WoW Bolivia para instalarlos desde el launcher
(pestaña *Addons*). Cada addon vive en **su propia rama** con solo sus carpetas de `Interface/AddOns`.

Los addons son obra de sus autores originales: aquí solo se empaquetan y su título lleva la etiqueta
"[WoW Bolivia]". Cada rama tiene un `LEEME.md` con el autor, el repositorio y el commit de origen y la licencia.

| Addon | Rama | Autor | Origen | Licencia |
|---|---|---|---|---|
| Deadly Boss Mods | `dbm` | Barsoom, Bunny67, Zidras, DBM-Frostmourne contributors, original DBM team | [Zidras/DBM-Warmane](https://github.com/Zidras/DBM-Warmane) | Creative Commons BY-NC-SA 3.0 |
| Details! Damage Meter | `details` | — | [Bunny67/Details-WotLK](https://github.com/Bunny67/Details-WotLK) | GPL-3.0 (módulos) / del autor |
| Skada | `skada` | Kader (bkader#5341) | [bkader/Skada-WoTLK](https://github.com/bkader/Skada-WoTLK) | MIT |
| WeakAuras | `weakauras` | Blizzard Entertainment | [NoM0Re/WeakAuras-WotLK](https://github.com/NoM0Re/WeakAuras-WotLK) | GPL-2.0 |
| ElvUI | `elvui` | Elv, Bunny | [ElvUI-WotLK/ElvUI](https://github.com/ElvUI-WotLK/ElvUI) | Sin licencia publicada (del autor) |
| Questie | `questie` | Aldori + Original Questie Team | [Aldori15/Questie](https://github.com/Aldori15/Questie) | Sin licencia publicada (del autor) |
| Auctionator | `auctionator` | Zirco | [alchem1ster/WotLK-Auctionator](https://github.com/alchem1ster/WotLK-Auctionator) | Sin licencia publicada (del autor) |
| Bagnon | `bagnon` | Tuller | [RichSteini/Bagnon-3.3.5](https://github.com/RichSteini/Bagnon-3.3.5) | MIT |
| AdiBags | `adibags` | Adirelle, backported to 3.3.5 by Sattva#7238 - discord | [Sattva-108/AdiBags](https://github.com/Sattva-108/AdiBags) | Sin licencia publicada (del autor) |
| Grid2 | `grid2` | Kader (bkader#5341) | [bkader/Grid2-WoTLK](https://github.com/bkader/Grid2-WoTLK) | Sin licencia publicada (del autor) |
| Immersion | `immersion` | Sebastian Lindfors | [s0h2x/Immersion-WotLK](https://github.com/s0h2x/Immersion-WotLK) | Artistic License 2.0 |
| Leatrix Maps | `leatrix-maps` | Leatrix | [5Buttons/Leatrix-Maps-3.3.5](https://github.com/5Buttons/Leatrix-Maps-3.3.5) | Sin licencia publicada (del autor) |
| Leatrix Plus | `leatrix-plus` | Leatrix | [Sattva-108/Leatrix_Plus](https://github.com/Sattva-108/Leatrix_Plus) | Sin licencia publicada (del autor) |
| xCT+ | `xct` | Dandruff (Hypopheria Remaster) | [hypopheria2k/xCT_Plus_wotlk](https://github.com/hypopheria2k/xCT_Plus_wotlk) | Sin licencia publicada (del autor) |
| pretty_minimap | `pretty-minimap` | s0high | [s0h2x/pretty_minimap](https://github.com/s0h2x/pretty_minimap) | Sin licencia publicada (del autor) |
| Carbonite | `carbonite` | Carbon Based Creations, LLC | [anzz1/Carbonite-3.3.5](https://github.com/anzz1/Carbonite-3.3.5) | Sin licencia publicada (del autor) |
| MoveAnything | `moveanything` | Wagthaa | [sirus-addons/MoveAnything](https://github.com/sirus-addons/MoveAnything) | Sin licencia publicada (del autor) |
| GearScore | `gearscore` | Tristanian (tristanian@live.com) | propio | Del autor |
| IDs | `ids` | Aegir | propio | Del autor |

## Actualizar un addon

1. Bajar la versión nueva a `_origen/` (o editar el paquete propio).
2. `node _herramientas/empaquetar.mjs` y `node _herramientas/publicar.mjs`.
3. `git push origin --all` y en la web: Admin → Addons → editar → botón de GitHub, o importar `catalogo-web.sql`.
