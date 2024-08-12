import {
  InvalidApiKeyConfigMock,
  InvalidRegionConfigMock,
  InvalidRegionPlatformconfigMock,
  ValidConfigMock,
} from '../mocks/config';
import { RiotClient } from '../src';

test('RiotClient should throw an error if an API key is not provided', () => {
    expect(() => {
        new RiotClient(InvalidApiKeyConfigMock);
    })
        .toThrow('An valid API key must be provided');
});

test('RiotClient should throw an error if an invalid region is provided', () => {
    expect(() => {
        new RiotClient(InvalidRegionConfigMock);
    })
        .toThrow('An valid region must be provided');
});

test('RiotClient should throw an error if an invalid region platform is provided', () => {
    expect(() => {
        new RiotClient(InvalidRegionPlatformconfigMock);
    })
        .toThrow('An valid region platform must be provided');
});

test('RiotClient should not throw an error if an API key and region are provided', () => {
    expect(() => {
        new RiotClient(ValidConfigMock);
    })
        .not.toThrow();
});