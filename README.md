# odin-calculator
making a calculator

July 2nd log#1:

THOUGHT PROCESS: My thought process is to assign rank to the operators where rank 3 = + -, rank 2 = * / %, and rank 1 = () these ranks will determine how operations are performed. everytime a button is pressed an object will be placed into an array with the according value, type, and rank(if operator). if numbers a pressed back to back ex. 5 then 6 is pressed these will be concatenated together immediately being one object hence the number objects will only by stored once an operator is pressed.

Once equal is pressed we can perform operations. We will start at arr[0] and move to the right.

step 1. grab 2 numbers seperated by an operation
step 2. check the rank of the operation if rank is greater than current move to that operation. do this until greatest or equal rank found.
step 3. remove operation and numbers and reorder arr. add in new number to given position.
step 4. go back to position 0 and start step 1
 
Knows:

Numbers will be seperated by a operator. basic syntax will be (number)(operator)(number)
Will have to account for decimal and negative numbers
Need to throw exception when invalid syntax or divide by 0 or other logical errors. Will throw this after equal is pressed

Features could add:
mouse position select on the screen
buttons to scroll the screen when overflow is reached
more mathematical operations






