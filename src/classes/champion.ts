import {
  ChampionInfo,
  ErrorResponse,
  LeagueSubClassSpawnConfig,
} from '../types';
import {
  errorStatusHandler,
  requestUrl,
} from '../utils';

/**
 * Requests related to the champion service are available here.
 * @param {LeagueSubClassSpawnConfig} config
 * @example const client = new RiotClient({ apiKey: 'RGAPI-1234-1234-1234-1234', region: ExecuteRegion.AMERICAS });
 * @example const response = await client.ChampionV3.getChampionRotations();
 * @see https://developer.riotgames.com/apis#champion-v3
 */
export class ChampionV3 {
    private config: LeagueSubClassSpawnConfig;

    private endpoints = {
        "champion-rotations": '/lol/platform/v3/champion-rotations'
    }

    constructor(config: LeagueSubClassSpawnConfig) {
        this.config = config;
    }

    /**
     * Get the list of available champions.
     * @returns {Promise<ErrorResponse | ChampionInfo>} - The response from the API
     * @example const response = await client.ChampionV3.championRotations();
     * @see https://developer.riotgames.com/apis#champion-v3/GET_getChampionRotations
     */
    public async championRotations(): Promise<ChampionInfo | ErrorResponse> {
        const axios = this.config.axiosPlatformInstance;

        const endpointUrl = requestUrl(this.endpoints["champion-rotations"], this.config);

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