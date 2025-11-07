hljs.registerLanguage("w2s", function(s) {
    return {
        name: "Wave2 Assembly",
        aliases: ["w2s"],
        case_insensitive: !0,
        contains: [{
            className: "comment",
            begin: ";",
            end: "$",
            contains: [{
                className: "comment-code",
                begin: "`",
                end: "`",
                subLanguage: "w2s"
            }]
        }, {
            className: "keyword",
            variants: [{
                begin: "\\b((:?nop|hlt|halt)|(:?slp|sleep)(:?\\.[hlw])?)\\b"
            }, {
                begin: "\\b(wmov|wmove|wswap|wadd|wsub)\\b"
            }, {
                begin: "\\b(mov|move|swi|swizzle)\\b"
            }, {
                begin: "\\b(add|adds|sub|subs|carry|ado|addo|addover|suo|subo|subover|rso|rsuo|rsubo|rsubover)(\\.[bw])?\\b"
            }, {
                begin: "\\b(eq|equ|ne|neq|lt|gt|le|lte|ge|gte)(\\.[bw])?\\b"
            }, {
                begin: "\\b(lsl|asl|rol|asr|lsr|ror)(\\.[bw])?\\b"
            }, {
                begin: "\\b(skip[1234]?)\\b"
            }, {
                begin: "\\b(set[1234]?)\\b"
            }, {
                begin: "\\b(jmp|jeq?|jc|jcp|jne|jnc|jcc)\\b"
            }, {
                begin: "\\b(all|one|swp|swap|nsrc|notsrc|ndst|notdst|notdest|sand|srcandnotdst|nsad|notsrcanddst|sond|srcornotdst|nsod|notsrcordst|and|or|xor|nand|nor|xnor)(\\.[bw])?\\b"
            }, {
                begin: "\\b(hadd|mul|mults(?:at(?:urate)?)?|mlo|multl(?:o(?:w)?)?|mhi|multh(?:i(?:gh)?)?|div(?:ide)?|rdiv(?:ide)?)\\b"
            }, {
                // Extra-syntactic keywords for comment code.
                begin: "\\b(load|store|sub16|rsub8|sub16|rsub16)\\b"
            }]
        }, {
            className: "number",
            variants: [{
                begin: "\\b\$[a-fA-F0-9]+\\b"
            }, {
                begin: "\\b[0-9]+\\b"
            }, {
                begin: "\\$[0-9a-fA-F]+\\b"
            }, {
                begin: "\\!\\b[0-9a-fA-F]+\\b"
            }]
        }, {
            className: "variable",
            begin: "\\:[0-9a-zA-Z_]+"
        }, {
            className: "params",
            begin: "\\b(r[0-7i]|c[0-7])\\b",
            end: "(\\.?)([xyzw]{1,4})?",
            contains: [{
                className: "operator",
                begin: "\\."
            }, {
                className: "property",
                begin: "[xyzw]{1,4}"
            }]
        }, {
            className: "params",
            begin: "\\[(r[0-7i]|c[0-7])",
            end: "(\\.?)([xyzw]{1,4})?(\\+?)\\]",
            contains: [{
                className: "operator",
                begin: "\\."
            }, {
                className: "property",
                begin: "[xyzw]{1,4}"
            }, {
                className: "operator",
                begin: "\\+"
            }]
        }]
    }
});
hljs.initHighlightingOnLoad();
