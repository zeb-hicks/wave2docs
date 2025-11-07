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

## Halt

The `halt` instruction maps to the halt opcode directly.

The following halt mnemonics are available:
```w2s
hlt
halt
```


## Sleep

The `sleep` instruction takes a mode specifier, and a single operand for the number of ticks to sleep.

The syntax is as follows:

#### Mnemonic
Sleep has the following mnemonic forms:
```w2s
slp
sleep
```

#### Mode
Sleep optionally takes a mode specifier, in the form of either:
`.h` takes the high byte of the source register as the tick count source.
`.l` takes the low byte of the source register as the tick count source.
`.w` takes the low word (`.x`) of the source register as the tick count source.

#### Duration
If no mode is specified, the tick count is taken as a literal in the range of `0` to `15` inclusive.

If a mode is specified, then sleep takes a register as a source for the tick count.

#### Examples
```w2s
slp $f
sleep.w r0
slp.h c4
```

## Nop

The sleep opcode has a special case where sleeping for zero ticks is equivalent to a `nop`, which is provided as an instruction for convenience.

Nop has one mnemonic, and takes no operands:
```w2s
nop
```

