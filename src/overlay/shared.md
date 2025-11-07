# Shared Memory

```
//// Shared Memory
Memory within the shared RAM range is visualized as blocky pixels
The display matrix is 256 pixels wide, by 32 pixels tall
Accending pixel addresses are rastered from left to right, top down.
Pixel address from position is: 0x1000 + (0x100 * Y) + X
The pixel format is rrrr rggg gggb bbbb => i.e. 0xf800 is pure RED
this mode is called RGB565

Memory accesses will behave differently depending on
where the CPU is currently executing instructions:
 - when PC is within private memory:
   + any action that increments an address (load, store, PC fetch)
     with the address 0x00ff: will wrap to 0x0040
     i.e. load with increment with address of 0x00fe
          will read from 0x00fe, 0x00ff, 0x0040, 0x0041
          the register will point at 0x0042 after.
   + loads and stores to private memory are atomic
   + loads and stores to volatile private memory are only atomic when
     address has alignment 4, i.e. (address modulo 4) equals 0
   + loads and stores to shared memory are non-atomic
     shared memory will be accessed a single word at a time
     and incur significant delay between words
 - when PC is within shared memory:
   + any action that increments an address (load, store, PC fetch)
     with the address 0x2fff: will wrap to 0x1000
   + loads and stores to private memory are non-atomic
     private memory will be accessed a single word at a time
     and incur significant delay between words
   + loads and stores to shared memory are only atomic when
     address has alignment 4, i.e. (address modulo 4) equals 0
     such access will be without delay
     non-aligned access will be non-atomic, and have only slight delay
   + registers should be used for fast transfer between memory regions
     loads and stores to the register area (via load/store) of private memory still incurs delays
```