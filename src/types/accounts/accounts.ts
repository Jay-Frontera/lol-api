import { successResponse } from '../';

export interface byRiotIdParams {
    gameName: string;
    tagLine: string;
}
export interface byPuuidParams {
    puuid: string;
}

export interface byGameNameParams {
    gameName: gameNames;
    puuid: string;
}

export enum gameNames {
    VALORANT = 'val',
    LEGENDS_OF_RUNETERRA = 'lor',
}

export interface AccountDto extends successResponse {
    puuid: string;
    gameName?: string;
    tagLine?: string;
}