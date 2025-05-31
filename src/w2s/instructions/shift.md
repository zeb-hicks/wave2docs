# Shift

```
(0xA/0xB) Shift# opcodes perform bitshifts on the destination register
 -> extra bits control shift:
 0b_000 => Left Shift,
 0b_001 => Right Shift (logical),
 0b_010 => Right Shift (sign extend)
 0b_011 => Left Rotate
 0b_100 => Left Shift (#-shift),
 0b_101 => Right Shift (#-shift) (logical),
 0b_110 => Right Shift (#-shift) (sign extend)
 0b_111 => Right Rotate
 0b0___ => Low (#8 => 3, #16 => 4) bits of source register words as shift amount
 0b1___ => source field as shift amount
```