# Jump

The Wave2 architecture does not normally support any type of flow control other than mutating the program counter directly.

This means that in order to perform jumps or conditional execution, we need to perform arithmetic with the program counter.

The simplest method is to move values directly into the PC, a typical example might be to jump back to the start of private memory to cause your program to loop.

```w2s
.memory ;0x0000
039c 0040
.code ;0x0040
mov r0, [c0.x]
notdst r0
mov [c0.x], r0
wmov ri, c0.y
```

On the final line we use the [WSelect](../wselect.md) move instruction to move the second word of `c0` into `ri` the program counter register.

Wave2Assembly provides some helpful macros for modifying the program counter more ergonomically.

We can use [labels](./lables.md) to mark locations to jump to more easily:

```w2s
:loop

; loop code goes here

jmp :loop
```

Additionally we can give jump the value of a register to jump to the address stored therein:

```w2s
jmp r4
```

It's also possible to combine these two by using the [set](./set.md) macro to place a labelled address into a register, and then perform arithmetic on that before jumping to that address. This would enable offsetting your jump conditionally, such as for selecting one of several subroutines, or implementing function lookup tables, jump lists, etc.