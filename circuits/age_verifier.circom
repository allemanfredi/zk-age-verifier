pragma circom 2.0.0; 

include "../node_modules/circomlib/circuits/comparators.circom";

template AgeChecker() {
    // private
    signal input age; 

    // true/false
    signal output out;

    // 8 = number of bits
    component greaterThan = GreaterThan(8); 
    greaterThan.in[0] <== age;
    greaterThan.in[1] <== 18;

    out <-- greaterThan.out;
    out === 1;
}

component main = AgeChecker();