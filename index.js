let a =10
let b=20 
let c = 0
let d = 0
c= a+b
console.log(c)
d = a+b+c
console.log(d)


function countAlpha(str){
    let freq = {}
    for(let char of str.toLowerCase()){
    
    if(/[a-z]/.test(char)){
        freq[char]=(freq[char] || 0)+1

    }
}
    return freq
    }
let input='sarankumarroseqwtyredcsx'
let output = countAlpha(input)
console.log(output)