# Swizzle

Swizzle rearranges or copies the destination register words according to the provided four-word swizzle on the given destination register.

#### Mnemonics
Swizzle has the following synonymous mnemonics:
```w2s
swi
swizzle
```

#### Destination
The swizzle instruction expects a destination register on which the swizzle is performed. The destination must be a [general purpose writable register](/registers.md).

#### Swizzle
The actual swizzle operation to be performed is specified after the destination register's identifier.

This swizzle comes in the form of four letters identifying the source words to be copied into the destination in the order `x` `y` `z` and `w`.

For example, since this swizzle places the `xyzw` words into the same order, this is a no-op:
```w2s
swizzle r0.xyzw
```

Whereas the following swaps the values of the `x` and `y` words:
```w2s
swizzle r0.yxzw
```

Swizzling is also not limited to swapping, and you can copy values to multiple destinations. For example, if we instead wanted to place a copy of `x` into the `y` word and leave the original `x` intact:
```w2s
swizzle r0.xxzw
```

Swizzling can be useful for building small stack-like structures, for copying data within a vector to be used in another SIMD instruction, or even for rearranging the words to provide access to a register's more significant words to an instruction that can only access the `x` word of a register.