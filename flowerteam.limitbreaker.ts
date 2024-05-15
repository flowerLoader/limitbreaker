/*
 * A simple patch to expose the game's limits and allow tweaking them
 */

import { FlowerAPI } from "@flowerloader/api/FlowerAPI";
import { FlowerPlugin } from "@flowerloader/api/FlowerPlugin";
import { LogSource } from "@flowerloader/api/logSource";

export const Plugin: FlowerPlugin &
{
    CONFIG: { MaxPartySize: number }
} =
{

    GUID: "flowerteam.limitbreaker",

    VERSION: "1.0.0",

    NAME: "Limit Breaker",

    ENABLED: true,

    flower: {} as FlowerAPI,
    logger: {} as LogSource,

    CONFIG:
    {
        //Default: 5
        MaxPartySize: 10,
    },

    PluginRegistered: function (flower, logger)
    {
        Plugin.flower = flower;
        Plugin.logger = logger;
        Plugin.logger.write("Loaded");
    },

    PluginAwake: function ()
    {
        Plugin.logger.write("Setting limits");

        //@ts-ignore
        Plugin.flower.RegisterPatch(tWgm, "initNext", function (b)
        {
            this.tGameCharactor.playerTeamMemberLimitNum = Plugin.CONFIG.MaxPartySize;
        }, false);
    },

}