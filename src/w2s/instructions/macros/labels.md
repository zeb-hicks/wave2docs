# Labels

Labels are a way to store the position/address of a location in program memory for jumping or referring to elsewhere without having to use offsets or manually count instructions or addresses.

Labels are declared using a colon `:` character followed by letters, numbers, or underscores.

```w2s
; Declare the :start label to jump back to later.
:start
swizzle r0.yzwx
mov r1.x [ri.x+]

...

; Use the label defined earlier to jump back to the start of the program.
jmp :start
```

Unlike other macros, labels perform a post-processing step on the program after the rest of the instructions have been generated, in order to track the correct memory locations and inject them into the necessary places.

## Usage

Labels can be used in jump instructions as shown above, and can also be used in set instructions to assign the value of a label to a register, such as:

```w2s
:begin
sub.w r0, r0, r0
set r1, :begin
set r2, $0010 ; nop
mov [r1.x], r2
jmp :begin
```

This program overwrites the instruction `sub.w r0, r0, r0` with a `nop` by setting `r1` to the address of the label `:begin` which itself contains the subtract instruction's memory address, and then using that as a pointer to write the value `0x0010` stored in `r2`, into the address pointed to by `r1.x`.