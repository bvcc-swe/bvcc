from math import log2, ceil

class Node:
    def __init__(self, value, left=None, right=None) -> None:
        self.value = value
        self.left = left
        self.right = right
    
    def __str__(self):
        return self.value

values = ('1', '2', '3', '4', '5', '6', '7')

def create_tree_as_list(values, start, end, targetIndex = 0, target = []):
    """
    Creates an array representation of a binary tree based on a sorted collection.
    """
    if not values: 
        return 
    
    if start > end: 
        return
    target = target or (2 ** ceil(log2(len(values))) -1) * [None]
    mid = int((start + end)/2)
    target[targetIndex] = values[mid]
    left_index = 2 * targetIndex + 1
    right_index = left_index + 1
    create_tree_as_list(values, start, mid - 1, left_index, target)
    create_tree_as_list(values, mid + 1, end, right_index, target)
    return target

def print_tree(l) -> None:
    """
    Prints tree in level order traversal.
    """
    if not l:
        return
    level_count = ceil(log2(len(l) + 1)) - 1
    
    i = 0
    while i < len(l):
        count = 2**i
        padding = ' ' * (2 * level_count + 1)
        start_padding = ' ' * (2 ** level_count - 1) 
        print(start_padding + padding.join(l[i:i+count]))
        i+=count
        level_count -= 1

list_tree = create_tree_as_list(values, 0, len(values) - 1)
print(f'binary tree represented as array: {list_tree}')
print(f'format binary tree array:')
print_tree(list_tree)