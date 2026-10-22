if GetLocale() ~= "esES" and GetLocale() ~= "esMX" then return end
local L

-- Doom Lord Kazzak
L = DBM:GetModLocalization("Kazzak")

L:SetGeneralLocalization({
	name = "Señor de fatalidad Kazzak"
})

L:SetMiscLocalization({
	DBM_KAZZAK_EMOTE_ENRAGE		= "¡%s se enfurece!"--Probalby won't be used, at least not long. Once spellid replaces it
})

-- Doomwalker
L = DBM:GetModLocalization("Doomwalker")

L:SetGeneralLocalization({
	name = "Caminante del Destino"
})

L:SetMiscLocalization({
	DBM_DOOMW_EMOTE_ENRAGE	= "¡%s se enfurece!"--Probalby won't be used, at least not long. Once spellid replaces it
})

-- ==== WoW Bolivia: textos que faltaban en español (_herramientas/traducir.mjs) ====
do
	local L = DBM:GetModLocalization("Quest")
	L:SetGeneralLocalization({
		["name"] = "Misión",
	})
	L:SetOptionLocalization({
		["Timers"] = "Mostrar temporizadores de algunas misiones de escolta",
	})
end
