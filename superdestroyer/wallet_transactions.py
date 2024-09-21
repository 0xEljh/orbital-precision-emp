import requests

# The Graph endpoint for Ethereum data
GRAPH_API_URL = ""


# GraphQL query to get ETH transfers for a particular wallet
def fetch_transfers(wallet_address):
    query = """
    query ($wallet: String!) {
      transfers(where: { from: $wallet }) {
        id
        from
        to
        value
        blockNumber
      }
    }
    """

    variables = {"wallet": wallet_address}

    response = requests.post(
        GRAPH_API_URL, json={"query": query, "variables": variables}
    )

    if response.status_code == 200:
        return response.json()["data"]["transfers"]
    else:
        raise Exception(
            f"Query failed. Status code: {response.status_code}, Response: {response.text}"
        )


if __name__ == "__main__":
    # Example usage: fetching transfers for a specific wallet
    wallet_address = "0x5d721a67fF915b9D5cd9B6d5a3FFE8c7D05daa0e"
    transfers = fetch_transfers(wallet_address)

    # Print the extracted transfer details
    for tx in transfers:
        print(f"Transaction ID: {tx['id']}")
        print(f"Sender: {tx['from']}")
        print(f"Receiver: {tx['to']}")
        print(f"Value: {tx['value']} ETH")
        print(f"Block: {tx['blockNumber']}")
        print("---")
