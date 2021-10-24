# create dict literal
d = {'a': 1, 'b': 2}
print(f'create dictionary literal: {d}')

# create dict object
d  = dict(c=3, d=4)
print(f'create dictionary object: {d}')

# add item to dict
d['e'] = 5
print(f'add item to dictionary: {d}')

# get item from dictionary with key, e
print(f'get item from dictionary with key, \'e\': {d["e"]} ')

# remove item from dict with key key, e
del d['e']
print(f'remove item from dictionary with key, \'e\': {d}')

# test for existence
print(f'test for existence of key, \'d\': {"d" in d}')

# iterate over dict keys
print('iterate over keys:')
for k in d:
    print(k)

# iterate over values
print(f'iterate over values:')
for v in d.values():
    print(v)

# iterate over key value pairs
print('iterate over key-value pairs')
for kv in d.items():
    print(kv)
