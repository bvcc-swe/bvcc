# create string literal
s = 'Black Lives Matter'
print(f'create string literal: {s}')

# create string object
s = str('BLM')
print(f'create string object: {s}')

# get item at index 2
print(f'get item at index 2: {s[2]}')

# write item at index 2 - an exception is thrown when
# attempting to write to a string because it is immutable
try:
    s[0] = 'A'
except TypeError as e:
    print(f'write index: {e}')

# iterate over string
print(f'iterate over string:')
for c in s:
    print(c)

# iterate over index
print(f'iterate over index:')
for i in range(len(s)):
    print(s[i])