# Waver Syntax

The Waver language syntax is a very simple facsimile of Rust's syntax.

Programs define an entry point with the `entry` block, and can define additional subroutines with the `fn` keyword.

```wvr
entry {
	store(0x39c, foo());
}

fn foo() {
	return 0xf800;
}
```

Constants can be defined using the `const` keyword. Constant visibility depends on where they are defined.

Constants defined within a block are not accessible outside the scope of that block.

```wvr
const SHIP_COLOR = 0x39c;

entry {
	store(SHIP_COLOR, rgb(255, 0, 0));
}

fn rgb(red, green, blue) {
	// RGB8 -> RGB565
	let rgb = (red >> 3) & 0b11111;
	rgb <<= 5;
	rgb &= (green >> 2) & 0b111111;
	rgb <<= 6;
	rgb &= (blue >> 3) & 0b11111;
	return rgb;
}
```


```wvr
fn rgb(red, green, blue) {
	const MASK = [0xf800, 0x07e0, 0x001f, 0x0000];
	const COLOR_SHIFT = [11, 5, 0, 0];
	
	let rgb = [red, green, blue, 0];
	rgb <<= COLOR_SHIFT;
	rgb &= MASK;
	rgb = hadd(rgb);
}
```
