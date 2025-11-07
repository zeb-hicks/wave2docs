# Swizzling

Vector swizzling generally refers to the re-ordering of the components of a vector. Wave2 can perform vector swizzling both directly on a register to alter the vector's contents, or when specifying the vector components as part of an instruction.

## Swizzle Instruction
#### Altering the content of a register.

The [Swizzle]() instruction can be used to rearrange a vector's components arbitrarily. One use case might be altering which of the components in a vector is the least significant component, useful for when an instruction operates on only that value. 

[See the page on the Swizzle instruction for more.]()
## Swizzling Operands
#### Selecting a register's vector components.

When using a register as an operand to an instruction, in some cases it is possible (or even required) to specify which word components of the register are relevant to the operation.

A register's components are specified using a period followed by 1-4 word specifiers, `x` `y` `z` or `w`, the number of which depends on the instruction's requirements.

For example, when copying values using the [Move]() instruction, you can specify a subset of the components for the move using a swizzle:

```w2s
; These two are equivalent
mov r0, r1
mov r0.xyzw, r1.xyzw

; Copy only the first word
mov r0.x, r1.x

; Copy only the third word
mov r0.z, r1.z
```

Another example is the [Word Select]() instructions, which operate on the lest significant word of a register, and can select an arbitrary word from a register as the source word for the operation:

```w2s
; Copy the value from r1.w into r0.x
wmove r0, r1.w

; Add r0.z into r0.x together
wadd r0, r0.z

; Conditional skip by subtracting a comparison result from the program counter
gt.w r0, r0, r1
wsub r0, ri.x
halt ; Halts only if r0 was greater than r1
jmp :continue
```

For other situations in which operand swizzling is useful, please see the documentation on the individual instructions.