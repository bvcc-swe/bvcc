values = ('a', 'b', 'c', 'd', 'e')

# create GraphNode class
class GraphNode:
    def __init__(self, value, *neighbors):
        self.value = value
        self.neighbors = [*neighbors]

# create a list of graph nodes using a list comprehension
# then use destructuring to assign them to variabless
a, b, c, d, e = [GraphNode(v) for v in values]

# assign neighbors
a.neighbors.extend((b, c, d))
b.neighbors.append(d)
c.neighbors.extend((d,e))
d.neighbors.append(e)

def print_path(start, end, path = []):
    """
    Print all paths from start to end.
    """
    if path and path[-1] == end:
        print(' -> '.join([n.value for n in path]))
    
    if not path:
        path.append(start)
        print_path(start, end, path)
    elif path[-1].neighbors:
        for n in path[-1].neighbors:
            print_path(start, end, [*path, n])

# print all paths from a to e
print_path(a, e)



    

