# create list item class
class LinkedListItem:
    def __init__(self, value):
        self.value = value
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
    
    def insert(self, value):
        """
        Insert item at the head of the linked list.
        """
        item = LinkedListItem(value)
        if self.head is None: 
            self.head = item
        else:
            item.next = self.head
            self.head = item
    
    def remove(self, value):
        """
        Remove item from the head of the linked list.
        """
        if self.head is None:
            return
        prev = None
        cur = self.head
        while cur is not None and cur.value != value:
            prev = cur
            cur = cur.next
        
        if prev is not None:
            prev.next = cur.next
        else:
            self.head = None

        return cur
            
    def find(self, value):
        """
        Find a value in the linked list.
        """
        temp = self.head
        while temp is not None and temp.value != value:
            temp = temp.next
        return temp

    def __iter__(self):
        temp = self.head
        while temp is not None:
            yield temp
            temp = temp.next
    
    def __str__(self) -> str:
        return ' -> '.join(map(lambda x: str(x.value), self))
        
# create linked list
l = LinkedList()

# add items to linked list
l.insert(1)
l.insert(2)
l.insert(3)
print(f'add items to linked list: {l}')

# remove item from linked list
l.remove(2)
print(f'remove item from linked list: {l}')

# find item in linked list
print(f'find item with value, 3, in linked list: {l.find(3)}')
