hljs.registerLanguage("w2s", function(s) {
    return {
        name: "Waver Language",
        aliases: ["wvr"],
        case_insensitive: !0,
        contains: [{
            className: "comment",
            begin: "//",
            end: "$",
            contains: [{
                className: "comment-code",
                begin: "`",
                end: "`",
                subLanguage: "wvr"
            }]
        }, {
            className: "comment",
            begin: "/\\*",
            end: "\\*/",
        }, {
            className: "keyword",
            variants: [{
                begin: "\\b(entry|loop|if|while|for|return)\\b"
            }, {
                begin: "\\b(inline|fn|let|const)\\b"
            }, {
                begin: "\\+|\\-|\\*|\\/|==|!=|<=|>=|<|>|=|&&|\\|\\||!"
            }, {
                begin: "<<|>>|<_<|>_>|>>>|~|&|\\||\\^"
            }, {
                begin: "\\b(store|load|halt|nop|sleep)\\b"
            }]
        }, {
            className: "number",
            variants: [{
                begin: "\\b0x[a-fA-F0-9_]+\\b"
            }, {
                begin: "\\$0b[01]+\\b"
            }, {
                begin: "\\b[0-9_]+\\b"
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
