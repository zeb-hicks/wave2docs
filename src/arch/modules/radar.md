```
//// Radar/Scanning functions (Module IDs: 0x4040 - 0x4047)
 - up to 4 scanner modules can be active at once

RSSH = (R/W) select scan heading, 0x0000 - 0x7fff (select scan heading), 0xffff (auto scan)
RHLS = (R  ) heading of last scan
RNSR = (R  ) number of signatures returned
RSDT = (R  ) distance to signature - unsigned 16b in 8.8 format
RSID = (R  ) signature ID

//     Radar0 (default mapping)
R+0x00 (0x3a0) [ MSTS, MMID, 0   , 0    ]
R+0x04 (0x3a4) [ RSSH, 0   , RHLS, RNSR ]
R+0x08 (0x3a8) [ RSDT, ----- RSID ----- ]
R+0x0c (0x3ac) [ RSDT, ----- RSID ----- ]
R+0x10 (0x3b0) [ RSDT, ----- RSID ----- ]
R+0x14 (0x3b4) [ RSDT, ----- RSID ----- ]
R+0x18 (0x3b8) [ RSDT, ----- RSID ----- ]
R+0x1c (0x3bc) [ RSDT, ----- RSID ----- ]
```