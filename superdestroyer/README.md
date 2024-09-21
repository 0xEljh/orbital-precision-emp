# Superdestroyer

Flask backend providing sybil detection methods.

Some key assumptions about sybil wallets:

- In a given list of wallets, if there's a sybil in it, there will be a sibling (i.e. another wallet controlled by the same entity) in the list.
- The sybil may have a similar behavior to the sibling, but with some differences.
