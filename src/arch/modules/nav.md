```
//// NAV Module (Module ID: 0x4050 - 0x4057)
 - up to 4 NAV modules can be active at once

NAS* = (R  ) current absolute screen X,Y pixel position
NTS* = (R/W) NAV Target absolute screen pixel X,Y
NTGT = (R/W) Target Selector (0 - Fixed point; 1 - Beacon; 2 - Nearest Signature; N - Signature)
NTGI = (R/W) Target ID (3 words)
NRD* = (R  ) NAV Target relative distance X,Y
NRV* = (R  ) NAV Target relative velocity X,Y
NAHT = (R  ) NAV Target absolute heading towards
NAHF = (R  ) NAV Target absolute heading away
NRHT = (R  ) NAV Target relative heading towards
NRHF = (R  ) NAV Target relative heading away

//      NAV0  NAV1 (default mappings)
N+0x00 (0x3c0/0x3e0) [ MSTS, MMID, 0   , 0    ]
N+0x04 (0x3c4/0x3e4) [ NASx, NASy, 0   , 0    ]
N+0x08 (0x3c8/0x3e8) [ NTSx, NTSy, M   , M    ]
N+0x0c (0x3cc/0x3ec) [ NTGT, ----- NTGI ----- ]
N+0x10 (0x3d0/0x3f0) [ NRDx, NRDy, 0   , 0    ]
N+0x14 (0x3d4/0x3f4) [ NRVx, NRVy, 0   , 0    ]
N+0x18 (0x3d8/0x3f8) [ NAHT, 0   , NAHF, 0    ]
N+0x1c (0x3dc/0x3fc) [ NRHT, 0   , NRHF, 0    ]
```