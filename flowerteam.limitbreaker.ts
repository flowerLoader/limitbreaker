/*
 * A simple patch to expose the game's limits and allow tweaking them
 */

import { FlowerMeta, FlowerAPI, LogSource, BasePlugin } from "@flowerloader/api";
import { GameDataCOAW } from "@flowerloader/coawtypes";

export const META: FlowerMeta =
{
    GUID: "flowerteam.limitbreaker",
    VERSION: "1.0.1",
    NAME: "Limit Breaker",
    ENABLED: true
};

export default class Plugin extends BasePlugin<GameDataCOAW>
{
    CONFIG =
        {
            //Default: 5
            MaxPartySize: 10,
        }

    Awake()
    {
        this.logger.write("Setting limits");
        this.flower.GetGameMain().tGameMain.tGameCharactor.playerTeamMemberLimitNum = this.CONFIG.MaxPartySize;
    }

}