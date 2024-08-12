import { successResponse } from '../';

export interface ChampionInfo extends successResponse{
    freeChampionIds: number[];
    freeChampionIdsForNewPlayers: number[];
    maxNewPlayerLevel: number;
}