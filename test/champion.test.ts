import { ValidConfigMock } from '../mocks/config';
import { RiotClient } from '../src';

test('Champion rotation should reply with a 200 status code', async () => {
    const client = new RiotClient(ValidConfigMock);

    const response = await client.ChampionV3.championRotations();

    expect(response).toHaveProperty('error', false);
    expect(response).toHaveProperty('freeChampionIdsForNewPlayers');
    expect(response).toHaveProperty('freeChampionIds');
    expect(response).toHaveProperty('maxNewPlayerLevel');
});