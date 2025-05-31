# Bitwise

```
(0xC) BitOp performs a binary operation on source and destination
 -> extra bits specify the operation:
 0x0 =>  One, 0xF => All
 0x8 =>  And, 0xE =>  Or, 0x6 =>  Xor
 0x7 => Nand, 0x1 => Nor, 0x9 => Xnor
 0xA => Swap
 0xC => (reserved, currently no-op)
 0x5 => NotSrc, 0x3 => NotDest
 0x2 => Src And NotDest (Dest Clears Src)
 0x4 => NotSrc And Dest (Src Clears Dest)
 0xB => Src Or NotDest
 0xD => NotSrc Or Dest
```