from functools import reduce
from math import log2, ceil

class Node:
    def __init__(self, value, left=None, right=None) -> None:
        self.value = value
        self.left = left
        self.right = right
    
    def __str__(self):
        return self.value

values = ('1', '2', '3', '4', '5', '6', '7')

def create_tree(values, start, end) -> Node:
    """
    Creates a node representation of a binary tree based on a sorted collection.
    """
    if not values or start > end: 
        return 
    mid = int((start + end)/2)
    root = Node(values[mid])
    root.left = create_tree(values, start, mid - 1)
    root.right = create_tree(values, mid + 1, end)
    return root
    
def print_tree(node) -> None:
    """
    Prints tree in level order traversal.
    """
    if node is None:
        return

    q1 = [node]
    q2 = []

    while q1:
        q2.append(q1)
        q1 = []
        append = False
        for cur in q2[-1]:
            left = cur.left if cur else None
            right = cur.right if cur else None
            append = append or left or right
            q1.extend((left, right))
        if not append:
            break 
        
    level_count = len(q2) - 1
    
    while q2:
        level = map(lambda x: str(x.value) if x else ' ', q2.pop(0))
        padding = ' ' * (2 * level_count + 1)
        start_padding = ' ' * (2 ** level_count - 1)  
        print(start_padding + padding.join(level))
        level_count -= 1

root = create_tree(values, 0, len(values) -1)
print('format binary tree')
print_tree(root)