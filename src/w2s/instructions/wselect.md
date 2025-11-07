# Word Select

The word select instructions allow some limited non-SIMD operations to be performed at the word level between the `x` word of the destination register, and an arbitrary word from a source register.

Sometimes it may be necessary to perform simple operations only on a single word without having to sanitise the entire source vector, or copying to a temporary register and then copying the result back.

An example might be that you want to add a specific word from the constants registers to the program counter `ri.x`, you could do something like copy the entire `ri` word to a temporary register and perform arithmetic there with the constant register before doing a 1-word move back to `ri` or similar, or alternatively you can use the Word Select instructions to perform the arithmetic more directly.

In such a case as:
```w2s
.memory ; This is c0.z, we want to add it to ri.x
        ; ↓↓↓↓
dead beef 0010 f00d
.code
mov c0, r0       ; Make a copy of the constant we can manipulate
swizzle r0.zwxy  ; Swizzle the constant so that the value we want is at `r0.x`
add.w r0, r0, ri ; Add the result to `ri`
                 ; Assuming ri was    `$0052 $0001 $2000 $0000`
                 ; `ri` now contains: `$0062 $f00e $fead $beef`
                 ; `ri.yzw` have been clobbered with the other three
                 ; potentially unrelated words

				 ; Alternatively:

wadd ri, c0.z    ; Adds `c0.z` to `ri.x` without touching `ri.yzw`
                 ; `ri` now contains: `$0062 $0001 $2000 $0000`
                 ; We avoided clobbering the other three words using
                 ; the word select instruction `wadd`.
```

## Word Select Modes

The Word Select instruction has the following modes with the specified mnemonics available:

| Mnemonics         | Operation     | Description                                                                                                                                     |
| ----------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `wmov`<br>`wmove` | Word Move     | Similar to the `move` instruction, this copies<br>the data from the destination's selected word<br>into the destination's `x` word.             |
| `wswap`           | Word Swap     | Swap exchanges the contents of the specified<br>source word and the destination's `x` word.                                                     |
| `wadd`            | Word Add      | Add performs addition between the specified<br>source word and the destination's `x` word,<br>storing the result in the destination's `x` word. |
| `wsub`            | Word Subtract | Subtract performs subtraction between the<br>specified source word and the destination's<br>`x` word, storing the result in the latter.         |
#### Destination
The destination operand takes a [general purpose writable register](/registers.md) and specifies the register of which the `x` word will be written to.

#### Source
The source operand takes any [register](/registers.md) of which the word specified by the swizzle selector will be read.

If the operation is `swap` then the source register must also be writable.

#### Swizzle
The source operand also requires a word to be selected using the swizzle syntax.

A period `.` followed by a single `x` `y` `z` or `w` is used to specify the word to be selected.

## Examples
```w2s
wmove ri, c0.z
wadd r0, c1.y
wsub r4, r0.w
wswap r3, r1.z
```