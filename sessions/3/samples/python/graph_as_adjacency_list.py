values = ('a', 'b', 'c', 'd', 'e')
a, b, c, d, e = values

# create adjacency list using a dictionary
# for each entry the key is a node in the graph
# and the value is a list of it's neighbors
adjacency_list = {
    a: [b, c, d],
    b: [d],
    c: [d, e],
    d: [e]
}

def print_paths(adjacency_list, start, end, path = []):
    """
    Prints all paths from start to end.
    """
    if path and path[-1] == end:
        print(' -> '.join(path))
        return
    
    if not path: 
        path.append(start)
        print_paths(adjacency_list, start, end, path)
    elif path[-1] in adjacency_list:
        for neighbor in adjacency_list[path[-1]]:
            print_paths(adjacency_list, start, end, [*path, neighbor])

# print all the paths from a to e 
print('print all paths between nodes \'a\' and \'e\'')  
print_paths(adjacency_list, a, e)