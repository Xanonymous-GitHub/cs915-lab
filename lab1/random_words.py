from string import ascii_lowercase
from secrets import choice
print(''.join(choice(ascii_lowercase) for i in range(len(ascii_lowercase))))
