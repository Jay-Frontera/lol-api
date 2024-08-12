import {
  InvalidSubClassConfigMock,
  ValidConfigMock,
  ValidSubClassConfigMock,
} from '../mocks/config';
import { RiotClient } from '../src';
import { RiotErrorsEnum } from '../src/types';

const validUser = 'kung fu pança#gordo';
const invalidUser = 'kung fu pança#aaaa';
const userName = validUser.split('#')[0];
const userTag = validUser.split('#')[1];

test('RSOAccountV1 should throw an error if headers are not provided', () => {
    expect(() => {
        new RiotClient(InvalidSubClassConfigMock);
    })
        .toThrow('Headers must be provided');
});

test('RSOAccountV1 should not throw an error if headers are provided', () => {
    expect(() => {
        new RiotClient(ValidSubClassConfigMock);
    })
        .not.toThrow();
});

test('RSOAccountV1 byRiotId should reply with a 200 status code', async () => {
    const client = new RiotClient(ValidConfigMock);

    const response = await client.AccountV1.byRiotId(userName, userTag);

    expect(response).toHaveProperty('error', false);
    expect(response).toHaveProperty('puuid');
});

test('RSOAccountV1 byRiotId should reply with a error status code', async () => {
    const client = new RiotClient(ValidConfigMock);

    const response = await client.AccountV1.byRiotId(invalidUser, invalidUser);

    expect(response).toHaveProperty('error', true);
    if (!response.error) return;

    expect(response).toHaveProperty('message', Object.values(RiotErrorsEnum).find((value) => value === response.message));
});

test('RSOAccountV1 byPuuid should reply with a 200 status code', async () => {
    const client = new RiotClient(ValidConfigMock);

    const validAccount = await client.AccountV1.byRiotId(userName, userTag);

    expect(validAccount).toHaveProperty('error', false);
    if (validAccount.error) return;

    const response = await client.AccountV1.byPuuid(validAccount.puuid);

    expect(response).toHaveProperty('error', false);
    expect(response).toHaveProperty('puuid');
});

test('RSOAccountV1 byPuuid should reply with a error status code', async () => {
    const client = new RiotClient(ValidConfigMock);

    const response = await client.AccountV1.byPuuid('invalid');

    expect(response).toHaveProperty('error', true);
    if (!response.error) return;

    expect(response).toHaveProperty('message', Object.values(RiotErrorsEnum).find((value) => value === response.message));
});