if GetLocale() ~= "esMX" then return end
local L

------------------------------
-- Químicos La Corona, S.L. --
------------------------------
L = DBM:GetModLocalization("ApothecaryTrio")

L:SetTimerLocalization({
	HummelActive		= "Hummel entra en combate",
	BaxterActive		= "Baxter entra en combate",
	FryeActive			= "Frye entra en combate"
})

L:SetOptionLocalization({
	TrioActiveTimer		= "Mostrar temporizadores para cuando los apotecarios entren en combate"
})

L:SetMiscLocalization({
	SayCombatStart		= "¿Se han molestado en decirte quién soy y por qué estoy haciendo esto?"
})

-----------
-- Ahune --
-----------
L = DBM:GetModLocalization("Ahune")

L:SetWarningLocalization({
	Emerged			= "Ahune vuelve a la superficie",
	specWarnAttack	= "Ahune es vulnerable - ¡Ataca ahora!"
})

L:SetTimerLocalization({
	SubmergeTimer	= "Sumergir",
	EmergeTimer		= "Volver a la superficie"
})

L:SetOptionLocalization({
	Emerged			= "Mostrar aviso cuando Ahune vuelva a la superficie",
	specWarnAttack	= "Mostrar aviso especial cuando Ahune se vuelva vulnerable",
	SubmergeTimer	= "Mostrar temporizador para cuando Ahune se sumerja",
	EmergeTimer		= "Mostrar temporizador para cuando Ahune vuelva a la superficie"
})

L:SetMiscLocalization({
	Pull			= "¡La piedra de hielo se ha derretido!"
})

---------------------------
-- Coren Cerveza Temible --
---------------------------
L = DBM:GetModLocalization("CorenDirebrew")

L:SetWarningLocalization({
	specWarnBrew		= "¡Bebe la cerveza antes de que te lance otra!",
	specWarnBrewStun	= "SUGERENCIA: ¡Te han dado! ¡No te olvides de beber la cerveza!"
})

L:SetOptionLocalization({
	specWarnBrew		= "Mostrar aviso especial para $spell:47376",
	specWarnBrewStun	= "Mostrar aviso especial para $spell:47340"
})

L:SetMiscLocalization({
	YellBarrel			= "¡Tengo el barril!"
})

--------------------------
-- El Jinete decapitado --
--------------------------
L = DBM:GetModLocalization("HeadlessHorseman")

L:SetWarningLocalization({
	WarnPhase				= "Fase %d",
	warnHorsemanSoldiers	= "Calabazas con pulso",
	warnHorsemanHead		= "Cabeza de El jinete decapitado"
})

L:SetOptionLocalization({
	WarnPhase				= "Mostrar aviso para cambios de fase",
	warnHorsemanSoldiers	= "Mostrar aviso cuando aparezcan Cabalazas con pulso",
	warnHorsemanHead		= "Mostrar aviso cuando aparezca la Cabeza de El jinete decapitado"
})

L:SetMiscLocalization({
	HorsemanSummon			= "Jinete álzate...",
	HorsemanHead			= "¡Ven aquí, idiota!",
	HorsemanSoldiers		= "Un soldado se yergue enfrentando el desafío. Sea la victoria para el caballero abatido.",
	SayCombatEnd			= "Hasta este punto he llegado antes. ¿Qué nueva aventura tendré por delante?"
})

-- ==== WoW Bolivia: textos que faltaban en español (_herramientas/traducir.mjs) ====
do
	local L = DBM:GetModLocalization("ApothecaryTrio")
	L:SetGeneralLocalization({
		["name"] = "Trío de boticarios",
	})
end
do
	local L = DBM:GetModLocalization("Ahune")
	L:SetTimerLocalization({
		["TimerCombat"] = "Empieza el combate",
	})
	L:SetOptionLocalization({
		["TimerCombat"] = "Mostrar temporizador hasta que empiece el combate",
	})
end
do
	local L = DBM:GetModLocalization("CorenDirebrew")
	L:SetGeneralLocalization({
		["name"] = "Coren Cerveza Temible",
	})
end
do
	local L = DBM:GetModLocalization("HeadlessHorseman")
	L:SetGeneralLocalization({
		["name"] = "Jinete decapitado",
	})
	L:SetOptionLocalization({
		["specWarnHorsemanHead"] = "Mostrar aviso especial para Torbellino (a partir de la 2.ª aparición de la cabeza)",
	})
end
do
	local L = DBM:GetModLocalization("WarmaneTowerDefense")
	L:SetGeneralLocalization({
		["name"] = "Defensa de la torre (2024)",
	})
	L:SetTimerLocalization({
		["TimerRound"] = "Ronda %d (%s)",
	})
	L:SetOptionLocalization({
		["TimerRound"] = "Al ganar una ronda, mostrar temporizador hasta la siguiente (con su número y si es de jefe o de esbirros)",
	})
end
