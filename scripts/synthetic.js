for(var x=0; x < 5; x++) {
    if(x = 0) {
        carry = dividends[x];
        results.push(carry)
        console.log('This is the zeoreth element')
    } else {
        if(x > length) {
            break;
        }
        carry = dividends[x] + (carry * gcf)
        results.push(carry)
        console.log('Pushing onto the stack' + carry.toString())
    }
}