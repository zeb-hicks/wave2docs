

```
The (0x1) WSelect opcodes perform an operation on a single word from
the source register to the X element of the destination register
the extra bits are used to select which word from source register
and which operation to perform:
 -> word select: 0b00__=> X, 0b01__=> Y, 0b10__=> Z, 0b11__=> W
operators:
0b__00 => (WMove) copy source word to destination X
0b__01 => (WSwap) swap source word with destination X
0b__10 => (WAdd ) add source word to destination X         // dst.x = dst.x + src.*
                  put result in destination X
0b__11 => (WSub ) subtract source word from destination X  // dst.x = dst.x - src.*
                  put result in destination X
```