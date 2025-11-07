# Summary

# VM
- [Architecture](./architecture.md)
    - [SIMD Vectors](./arch/simd.md)
        - [Swizzling](arch/swizzling.md)
    - [Memory](./memory.md)
    - [Instructions](./instructions.md)
    - [Registers](./registers.md)
    - [Modules](./arch/modules/modules.md)
	    - [Constant Store](./arch/modules/constants.md)
	    - [Flight Computer](./arch/modules/flight.md)
	    - [Radar](./arch/modules/radar.md)
	    - [Navigation](./arch/modules/nav.md)
- [Stream Overlay](./overlay.md)
    - [Shared Memory](./overlay/shared.md)
    - [Space Ships](./overlay/space/ships.md)
        - [Space Stations](./overlay/space/stations.md)
        - [Asteroids](./overlay/space/asteroids.md)
        - [Economy](./overlay/space/economy.md)
        - [Combat](./overlay/space/combat.md)
- [Examples](./examples/examples.md)
    - [Shared Memory Painter](./examples/painter.md)
    - [Ship Color Cycler](./examples/shipcolor.md)
    - [Basic Flight Control]() %% () %%
    - [Advanced Flight Control]() %% () %%
# Tools
- [VS Code Extensions](./tools/vscode.md)
- [Simulator](./tools/debugger.md)
- [Assembler](./tools/assembler.md)
# Wave2 Assembly
- [Assembler](./w2s/assembly.md)
	- [Binary Format](./tools/binary.md)
- [Language Features]() %% (./w2s/features.md) %%
    - [Syntax](./w2s/syntax.md)
    - [Instructions](./w2s/instructions.md)
        - [System](./w2s/instructions/system.md)
        - [WSelect](./w2s/instructions/wselect.md)
        - [Move](./w2s/instructions/move.md)
        - [Swizzle](./w2s/instructions/swizzle.md)
        - [Math]() %% (./w2s/instructions/math.md) %%
        - [Shift]() %% (./w2s/instructions/shift.md) %%
        - [Bitwise]() %% (./w2s/instructions/bitwise.md) %%
        - [Special]() %% (./w2s/instructions/special.md) %%
        - [Macros](./w2s/instructions/macros/macros.md)
            - [Set](./w2s/instructions/macros/set.md)
            - [Jump](./w2s/instructions/macros/jump.md)
            - [Labels](./w2s/instructions/macros/labels.md)
# Waver High Level Language
- [Syntax]()
	- [Operators]()
	- [Vectors]()
	- [Memory]()
	- [Built-in Functions]()
	- [Control Flow]()
	- [Subroutines]()
- [Compiler]()