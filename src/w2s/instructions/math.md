# Math

```
(0x8/0x9) Math# opcodes use source register as left hand and destination register as right
 -> extra bits used to select math operation:
 0x0 => Add     (dest =  src + dest)
 0x1 => Sub     (dest =  src - dest)
 0x2 => RSub    (dest = dest -  src)
 0x3 => Eq      (equal: -1, not equal: 0)
 0x4 => Carry      Carry( src + dest) (No carry: 0, carry: -1)
 0x5 => LessU      Carry( src - dest) (src >= dest: 0, src < dest: -1) unsigned
 0x6 => GreaterU   Carry(dest -  src) (src <= dest: 0, src > dest: -1) unsigned
 0x7 => NotEq   (equal: 0, not equal: -1)
 0x8 => AddSat  (dest =  src + dest) (Signed Saturate)
 0x9 => SubSat  (dest =  src - dest) (Signed Saturate)
 0xA => RSubSat (dest = dest -  src) (Signed Saturate)
 0xB => GreaterEqU Carry( src - dest) (src < dest: 0, src >= dest: -1) unsigned
 0xC => AddOver     Over( src + dest) (overflow flips sign: -1, no overflow: 0)
 0xD => SubOver     Over( src - dest) (overflow flips sign: -1, no overflow: 0)
 0xE => RSubOver    Over(dest -  src) (overflow flips sign: -1, no overflow: 0)
 0xF => LessEqU    Carry(dest -  src) (src > dest: 0, src <= dest: -1) unsigned
```