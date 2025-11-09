```w2s
.memory

dead beef cafe f00d
7fff 0000 0000 0000
1000



.code
;; Setup
; init random seed
mov r0, c0
; :LOOP
; Push PC to stack

; Clear r1 and r2
sub.w r1, r1, r1
sub.w r2, r2, r2
:LOOP
wadd r1, r0.x
wadd r1, r0.w
rol.w r1, 11 ; rotation a
wadd r1, r0.x
wadd r2, r0.y
rol.w r2, 7 ; rotation b
; xor seed with its swizzled self
mov r3, r0
swizzle r3.zwyx
xor r0, r3
; Add rotations back into seed
swizzle r1.wxww
wadd r1, r2.x
swizzle r1.wwxy
xor r0, r1
; put random in public register
mov [c2.x], r0

; increment counter
sub.w r5, r5, r5
set r6, $00fb
mov r5, [r6]
mov r4.x, [r5+] ; Increment the counter (stored in r5)
mov [r6], r5.x  ; Store the counter in memory

; if counter < 0x200 then reset
set1 r4, $0100
gt.w r4, r4, r5 ; r4 = r5 > r4 (0x0000 if false, 0xffff if true)

; lsl.w r4, 1
; sub.w ri, ri, r4
; set ri, :LOOP

; Set ship colour to random value from the PRNG
set r6, $039c
mov [r6.x], r0.x


jeq r4, :LOOP
; nop                ;-1
; sub.w ri, ri, r4   ; 0
; skip2              ; 1
; jmp :LOOP          ; 2
; ;   :LOOP          ; 3

; ; jeq :LOOP
; notdst r4
; sub.w ri, ri, r4   ; 0
; skip2              ; 1
; jmp :LOOP          ; 2
; ;   :LOOP          ; 3

; clear counter
sub.w r5, r5, r5
set r6, $00fb
mov [r6], r5.x

; Ship stuff
; set ship engine to full controls
set r5, $0394
set r6, $003f
mov [r5], r6.x
; set ship heading to random
set r5, $038c
wmov r6, r0.w
and r6, c1
mov [r5], r6.x
; set ship speed to random
set r6, $0384
mov r4, r0
set4 r5, $0000, $7fff, $0000, $0000
and r4, r5
mov [r6.x+], r4.xyzw
; jump back to loop point
jmp :LOOP
```
