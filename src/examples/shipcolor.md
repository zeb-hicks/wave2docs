# Ship Color Cycler

This program cycles the user's ship through various predefined color constants.

<canvas id="cvs" width="600" height="200" style="display: block; margin: 0 auto; background: #000; border-radius: 12px;"></canvas>
<script type="module" src="shipcolor.js"></script>

```w2s
.memory
000f 00ff 0ff0 ff00
f000 f00f 0f0f f0f0
fff0 0fff f0ff ff0f
dead beef cafe feed
000f 039c 0800
.code
wmov r1, c4.x
wmov r2, c4.y
wmov r3, c4.z
:loop
mov r4.x, [r0.x+]
mov [r2.x], r4.x
mov r5.x, r0.x
ge.w r5, r5, r1
sub.w ri, ri, r5
sub.w r0, r0, r0
slp.w r3
jmp :loop
```

The `.memory` section first lays out the color constants, and then the three values we use later in the program. `0x000f` which is the number of color constants (and subsequently the loop counter wrap point), `0x039c` which is the default address of the flight module's color register `SHCC`, and finally `0x0800` which controls the sleep duration at the end of each loop iteration. We end the memory declaration by declaring the start of the `.code` region.

The program begins with three lines using the `WSelect.Move` instruction to pull the three constants defined in `c4.xyz` into three registers for referencing individually later.

```w2s
wmov r1, c4.x
wmov r2, c4.y
wmov r3, c4.z
```

Following this we define the loop start point using a label.

```w2s
:loop
```

At the top of the loop we make a copy of the color by referring to the address of `r0.x` which should be `0` by default[^defaults], equivalent to `c0.x` which contains `0x000f` as defined by the memory region at the top of the file. The `+` inside the pointer syntax means the address will be incremented following the move operation, so `r0.x` will increment from `0` to `1` in the first iteration.

```w2s
mov r4.x, [r0.x+]
```

Next we update the ship color by writing to the color register in the Flight module. By default the flight module is mounted such that the color register is at `0x39c` which we stored into `r2` earlier. Here we use the value of `r2.x` as an address to store the color data we just stored into `r4`.

```w2s
mov [r2.x], r4.x
```

Now we make a copy of the counter and store it in `r5.x` so we can perform arithmetic on it without clobbering the original counter value.

We then use the Greater Than or Equal comparison `ge` to compare the counter `r5` with the total number of colors we stored earlier in `r1`.

The `ge` comparison will store either `0x0000` for **true** or `0xffff` for **false** into `r5`.

```w2s
mov r5, r0
ge.w r5, r5, r1
```

Note that the `.w` modifier on the `ge` instruction specifies that this math instruction operates on whole 16-bit words, rather than the `.b` size modifier that operates on 8-bit bytes.

For the next step we are going to use the result of the comparison to skip an instruction. We want to reset the loop counter, but only if we have reached the color count.

Here we use a special trick where we subtract the result of the comparison from the Program Counter. Since the comparison is either `0` or `ffff` we can use the fact that a subtracting `ffff` with overflow is equivalent to adding `1` to skip an instruction conditionally based on the result we got earlier.

So subtracting the result when false will add `1` to the Program Counter, skipping the next instruction where we reset the counter to `0`.

```w2s
sub.w ri, ri, r5
sub.w r0, r0, r0
```

At the end of each loop iteration, we sleep for the duration we stored into `r3` earlier which is still holding the value we copied from the constant registers.

```w2s
slp.w r3
```

Finally we jump[^jmp] back to the loop point.

```w2s
jmp :loop
```

[^defaults]: Even if `r0` is not `0` here at the beginning as we assume, such as if we were running another program and did not reset our VM core before writing this program, worst case scenario it will just display random junk data as a color, before being reset to `0` and iterating as normal.

[^jmp]: Under the hood, the [jump instruction](/w2s/instructions/macros/jump.md) is a load instruction where we use the incrementing Program Counter to store a value into itself, which loads the value at the following address. In this case the jump instruction would translate into `mov ri.x, [ri.x+]` followed by the literal value of the `:loop` label, which for this program would be `0x43` since it is the fourth instruction in the private memory region which starts at `0x40`