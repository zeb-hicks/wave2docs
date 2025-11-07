```
//// VM and Ship Modules
 - "module 0" is always the control registers
 - a slot can be unmapped with ID: 0x0000, all registers in these slots will read as zero
 - control registers are a module that can be mapped
   into other slots by using the thead ID: 0x0001 or 0x0002
 - modules are memory mapped into the I/O control area (0x320 .. 0x3ff)
   by storing the desired module ID into the respective
   "Module slot selection" (TMS*) registers within the control area
 - Mapping a module ID will cause the module to "activate"
 - There are limits on the number of modules that can be active
 - The lowest numbered IDs have activation priority
 - The same module can be mapped into multiple slots at the same time
 - Modules will not lose their data nor configuration while unmapped
 - Modules can lose their configuration in the same volatile memory can
 - ship modules will have some default configuration
 - each module takes up 0x20 words
0x300 => VM and module control area
0x320 => module 1 default 0x1000 = CRS0
0x340 => module 2 default 0x1001 = CRS1
0x360 => module 3 default 0x0000 = unmapped
0x380 => module 4 default 0x4000 = flight controls module
0x3a0 => module 5 default 0x4040 = radar 0
0x3c0 => module 6 default 0x4050 = NAV 0
0x3e0 => module 7 default 0x4051 = NAV 1

 - each ship will have "radar" scanning module(s) that grant:
   - distance to objects (objects are detected within a narrow cone)
   - configurable sweep angle
   - target information: target ID, distance
   - target ID can be used by "NAV" modules to obtain: distance, velocity, and headings
 - each ship will have "NAV" navigation modules that grant:
   - relative distance to target
   - reletive velocity to target
   - headings to target
   - able to accept the target ID from radar modules
   - able to target absolute coordinates
 - each ship has a laser comm device:
   - remote memory access to a target which is within line-of-sight
   - must be facing the front of another ship to access it, the target ship can not be accessed from other sides
   - remote access is limited to the volatile memory area of the other ship

//// Ship Local Coordinate System
   Axiis            Headings
                     0x0000
    +Y                  ^
    /\          0x7000  |  0x1000
   /  \               \ | /
-X/    \+X  0x6000 <----*----> 0x2000
 /      \             / | \
 +-|--|-+       0x5000  |  0x3000
    -Y                  v
                     0x4000

//// Fields common to all modules:
0    = (R  ) always reads as zero
M    = (R/W) scratch memory, these may be freely written with any value

//// VM Control Area (VCA)
CSTA = (RMW) Core status,
    bit 0: Set = Running, Clear = Halted
    (this bit can be set to start the core, can not be cleared by writing)
    See Core Start below.
    other bits may be non zero
CID  = (R  ) Core ID, this is also the module ID for the VCA
CER  = (R/W) Core exception register save
CRI  = (R/W) Core instruction register save
CCRL = (R/W) (Read: 0) (Write: Copy Constant Register stores to core's C registers)
CUID = (R  ) Core user ID
CPRT = (R/W) Core protection (only applies while the core is running):
    bits 1,0:  private memory area (PMA) from volatile private area (VPMA)
            PMA access, while PC points at the volatile private memory area:
        00 = no protection
        01 = readonly, writes ignored
        10 = read as zero, writes ignored
        11 = any access raises exception
    bits 3,2:  private memory area (PMA) from shared memory (SMA)
            PMA access, while PC points at shared memory:
        00 = no protection
        01 = readonly, writes ignored
        10 = read as zero, writes ignored
        11 = any access raises exception
    bits 5,4:  volatile private area (VPMA) from shared memory (SMA)
            VPMA access, while PC points at shared memory:
        00 = no protection
        01 = readonly, writes ignored
        10 = read as zero, writes ignored
        11 = any access raises exception
    bit 6: set = prevent CER, CRI writes from other cores
    bit 7: set = prevent CBK, CMS, CRS, CCRL writes from other cores
    bit 8: set = exception on PC in private memory (callback protection)
    bit 9: set = exception on PC in volatile private memory
    bit 10: set = exception on PC in shared memory
    bit 11: future use
    bit 12: set = exception on core halt and invalid instructions
    bit 13: set = exception on core sleep instructions
    bit 14: future use
    bit 15: future use
CBK  = (R/W) Core Bank Select
    this register is mirrored in two different words
    they both hold the same value and writing to either will set the other
CMS* = (R/W) Core module selection (contains a module ID)

C+0x00 (0x300) [ CSTA, CID , CPRT, 0    ]
C+0x04 (0x304) [ CCRL, ----- CUID ----- ]
C+0x08 (0x308) [ -------- CER  -------- ]
C+0x0c (0x30c) [ -------- CRI  -------- ]
C+0x10 (0x310) [ 0000, CBK , CBK , f000 ]
C+0x14 (0x314) [ 0   , 0   , 0   , 0    ]
C+0x18 (0x318) [ CID , CMS1, CMS2, CMS3 ]
C+0x1c (0x31c) [ CMS4, CMS5, CMS6, CMS7 ]

//// Core Start
When CSTA bit 0 goes from unset to set
from any core writing to this register
A core start will be performed on the core that this VCA controls:
 - CPRT settings will be applied
 - CPRT will protect itself from other cores
 - CRI  will be loaded into Ri
 - CUID is updated
 - C registers will be loaded from this core's Constant Register Store
 - The core will begin running instructions

//// Exceptions
The VCA gives access to exceptions management:
An exception when triggered will:
 - Save Ri to the CRI register in the VCA
 - Clear the private memory exceptions bit in CPRT
 - Load Ri with the contents of CER from the VCA
 - If Ri.PC points at the VCA, the CPU will halt
 - Set CER to [0x0308, 0, 0, 0]
   this makes CER point at itself within the VCA
   you are expected to reload CER if you want to handle further exceptions
```