# Instructions

Most of the architecture's opcodes have corresponding assembly instructions, with some notable exceptions and additions.

- [System](#system)
- [Word Select](#word-select)
- [Move](#move)
- [Swizzle](#swizzle)
- [Math](#math)
- [Shift](#shift)
- [Bitwise](#bitwise)
- [Special](#special)

## System
The CPU opcodes for the [system instructions](./instructions/system.md) `halt` and `sleep` are both implemented, and an additional mnemonic for the 0-length sleep `nop` is also available.

```w2s
halt
sleep 12
nop
```

## Word Select
The [word select instructions](./instructions/wselect.md) map to the native opcodes. All word select operations work on a single arbitrary source word, and the destination .X word, and can be used as follows:

```w2s
wmove r0, r1.y  ; Copy `r1.y` to `r0.x`
swap r0, r1.x   ; Swap `r0.x` and `r1.x`
wadd r1, c0.z   ; Add `c0.z` to `r1.x`
wsub r4, r1.w   ; Subtract `r1.w` from `r4.x`
```

## Move
The assembler combines the move, load, and store opcodes all into the [move instruction](./instructions/move.md) which picks the appropriate opcode from the provided operands.

If a move is performed between two registers, then the opcode used will be move as normal. However if either the source or destination operands are a pointer, the opcode will instead be either load or store respectively.

For example:
```w2s
mov r0, r1   ; move
mov r1, [c2] ; load
mov [r5], r0 ; store
```

For further detail on the move instruction refer to [the move instruction section](./instructions/move.md).
## Swizzle
The [swizzle instruction](./instructions/swizzle.md) maps pretty directly to the native opcodes using the syntax:
```w2s
swizzle r0.xxxx
swizzle r4.zyzx
swizzle r1.yzwx
swizzle ri.xxyz
```

The swizzled words can be in any order, but must specify exactly four words.

## Math
The [math instructions](./instructions/math.md) support both sizes of all native math opcodes, however instead of extra mnemonics a size specifier `.b` or `.w` is used.

Additionally, the reciprocal variants are merged with the normal variants, you specify the order of the operands yourself. This means that math instructions take three operands rather than two, with the caveat that the destination operand must also be one of the left- or right-hand-side operands.

```w2s
;  size  dst  lhs  rhs
sub.w    r4,  r4,  c0 ;  `sub16 r4, c0`
sub.w    r4,  c0,  r4 ; `rsub16 r4, c0`
```

Note that the order of `c0` and `r4` are swapped.

## Shift
Like the [Math](#Math) instructions, the [shift instructions](./instructions/shift.md) take a size specifier, since the native opcodes come in both 8-bit and 16-bit variants.

The shift instructions can also take either literals or registers for the shift amount.

```w2s
rol.w r0, 3
asr.b r4, c0
asl.w r2, $a
```

## Bitwise
The [bitwise instructions](./instructions/bitwise.md) map straightforwardly to their native opcodes.

```w2s
and r0, r1
xor r4, c0
all r5
```
## Special
Wave2 has some [special extended instructions](./instructions/special.md) that map to the native opcodes for doing things like horizontal add, 32-bit multiplication, etc.

```w2s
mul r0, c0
wadd r4, r0
```
