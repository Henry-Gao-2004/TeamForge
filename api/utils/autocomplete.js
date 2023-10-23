const file = `accents
accentuable
accentual
accentuality
accentually
accentuate
accentuated
accentuates
accentuating
accentuation
accentuator
accentus
accept
acceptability
acceptable
acceptableness
acceptably
acceptance
acceptances
acceptancy
acceptancies
acceptant
acceptation
acceptavit
accepted
acceptedly
acceptee
acceptees
accepter
accepters
acceptilate
acceptilated
acceptilating
C
C++
Java
JavaScript`

function build() {
    var dict = getDict();
    var top = {
        flag: false,
        child: new Map()
    };
    for (var idx in dict) {
        var s = dict[idx];
        var tmp = top;
        for (var i = 0; i < s.length; i++) {
            if (!tmp.child.has(s[i]))
                tmp.child.set(s[i], {
                    flag: false,
                    child: new Map()
                })
            tmp = tmp.child.get(s[i]);
        }
        tmp.flag = true;
    }
    return top;
}

function getDict() {
    var dict = file.split("\n");
    return dict;
}

function autocomplete(dict, s) {
    if (s == "") return [];
    for (var i = 0; i < s.length; i++) {
        if (!dict.child.has(s[i]))
            return [];
        dict = dict.child.get(s[i]);
    }
    var res = findAll(dict, res, s);
    return res;
}

function findAll(dict, res, s) {
    var res = [];
    if (dict.flag) res.push(s);
    for (var i = 97; i <= 122; i++) {
        var c = String.fromCharCode(i);
        if (dict.child.has(c)) {
            res = res.concat(findAll(dict.child.get(c), res, s + c));
        }
    }
    return res;
}

function testDict() {
    console.log("Dictionary(txt): \n" + getDict() + "\n");
}

function testAutocomplete() {
    var dict = build();
    console.log("test autocompelte on acce: " + autocomplete(dict, "acce") + "\n");
    console.log("test autocompelte on accent: " + autocomplete(dict, "accent") + "\n");
    console.log("test autocompelte on accents: " + autocomplete(dict, "accents") + "\n");
    console.log("test autocompelte on blablabla: " + autocomplete(dict, "blablabla") + "\n");
    console.log("test autocompelte on Java: " + autocomplete(dict, "Java") + "\n");
    console.log("test autocompelte on C: " + autocomplete(dict, "C") + "\n");
    console.log("test autocompelte on : " + autocomplete(dict, "") + "\n");
}

testDict();
testAutocomplete();