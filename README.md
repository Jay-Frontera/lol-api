<div align="center">

# League of legends api

<img src="./images/banner.png">
</div>

📦 A wrapper built on top of Riot Games Api built focusing only at League of Legends

## Usage

`yarn add lol-sdk` or `npm i lol-sdk`

## Example code

```ts
import { RiotClient, ExecuteRegion } from "lol-sdk";

const client = new RiotClient({
  apiKey: fakeValidApikey,
  region: ExecuteRegion.AMERICAS,
});

const response = await client.AccountV1.byRiotId("JoeMomoa", "Momoa");
```

## All Implemented API methods

```ts
import { RiotClient, ExecuteRegion, ExecuteRegionPlatform } from "lol-sdk";

const client = new RiotClient({
  apiKey: apiKey,
  region: ExecuteRegion.EUROPE,
  regionPlatform: ExecuteRegionPlatform.EUN1,
});

// Account v1
const accountV1 = client.AccountV1;

accountV1.byPuuid();
accountV1.byRiotId();
// Champion v3
const championV3 = client.ChampionV3;
campionV3.championRotations();
```

## Development

- Clone this repository
- Run `yarn` or `npm i -g yarn`
- For testing check `./test`
- Run tests by running `yarn test`

# 🚧 This repository is a work in progress
# Disclaimer

This repository is for education porpouses only, if you need to claim something just open an issue or contact me through any socials in my personal profile
