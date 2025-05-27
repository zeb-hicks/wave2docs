# Meisaka Wave2 Vector RISC CPU { .centered }

<table>
	<style>td { text-align: center; vertical-align: middle; font-family: monospace; } </style>
    <tr>
        <td><span style="opacity: 0.33;">0x000</span>0</td>
        <td>c0</td>
        <td>x</td><td>y</td><td>z</td><td>w</td>
    </tr>
    <tr>
        <td>⋮</td>
        <td>⋮</td>
        <td colspan="4">⋮</td>
    </tr>
    <tr>
        <td><span style="opacity: 0.33;">0x00</span>1c</td>
        <td>c7</td>
        <td>x</td><td>y</td><td>z</td><td>w</td>
    </tr>
    <tr>
        <td><span style="opacity: 0.33;">0x00</span>20</td>
        <td>r0</td>
        <td>x</td><td>y</td><td>z</td><td>w</td>
    </tr>
    <tr>
        <td>⋮</td>
        <td>⋮</td>
        <td colspan="4">⋮</td>
    </tr>
    <tr>
        <td><span style="opacity: 0.33;">0x00</span>38</td>
        <td>r6</td>
        <td>x</td><td>y</td><td>z</td><td>w</td>
    </tr>
    <tr>
        <td><span style="opacity: 0.33;">0x00</span>3c</td>
        <td>ri</td>
        <td><span style="font-weight: bold; color: #dd0;">PC</span></td>
        <td>y</td><td>z</td><td>w</td>
    </tr>
	<tr>
        <td>
	        <span style="opacity: 0.33;">0x00</span>40<br/>
		    ⋮<br/>
	        <span style="opacity: 0.33;">0x00</span>ff<br/>
		</td>
		<td></td>
        <td colspan="4">Private Memory Region</td>
	</tr>
    <tr>
        <td>⋮</td>
        <td colspan="5">⋮</td>
    </tr>
	<tr>
		<td colspan="6">See <a href="memory.html">memory</a> for the full map...</td>
	</tr>
</table>

### Architecture
The Wave2 CPU has 8 constant and 8* general purpose registers.

Wave2's architecture is designed such that most operations are SIMD, affecting all four words of their respective vectors.

In addition, it is a multi-user simulation. Each user has their own pair of cores, and are all executed concurrently as they mutate their private state as well as the shared memory region.

The bytes in memory are stored in little-endian order. Bytes from user writes, such as from chat or when loading binaries, are interpreted as big-endian, and then written to memory in little-endian.

The vector words are also in little-endian order, such that the least significant component (X) is the first in memory.

As such the memory order begins at the least significant byte of the least significant 

---





All CPU registers are SIMD vectors, holding a quartet of 16-bit words.<br>Some special instructions can operate on vectors as an octuplet of 8-bit words.

Memory is addressed by 16-bit words. Each memory address maps to a single word within its vector.

For example:
```
0x0000 => 0xABCD
0x0001 => 0xEF39
```

All CPU registers are accessible from load/store
as if the registers are memory locations.
Each CPU core also has an amout of built-in RAM

CPU register words are loaded and stored in little endian order:
 i.e. the instruction pointer is at address 0x060
Bytes from APIs are imported into words in little endian order.
Bytes from user writes (write | code) are:
big endian within each 16 bit word,
words are then written to memory in little endian order

Wave2 is emulated in a multi user simulation.
Every user get's their own "CPU" which can have multiple cores.
A region of the Wave2 CPU's memory space is shared access by all CPUs in the simulation.

The program counter (PC) is vector 0 (X) from the instruction register.
Instruction opcodes are 16 bits and use one address worth of memory.
Instruction fetch is assumed to be non-speculative and fully coherent
thus, self-modifying code and inline variable storage are possible.
