```
//// Ship Control Modules
MSTS = (R  ) Module status
MMID = (R  ) Module ID

//// Flight Control Module (Module ID: 0x4000)
 - there is only one flight control module, it is always active even if not mapped.
RRV  = (R/W) requested relative velocity - X and Y in signed 16b in 8.8 format
CRV  = (R  ) current relative velocity - X and Y in signed 16b in 8.8 format
RH   = (R/W) requested absolute/relative heading - signed 16b in 8.8 format
CAH  = (R  ) absolute heading
EEN  = (R/W) engine controls bitflags:
        bit 0 - set: allow Y+ engine to change velocity
        bit 1 - set: allow Y- engine to change velocity
        bit 2 - set: allow X+ engine to change velocity
        bit 3 - set: allow X- engine to change velocity
        bit 4 - set: allow engines to change heading
        bit 5 - heading mode - set: absolute, clear: relative
SHCC = (R/W) set Ship colour
SHCM = (R/W) background mix (0x00 - ship matches background, 0xff - ship matches set colour)

// Flight control memory layout overview:
//     (default mapping)
F+0x00 (0x380) [ MSTS, MMID, 0   , 0    ]
F+0x04 (0x384) [ RRVx, RRVy, M   , M    ]
F+0x08 (0x388) [ CRVx, CRVy, 0   , 0    ]
F+0x0c (0x38c) [ RH  , M   , M   , M    ]
F+0x10 (0x390) [ CAH , 0   , 0   , 0    ]
F+0x14 (0x394) [ EEN , M   , M   , M    ]
F+0x18 (0x398) [ 0   , 0   , 0   , 0    ]
F+0x1c (0x39c) [ SHCC, SHCM, 0   , 0    ]
```