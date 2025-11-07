# Move

Copying data between registers and memory is done using the `move` instructions.

The following two equivalent mnemonics for move are available:
```w2s
mov
move
```

The assembler combines the `move`, `load`, and `store` opcodes into a single instruction `move`, picking the appropriate opcode given the provided operands.

## Standard Move
When provided with two registers as operands, the `move` instruction is translated to the `move` opcode as normal. This results in the data being copied from the source to the destination registers directly.

## Store
If the destination operand is a pointer, the 

## Load

## Skip
A special case when loading any value into the `c0` constant register exists that is a no-op that advances the program counter by the number of words loaded.

The `skip` mnemonics are as follows:
```w2s
skip, skip1
skip2
skip3
skip4
```

The numbered `skip` instructions advance the program counter by the same amount, and `skip` is the same as `skip1` in that it also advances the PC by one.

## Specifying Words

### Scatter

### Gather








```
(0x4) Move copies source register words to destination register
 -> extra bits set to one will not copy the respective word (performs a "Mix" operation)
(0x5) Swizzle re-arranges or copies the destination register words according to bits in "extra" and "source"
 -> given register [X,Y,Z,W] source: 0bWWZZ, extra: 0bYYXX
 -> every two bit index specifies which source words to swizzle from.
(0x6) Load and (0x7) Store use the word(s) in the source register as an address
 -> (0x6) Load copies memory into the destination register
 -> (0x7) Store copies destination register into memory
 -> "extra" bits used as modifiers:
 -> upper 2 bits of extra, specify the number of words to load or store
    (words are always accessed starting at X):
    0x0 => 4 words, dst: XYZW
    0x4 => 3 words, dst: XYZ
    0x8 => 2 words, dst: XY
    0xC => 1 word,  dst: X
 -> lower 2 bits of extra, specify the mode:
access words sequentially
word X from source as address
increments the access address after each load/store
 0x0 -> Load    / Store    - source register unchanged
 0x1 -> LoadInc / StoreInc - updates source register with address after last access
scatter/gather modes
respective XYZW words in source used as address for
the matching XYZW values to/from destination register
increments each access address by 1 after the load/store
 0x2 -> Gather    / Scatter    - source register unchanged
 0x3 -> GatherInc / ScatterInc - updates source register with accessed elements incremented
useful special Load/Store encodings:
LoadInl1 R_.x   , #n       => 0x_fd6 0xNNNN
LoadInl2 R_.xy  , #n,n     => 0x_f96 0xNNNN 0xNNNN
LoadInl3 R_.xyz , #n,n,n   => 0x_f56 0xNNNN 0xNNNN 0xNNNN
LoadInl4 R_.xyzw, #n,n,n,n => 0x_f16 0xNNNN 0xNNNN 0xNNNN 0xNNNN

Skip1 => 0x0fd6 // skip the next instruction or word of data
Skip2 => 0x0f96 // skip the next 2 instructions or words of data
Skip3 => 0x0f56 // skip the next 3 instructions or words of data
Skip4 => 0x0f16 // skip the next 4 instructions or words of data

Skip encodes C0 as the destination, only C0 should be used
other C registers as destinations are reserved for future use
and may have undesired side affects.

The "#" is the vector size in number of bits, which can be 8 or 16
each group of vector size bits will be operated on independantly of other vector bits
operations are in parallel across all vector bits between the registers
```