/*
 * A simple patch to expose the game's limits and allow tweaking them
 */

import { FlowerMeta, IFlowerPlugin, FlowerAPI, LogSource } from "@flowerloader/api";

export const META: FlowerMeta =
{
    GUID: "flowerteam.limitbreaker",
    VERSION: "1.0.0",
    NAME: "Limit Breaker",
    ENABLED: true
};

export default class Plugin implements IFlowerPlugin
{

    flower: FlowerAPI
    logger: LogSource

    CONFIG =
        {
            //Default: 5
            MaxPartySize: 10,
        }

    Awake()
    {
        this.logger.write("Setting limits");
        const plugin = this;

        //@ts-ignore
        this.flower.RegisterPatch(this.flower.GetGameMain(), "initNext", function (this: b)
        {
            this.tGameCharactor.playerTeamMemberLimitNum = plugin.CONFIG.MaxPartySize;
        }, false);
    }

    constructor(flower: FlowerAPI, logger: LogSource)
    {
        this.flower = flower;
        this.logger = logger;
        this.logger.write("Loaded");
    }
}