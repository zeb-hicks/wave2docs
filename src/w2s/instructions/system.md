# System

```
System executes special instructions based on extra bits:
0x0000=> Halt the core
0x__10=> Sleep will suspend the core for a certain number of ticks
 0x0010 => SleepNop - any sleep duration of zero acts like a no-op.
 the lower 3 bits of the destination field control the sleep duration:
 0x0n10 => source field used as a number of ticks (n = 0 to 15)
 0x1s10 => lowest byte of source register as number of ticks
 0x2s10 => high byte of the lowest word of source register as number of ticks
 0x3s10 => lowest word of source register as number of ticks
```