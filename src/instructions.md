# Instructions



```
Instructions are arranged in categories:
0x0 => System, 0x1 => WSelect, 0x2 => Extra2,  0x3 => Extra3,
0x4 => Move,   0x5 => Swizzle, 0x6 => Load,    0x7 => Store,
0x8 => Math8,  0x9 => Math16,  0xA => Shift8,  0xB => Shift16,
0xC => BitOp,  0xD => SpecOp,  0xE => Extra14, 0xF => Extra15
```

```
//// Example of instructions and their encodings:
Move r0, c0        => 8004  // move c0 into r0
ScatterInc r4, c5  => 5c37  // scatter store values in c5 at the 4 addresses in r4, incrementing each address
Swizzle.xxyz ri    => f905  // push pc onto a "stack" (ri.w = ri.z, ri.z = ri.y, ri.y = ri.x, ri.x = ri.x)
Xor r1, r1         => 996c  // clear r1 to all zero
CompareEq16 r0, r1 => 8979  // test each field of r0 against r1, store 0xffff or 0 into r0 fields
Move.yzw r0, r1    => 89e4  // move only y,z,w of r1 into r0, leaving r0.x unchanged
SubRev16 ri, r0    => f889  // compute ri - r0, put result into ri
                            // if r0 is set to 0 or 0xffff by a compare,
                            // this will conditionally skip the next instruction
```