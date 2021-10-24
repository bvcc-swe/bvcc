# create list literal
l = [1,2,3]
print(f'create list literal: {l}')

# create list object
l = list((3,4,5))
print(f'create list object: {l}')

# add item to list
l.append(6)
print(f'add item to list: {l}')

# get item at index 2
print(f'get item at index 2: {l[2]}')

# write item at index 2
l[2] = l[2-1]
print(f'write item at index 2: {l[2]}')

# remove item, at index 1
del l[1]
print(f'remove item at index 1: {l}')

# iterate over list values
print('iterate over list values')
for v in l:
    print(f'value: {v}')

# iterate over indexes
print('iterate over indexes')
for i in range(len(l)):
    print(f'index: {i}, value: {l[i]}')