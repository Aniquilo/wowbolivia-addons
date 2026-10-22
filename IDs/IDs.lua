local function addLine(tooltip, text, id, add)
	for i = 1, 15, 1 do
		local frame = _G[tooltip:GetName().."TextLeft"..i]
		
		if frame then
			local t = frame:GetText()
			if t then
				if t == text then
					return
				end
			end
		end
	end

	tooltip:AddLine(" ")
	if add and add ~= "" then
		tooltip:AddDoubleLine(text, id.." ("..add..")", 0.2, 0.6, 1, 0.2, 0.6, 1)
	else
		tooltip:AddDoubleLine(text, id, 0.2, 0.6, 1, 0.2, 0.6, 1)
	end
	tooltip:Show()
end

local function getItemID(str)
	if str then
		if str:find("item:") then
			_, _, str = str:find("item:(%d+):")
		end
		return tonumber(str)
	end
	return nil
end

local function handleAura(tooltip, ...)
	local _, rank, _, _, _, _, _, _, _, _, id = UnitAura(...)
	if id and rank then
		addLine(tooltip, "ID de hechizo", id, rank)
	end
end

local function handleItemRef(link)
	if link:find("^spell:") or link:find("^enchant:") then
		local pos = link:find(":") + 1
		local id = link:sub(pos)
		if id:find(":") then
			pos = id:find(":") - 1
			id = id:sub(1, pos)
		end
		if id then
			_, rank = GetSpellInfo(id)
			addLine(ItemRefTooltip, "ID de hechizo", id, rank)
		end
	elseif link:find("^achievement:") then
		local pos = link:find(":") + 1
		local endpos = link:find(":", pos) - 1
		if pos and endpos then
			local id = link:sub(pos, endpos)
			if id then
				addLine(ItemRefTooltip, "ID de logro", id)
			end
		end
	elseif link:find("^quest:") then
		local pos = link:find(":") + 1
		local endpos = link:find(":", pos) - 1
		if pos and endpos then
			local id = link:sub(pos, endpos)
			local level = link:sub(endpos + 2)
			if id and level then
				level = "Nivel "..level
				addLine(ItemRefTooltip, "ID de misión", id, level)
			end
		end
	elseif link:find("^item:") then
		local pos = link:find(":") + 1
		local endpos = link:find(":", pos) - 1
		if pos and endpos then
			local id = link:sub(pos, endpos)
			local _, _, _, level = GetItemInfo(link)
			if id and level then
				level = "Nivel de objeto "..level
				addLine(ItemRefTooltip, "ID de objeto", id, level)
			end
		end
	elseif link:find("^unit:") then
		local pos = link:find(":") + 1
		local endpos = link:find(":", pos) - 1
		if pos and endpos then
			local guid = link:sub(pos, endpos)
			if guid then
				local unitType = tonumber(guid:sub(5, 5), 16)
				if unitType == 3 then
					local id = tonumber(guid:sub(8, 12), 16)
					if id then
						addLine(ItemRefTooltip, "ID de PNJ", id)
					end
				elseif unitType == 0 then
					local id = tonumber(guid, 16)
					if id then
						addLine(ItemRefTooltip, "GUID del jugador", id)
					end
				end
			end
		end
	else
		--print("unhandled link: "..link)
	end
end

local function handleSpell(tooltip)
	local _, rank, id = tooltip:GetSpell()
	if id and rank then
		addLine(tooltip, "ID de hechizo", id, rank)
	end
end

local function handleItem(tooltip, lnk)
	local id = nil
	if lnk then
		id = getItemID(lnk)
	else
		_, link = tooltip:GetItem()
		id = getItemID(link)		
	end
	if id then
		local _, _, _, level = GetItemInfo(id)
		if level then
			level = "Nivel de objeto "..level
			addLine(tooltip, "ID de objeto", id, level)
		end
	end
end

local function handleMouseover()
	if not GameTooltip:IsVisible() or not UnitExists("mouseover") then
		return
	end

	if UnitIsPlayer("mouseover") then
		local guid = tonumber(UnitGUID("mouseover"), 16)
		if guid ~= 0 then
			addLine(GameTooltip, "GUID del jugador", guid)
		end
	else
		local guid = UnitGUID("mouseover")
		local unitType = tonumber(guid:sub(5, 5), 16)
		local id = nil
		if unitType == 3 or unitType == 5 then
			id = tonumber(guid:sub(8, 12), 16)
		elseif unitType == 4 then
			id = tonumber(guid:sub(6, 12), 16)
		end
		if id and id ~= 0 then
			local str = ""
			if unitType == 3 then
				str = "ID de PNJ"
			elseif unitType == 4 then
				str = "Pet GUID"
			elseif unitType == 5 then
				str = "Vehicle ID"
			end
			addLine(GameTooltip, str, id)
		end
	end
end

hooksecurefunc(GameTooltip, "SetUnitBuff", handleAura)

hooksecurefunc(GameTooltip, "SetUnitDebuff", handleAura)

hooksecurefunc(GameTooltip, "SetUnitAura", handleAura)

hooksecurefunc("SetItemRef", handleItemRef)

GameTooltip:HookScript("OnTooltipSetSpell", handleSpell)

GameTooltip:HookScript("OnTooltipSetItem", handleItem)

if AtlasLootTooltip then
	hooksecurefunc(AtlasLootTooltip, "SetHyperlink", handleItem)
end

local f = CreateFrame("frame")
f:RegisterEvent("UPDATE_MOUSEOVER_UNIT")
f:SetScript("OnEvent", handleMouseover)
