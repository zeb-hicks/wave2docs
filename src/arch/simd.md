# SIMD Architecture

The Wave2 CPU architecture is "SIMD by default" where most operations are inherently SIMD.

Every register is a SIMD vector of 4 words, and most instructions operate on all four words of both the source and destination register.

Additionally, while loading and storing memory can be performed one word at a time, it's also possible to atomically load and store entire vectors as long as they are stored with proper 4-word alignment.

Instructions that are said to operate on bytes instead of words are also SIMD, and treat the vector as eight 8-bit words for that operation.

