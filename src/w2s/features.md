# Language Features

```arm
mov 12
```

```w2s
.memory
0000 1111 2222 3333
.code ;test
mov r0, c0
swizzle ri.xxyz
```


```w2s
set r1, $0f ; Colour count
set r4, $39c ; Ship colour
:loop
mov r1.x, [r0.x] ; Read colour from constants
mov [r0.x+], r1.x ; Increment r0 and also copy the colour
mov r2.x, r0.x ; Make a copy of the counter
ge.w r2, r2, r1 ; If counter > colour count
sub.w ri, ri, r2
sub.w r0, r0, r0 ; then reset counter
set r6, $04ff ; Wait duration
slp.w r6 ; Sleep for duration
mov [r4.x], r1.x ; Set ship colour
jmp :loop
```
