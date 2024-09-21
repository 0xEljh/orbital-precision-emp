# Next.js Client for Orbital Precision EMP

## Setup

This is a t3 (nextjs) project. To get started, install the dependencies, fill in the `.env` file, and start the server:

    ```bash
    npm install
    cp .env.example .env
    npm run dev
    ```

## Features

There are two types of users for Orbital Precision EMP:

1. **Curators/Campaign Managers**: These users are responsible for curating users for their airdrop campaigns. They don't want bots to be farming their campaigns.
2. **Participants/Claimers**: These users that want to claim tokens; we don't want bots to be claiming tokens.

This client has both types of users. Each are exposed to a different set of features.

### Curators/Campaign Managers

...

### Participants/Claimers

To collect their airdrop, they sign in with their wallet.
If they are eligible but have otherwise been flagged as a bot, they will be asked to sign in with WorldID.
