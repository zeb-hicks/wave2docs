# Wave2 Assembler

### [Github](https://github.com/zeb-hicks/wave2_assembler) | [Installation](#installation)

Building Wave2 binaries which can be loaded into the simulator or converted into runic for use as chat load commands can be constructed using the Wave2 Assembler.

The assembler accepts [`w2s` files](../w2s/assembly.md) either via `stdin` or filename. The `w2s` file is then compiled into Wave2 bytecode and then output either to `stdout` or written to the provided output file.

There are three output modes available. Standard, binary, and runic.

- Standard mode simply outputs the words in big endian plaintext hexadecimal.
- Binary mode outputs a Wave2 binary file.
- Runic mode outputs the words as Wave2 runes, and can optionally be wrapped in chat commands to be posted directly to stream.

## Wave2 Binary Format

The binary output of the assembler is in the [Wave2 binary format](./binary.md).

These binaries can be loaded directly by Wave2 tools such as the debugger, and contain a description of the 

## Runic Output


## Installation

Make sure rust and therefore cargo is installed, and then run:
```
cargo install --git https://github.com/zeb-hicks/wave2_assembler
```

Or clone the repository locally and install using:
```
cargo install --path /path/to/wave2_assembler
```

If you have cargo binaries available on your path then you should be able to easily run the assembler from the command line like so:
```
waveasm 
```