# Set

- [Rationale](#Rationale)
- [The Program Counter](#TheProgramCounter)
- [Labels as Data](#LabelsAsData)
## <a name="Rationale"></a>Rationale

The `set` macro allows you to ergonomically store values directly into registers.

In simple programs you will just store your values in the constant registers and use them as normal, an example of this might be:

```w2s
.memory
0000 1111 2222 3333
4444 5555 6666 7777
.code
mov r0, c0 ; Set r0 to [0000, 1111, 2222, 3333]
wmov r1, c1.z ; Set r1.x to 6666
```

However there are situations where you may need more values than can fit into the constant registers.

One way to solve this problem might be to store a larger set of values in other memory regions, or constructing a series of programs to load chunks of data elsewhere, and then load the actual program afterwards.

Alternatively, the CPU has a convenient trick we can use for loading values into registers directly from the program memory.
## <a name="TheProgramCounter"></a>The Program Counter

Since the program counter contains the value of the proceeding instruction to be executed, we can take advantage of this and use it as a pointer for the next instruction as a literal value to load from. For example:

```w2s
mov r0.x, [ri.x]
nop
```

Since the `nop` instruction has the literal value `0x0010`, this will load the value `0x0010` into `r0.x` and then execute the `nop` instruction. However this limits us to values that are valid instructions, and also has the side effect of executing instructions we may not want executed.

Luckily we have a trick we can leverage to avoid this problem, and that is the increment load/store instructions. When using a value as a pointer, we can increment that value after using it. In this example we can avoid executing the `nop` by incrementing the program counter after we use it as a pointer:

```w2s
mov r0.x, [ri.x+] ; The + here means ri.x will be incremented after reading
nop ; This will now be skipped
```

This now means that the value in this location does not need to be a valid instruction.

We can use the immediate value syntax to store arbitrary data in program memory:

```w2s
mov r0.x, [ri.x+]
!b0fa
; Now r0.x = 0xb0fa
```

The set macro can make this more ergonomic. The following compiles to the same bytecode:

```w2s
set r0, $b0fa
```

Additionally we can take advantage of the SIMD gather instructions to similar effect:

```w2s
mov r0.xyz [ri.x+]
!1111
!2222
!3333

; Equivalent to:

set3 r0, $1111, $2222, $3333
```

## <a name="LabelsAsData"></a>Labels as Data

In addition to setting immediate values, we can also take advantage of the assembler's preprocessor to use the addresses of labels as values at runtime.

```w2s
set r4, :some_label ; r4.x now contains the address of :some_label
```

This can be useful for adding offsets to jump locations, or even rewriting jumps when copying code into a new memory location (such as when copying a program into shared memory) among other uses.