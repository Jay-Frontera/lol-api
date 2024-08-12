import {
  AccountDto,
  ErrorResponse,
  LeagueSubClassSpawnConfig,
} from '../types';
import {
  errorStatusHandler,
  requestUrl,
  validateSubClassConfig,
} from '../utils';

/**
 * Requests related to the account service are available here.
 * @param {LeagueSubClassSpawnConfig} config
 * @example const client = new RiotClient({ apiKey: 'RGAPI-1234-1234-1234-1234', region: ExecuteRegion.AMERICAS });
 * const response = await client.AccountV1.byRiotId('JoshMomoa', 'NA1');
 * @see https://developer.riotgames.com/apis#account-v1
 */
export class RSOAccountV1 {
    private config: LeagueSubClassSpawnConfig;
    private endpoints = {
        account: '/riot/account/v1/accounts',
        "active-shards": '/riot/account/v1/active-shards/by-game'
    }

    constructor(config: LeagueSubClassSpawnConfig) {
        validateSubClassConfig(config);

        this.config = config;
    }

    /**
     * Get account by the summoner name and tag line of the player.
     * @param gameName - The game name of the player
     * @param tagLine - The tag line of the player
     * @returns {Promise<ErrorResponse | byRiotIdResponse>} - The response from the API
     * @example const response = await client.AccountV1.byRiotId('JoshMomoa', 'NA1');
     * @see https://developer.riotgames.com/apis#account-v1/GET_getByRiotId
     */
    public async byRiotId(gameName: string, tagLine: string): Promise<ErrorResponse | AccountDto> {
        const axios = this.config.axiosInstance;

        const endpointUrl = requestUrl(`${this.endpoints.account}/by-riot-id/${gameName}/${tagLine}`, this.config);

        try {
            const { data } = await axios.get(endpointUrl);

            return {
                error: false,
                ...data
            };
        } catch (error) {
            return errorStatusHandler(error);
        }
    }

    /**
     * Get account by the puuid of the player.
     * @param puuid - The puuid of the player
     * @returns {Promise<ErrorResponse | AccountDto>} - The response from the API
     * @example const response = await client.AccountV1.byPuuid('puuid');
     * @see https://developer.riotgames.com/apis#account-v1/GET_getByPuuid
    */
    public async byPuuid(puuid: string): Promise<ErrorResponse | AccountDto> {
        const axios = this.config.axiosInstance;

        const endpointUrl = requestUrl(`${this.endpoints.account}/by-puuid/${puuid}`, this.config);

        try {
            const { data } = await axios.get(endpointUrl);

            return {
                error: false,
                ...data
            };
        } catch (error) {
            return errorStatusHandler(error);
        }
    }
}