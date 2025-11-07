# Syntax

- [Section Directives](#section-directives)
- [Structure](#structure)
- [Mnemonics](#mnemonics)
- [Size Specifiers](#size-specifiers)
- [Operands](#operands)
- [Literals](#literals)
- [Inline Values](#inline-values)

Wave2 Assembly's syntax is very similar to the [NASM](https://www.nasm.us/xdoc/2.16.03/html/nasmdoc3.html#section-3.1) flavoured assembly. The operands are ordered Intel style (instruction destination, source) and use the semicolon `;` for comments.
## Section Directives

The first thing you'll see in most Wave2 assembly files is the `.memory` directive, which defines the start of a region containing a sequence of values to be stored in the constant registers.

There are two directives at present, `.memory` and `.code`, each simply defining the beginning of their eponymous regions. These two directives also correspond to the two VM commands `!write`[^1] and `!code` respectively.

```w2s
.memory
1234 5678
.code
mov r0, c0
; etc...
```
## Structure

The core syntax typically takes the following structure:

<table>
    <thead>
        <tr>
            <th>instruction</th>
            <th>size</th>
            <th colspan="3">operands</th>
        </tr>
    </thead>
    <tbody style="font-family: monospace; cursor: help;">
        <tr>
            <td style="text-align: right;" title="Add instruction, one of the math instructions that performs addition.">add</td>
            <td title="Math operation size specifier .w which makes this add instruction a 16-bit word math operation.">.w</td>
            <td title="This is the destination of the math instruction. The result will be stored in this register.">r0,</td>
            <td title="Left hand side of the math operation.">r0,</td>
            <td title="Right hand side of the math operation.">c1</td>
        </tr>
        <tr>
            <td style="text-align: right;" title="Move instruction mnemonic.">mov</td>
            <td title="Move instructions do not take a size specifier."></td>
            <td title="Destination for the move operation.">r0,</td>
            <td title="Source for the move operation.">r1</td>
            <td></td>
        </tr>
        <tr>
            <td style="text-align: right;" title="Swizzle rearranges the words in a vector.">swizzle</td>
            <td title="Swizzle does not take a size specifier."></td>
            <td title="The swizzle takes a register and then any combination of four of the XYZW components of that vector.">r4.zyyw</td>
            <td colspan="2"></td>
        </tr>
        <tr>
            <td style="text-align: right;" title="The multiply instruction, part of the special instruction set.">mul</td>
            <td title="Multiply does not take a size specifier, instead the special high/low byte multiplication instructions use different mnemonics. See the page on special instructions for more details."></td>
            <td title="The destination, and left hand side value.">r1,</td>
            <td title="The right hand side value.">r2</td>
            <td></td>
        </tr>
    </tbody>
</table>
<center><sub>Mouse over the example instruction fragments to learn more.</sub></center>

Not all instructions require anything more than the instruction mnemonic itself, such as `nop` and `halt`, however the ones that do typically follow the pattern above, as ordered in the below [operands section](#operands).

## Mnemonics

The first part of any typical instruction is the mnemonic, i.e. the identifier of the instruction being used. Some of these map directly to the respective bytecode operations, others choose the operation from context such as the [`move`](./instructions/move.md) instruction selecting `move` for register-to-register operations, `store` for register-to-memory operations, and `load` for memory-to-register operations.

Here is a non-exhaustive list of some instructions and the actual opcode they resolve to:

```w2s
mov r0, r1       ; `mov r0, r1` - move r1 into r0
mov r3, [r2]     ; `load r3, [r2]` - load the memory value at [r2] into r3
mov [r5], r1     ; `store [r5], r1` - store the value of r1 into memory at [r5]
sub.w r0, r0, r1 ; `sub16 r0, r1` - 16-bit Subtract. r0 = r0 - r1
sub.b r4, c2, r4 ; `rsub8 r4, c2` - 8-bit Reciprocal subtract. r4 = c2 - r4
```


## Size Specifiers

The [math](./instructions/math.md) and the [bit shift](./instructions/shift.md) operations both require size specifiers, since there are a set of math and bit shift instructions for operating on both bytes and words, we need to specify which data type to operate on. For more information on how the size of each operation affects the output, see the appropriate pages for details.
## Operands

Most instructions take operands which specify which registers or data on which the operation takes place.

The operand order is, as described earlier, in the Intel operand order, similar to NASM. This means that pointers are bracketed such as `[r0.x]` and, pertinent to this section, the order of the operands are typically `destination, source` which means if you want to move a value `c2` into into register `r0`, you use the order:

```w2s
mov r0, c2
```

This is because `r0` is the destination, and `c2` is the source. An easy way to remember this may be thinking of the order as being similar to writing out a math equation:
$$ r_0 = c_2 $$
Some instructions take three operands, such as the math instructions. The three operands in this case are in the order `dest, lhs, rhs` where `lhs` and `rhs` are the left and right hand sides of the math equation, and the destination is the register the arithmetic is performed on, and as such the register the value will be stored in.
## Literals

Literal values can be either decimal or hex. Decimal values do not require any special prefix or enclosing symbols and such can be written `12` or `99` or similar.

Hex values must be prefixed with `$` so as to not be ambiguous or conflict with the constant register identifiers such as `c0` and `$c0` etc.

Any instruction that takes a literal value (such as the bit shift instructions) will accept either kind of literal.

```w2s
ror.w r0, $a
rol.b r1, 2
asl.w r5, $4
```
## Inline Values

Sometimes it might be necessary to include raw values arbitrarily within the code memory. This can be achieved with the inline value syntax, which is simply a `!` followed by the hex value to be placed at that address. The hex value must not exceed `0xffff`.

```w2s
; An alternative way to store a literal value from code memory.
; This is equivalent to using the macro `set r0, $f000`
mov r0.x, [ri.x+]
!f000
```

[^1]: While the `!write` command starts at address `0x0000` it can, given enough values, overflow into the `!code` command's region which starts at `0x0040` meaning that if you also write starting values to all the registers, your write command can overflow into the code region, potentially resulting in a separate `!code` command to be unnecessary.
