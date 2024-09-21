import networkx as nx
import matplotlib.pyplot as plt

import community

def build_graph(transactions):
    G = nx.Graph()

    for sender, reciever, amount in transactions:
        # add nodes
        if not G.has_node(sender):
            G.add_node(sender)
        if not G.has_node(reciever):
            G.add_node(reciever)
        
        # add edges
        G.add_edge(sender, reciever, weight=amount)

    return G


def get_clusters(graph):
    communities = community.best_partition(graph)
    return communities