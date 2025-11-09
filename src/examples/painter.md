```w2s
.memory
0001 0000 0000 0000
001f 0000 0000 0000
00df 0000 0000 0000
00ff 0000 0000 0000
104a 0000 0000 0000
10e0
.code
; 0x80 public code start:

set r0, :pub_start ; Public region start
set r1, $1040
mov r6.x, ri.x ; Loop point
mov r2.xyzw, [r0.x+] ; Copy code into public memory
mov [r1.x+], r2 ;
set r3, :pub_end ; Copy region limit
gt.w r3, r0, r3 ; End of the copy region check
sub.w ri, ri, r3
mov ri.x, r6.x
sub.w r0, r0, r0
sub.w r1, r1, r1
sub.w r2, r2, r2
sub.w r3, r3, r3
sub.w r6, r6, r6
jmp $1040 ; Jump to public code

:pub_start
set r0, $10e0
mov r2, c1           ;   Set initial color
mov r6.x, r0.x       ;   Copy counter
and r6, c3           ;   Mask out looping bits
set r5, $000a
lt.w r6, r6, c2      ;   x >= 0xe0
and r6, r5           ;   Mask jump offset if true
add.w ri, ri, r6     ; ,-Conditional jump
set r3, $00ff        ; | Copy counter
nsad r0, r3          ; | Set counter to 0x00df
or r0, c2            ; | Skip to draw region
add.w r0, r0, c0     ; | Increment counter by one
rol.w r2, 1          ; | Rotate color
mov r6.x, r0.x       ; | Copy counter
neq.w r6, r6, c5     ; | Check if counter is reset
sub.w ri, ri, r6     ; |,-Conditional jump
ror.w r2, 1          ; |  Rotate color
                     ; |
rol.w r2, 1          ; `>Rotate color
mov [r0.x+], r2.x    ;   Draw color
jmp $1043
:pub_end
```

```
!vm clear write ᚾ×ᛃᚠᚺᚺᚾᛟᛃᚠᚺᚺᛜᛟᛃᚠᚺᚺᛟᛟᛃᚠᚾᚺᛈᛖᛃᚠᚾᚺᛞᚺᛁᛏᚠᚺᚺᛈᚺᛁᚠ
```
```
!vm code ᛏᛟᛜᛉᚺᚺᛇᛃᛒᛟᛜᛉᚾᚺᛈᚺᛞᛟᛞᛈᛖᛏᚾᛉᛖᛒᚾᛊᛗᛟᛜᛉᚺᚺᛉᛗᛗᛏᛉᛒᛟᛗᛁᛒᛟᛞᛞᛈᛏᛏᛁᛒᛒᛒᛁᛒᛖᛖᛁᛒᛗᛗᛁᛒᛞᛞᛁᛒᛟᛟᛜᛉᚾᚺᛈᚺᛏᛟᛜᛉᚾᚺᛞᚺᛖᚾᚺᛈᛞᛏᛞᛈᛞᛃᛏᛚᛜᛟᛜᛉᛖ×ᛞᛁᛇᛒᛞᛜᛏᛚᛟᛞᚺᛒᛗᛟᛜᛉᚺᚺᛟᛟᛏᛗᛈᛚᛏᛁᛞᛚᛏᚺᚺᛒᛖᚾᛗᛗᛞᛏᛞᛈᛞᛇᛊᛒᛟᛞᛁᛒᛖᚾᛟᛗᛖᚾᛗᛗᛖᛏᛜᛊᛟᛟᛜᛉᚾᚺᛈᛃ ! restart
```
