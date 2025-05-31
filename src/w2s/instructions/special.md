# Special

```
(0xD) SpecOp extra math operations
 -> extra bits used to select operation:
 0x0 => Horizontal Add: dest.xyzw = src.x + src.y + src.z + src.w
 0x1 => MultSat: dst = src * dst, Unsigned, components that would overflow are clamped to 0xffff
 0x2 => MultLow: dst = src * dst, Unsigned, 32 bit multiplication, the low 16 bits are returned in dst
 0x3 => MultHi:  dst = (src * dst) >> 16, Unsigned, 32 bit multiplication, the upper 16 bits are returned in dst
 0x4 => Divide:  dst, src = (src / dst), (src mod dst), Unsigned,
        perform component-wise 16 bit division, return the quotient in dst, and remainder in src
        divisions of N by 0 result in a component quotient of 0xffff, with remainder N
        this operation may take a number of extra cycles to perform
 0x5 => RecpDivide: dst = (0x010000 / src), unsigned 17 bit divide
        divisions of N by 0 result in a component quotient of 0xffff
        this operation may take a number of extra cycles to perform
```