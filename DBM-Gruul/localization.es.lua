if GetLocale() ~= "esES" and GetLocale() ~= "esMX" then return end
local L

--Maulgar
L = DBM:GetModLocalization("Maulgar")

L:SetGeneralLocalization({
	name = "Su majestad Maulgar"
})

--Gruul the Dragonkiller
L = DBM:GetModLocalization("Gruul")

L:SetGeneralLocalization({
	name = "Gruul el Asesino de Dragones"
})

L:SetWarningLocalization({
	WarnGrowth	= "%s (%d)"
})

L:SetOptionLocalization({
	WarnGrowth	= "Mostrar aviso para $spell:36300"
})

-- ==== WoW Bolivia: textos que faltaban en español (_herramientas/traducir.mjs) ====
do
	local L = DBM:GetModLocalization("Gruul")
	L:SetOptionLocalization({
		["RangeDistance"] = "Distancia del marco de alcance para $spell:33654",
		["Smaller"] = "Distancia menor (11)",
		["Safe"] = "Distancia más segura (18)",
	})
end
