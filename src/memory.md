# Memory

```
System memory map:
   0(0x0000) ..=    31(0x001F) => System constant registers, accessible via load
  32(0x0020) ..=    63(0x003F) => System mutable registers, accessible via load/store
  64(0x0040) ..=   255(0x00FF) => Non-volatile Core private RAM
 256(0x0100) ..=   767(0x02FF) => Non-volatile Core banked RAM area
 768(0x0300) ..=  1023(0x03FF) => VM and Ship I/O control area
1024(0x0400) ..=  2047(0x07FF) => Remote memory access aperture
2048(0x0800) ..=  4095(0x0FFF) => Volatile private RAM
4096(0x1000) ..= 12288(0x2FFF) => Shared RAM (all user cores can read/write)

within the memory map, the "pre-loadable" memory is a block of memory that can
be written, using the "!vm code ..." or "!vm write ..." commands.
Additionally, it is generally non-volatile, and can be expected to be persisted.
Memory outside the "pre-loadable" range can not be written via chat commands
only the CPU itself can access the other regions.

//// Memory and I/O space
 to control "the ship"
 - the ship: is visually a triangle floating around a wrapping 2D space
 - it has integrated physics (aka motion: impulse, velocity, acceleration, moment, mass)
 - ships spawn based on chat commands (or activity) in some random orientation,
   (planned: possibly with some default program)
 - ships have their own Wave2 core with these properties:
   - own C registers, R registers, Instruction register, and private memory area
   - own banked memory mapping, but banked memory can be accessed by all cores within the CPU
   - own I/O space mapping, but I/O devices are shared between cores within each CPU
   - remote aperture is shared with main core
   - shares the volatile private memory area with main core
   - same limitations on accessing the global shared memory area
   - the ship core is not required to actually control the ship, but does by default
   - the ship core can be halted indepantly of the main core
   - the ship core is not started nor halted by the typical chat commands
```

```
            +0   +1   +2   +3  Address
          +----+----+----+----+
c0 0x0000 |  X |  Y |  Z |  W | 0x0000  (beginning of !vm write)
:     :   |    |    |    |    |    :
c7 0x001c |  X |  Y |  Z |  W | 0x001f
          +----+----+----+----+
r0 0x0020 |  X |  Y |  Z |  W | 0x0020
:     :   |    |    |    |    |    :
r6 0x0038 |  X |  Y |  Z |  W | 0x003b
          +----+----+----+----+
ri 0x003c | pc |  Y |  Z |  W | 0x003f
          +----+----+----+----+
            +0   +1   +2   +3  Address
          +----+----+----+----+         <- start of address wrap
   0x0040 |  P    P    P    P | 0x0043  (beginning of !vm code)
      :   |   Private Memory  |    :     192 words
   0x00fc |  P    P    P    P | 0x00ff
          +----+----+----+----+
   0x0100 | BP   BP   BP   BP | 0x0103  (banked memory ROM or persist RAM)
      :   |   Private Memory  |    :     512 words
   0x02fc | BP   BP   BP   BP | 0x02ff  (end of pre-loadable memory)
          +----+----+----+----+         <- end of address wrap
   0x0300 |                   | 0x0303  (Module I/O, VM control and ship modules)
      :   |                   |    :
   0x03fc |                   | 0x03ff
          +----+----+----+----+         <-
   0x0400 |0000 0000 0000 0000| 0x0403  (agent remote memory aperture)
      :   |                   |    :
   0x07fc |0000 0000 0000 0000| 0x07ff
          +----+----+----+----+         <-
   0x0800 |  M    M    M    M | 0x0803  (volatile private memory area)
      :   |                   |    :
   0x0ffc |  M    M    M    M | 0x0fff
          +----+----+----+----+         <- end of private protection area
          +----+----+----+----+         <- start of address wrap and shared protection area
   0x1000 |  S    S    S    S | 0x1003  (shared memory aparture)
      :   |   Shared Memory   |    :
   0x2ffc |  S    S    S    S | 0x2fff
          +----+----+----+----+        <- end of address wrap
```