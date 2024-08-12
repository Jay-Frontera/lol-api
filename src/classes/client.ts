import axios from 'axios';

import {
  LeagueClassSpawnConfig,
  LeagueSubClassSpawnConfig,
} from '../types';
import {
  SetBaseHeaders,
  validateClassConfig,
} from '../utils';
import { RSOAccountV1 } from './account';
import { ChampionV3 } from './champion';

/**
 * The RiotClient class is the main class for interacting with the Riot API.
 * It requires an API key and a region to execute against.
 * @class RiotClient
 * @param {string} apiKey - The API key to use for requests
 * @param {ExecuteRegion} region - The region to execute against
 * @throws {Error} Will throw an error if an API key is not provided
 * @throws {Error} Will throw an error if a region is not provided
 * @example const client = new RiotClient({ apiKey: 'RGAPI-1234-1234-1234-1234', region: ExecuteRegion.AMERICAS });
 */
export class RiotClient {
	private headers = new Headers();

	private SubClassConfig: LeagueSubClassSpawnConfig;

	public AccountV1: RSOAccountV1;
	public ChampionV3: ChampionV3;

	constructor(config: LeagueClassSpawnConfig) {
		validateClassConfig(config);

		SetBaseHeaders({
			headers: this.headers
		})

		const headersObj: any = {}

		this.headers.forEach((value, key) => {
			headersObj[key] = value;
		})

		this.SubClassConfig = {
			headers: this.headers,
			axiosInstance: axios.create({
				baseURL: config.region,
				headers: headersObj
			}),
			axiosPlatformInstance: axios.create({
				baseURL: config.regionPlatform,
				headers: headersObj
			}),
			...config
		}

		this.AccountV1 = new RSOAccountV1(this.SubClassConfig);
		this.ChampionV3 = new ChampionV3(this.SubClassConfig);
	}
}