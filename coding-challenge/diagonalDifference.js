function diagonalDifference(arr) {
    let sum1 = 0;
    let sum2 = 0;
    
    for (let i = 0; i < arr.length; i++ ) {
        sum1 += arr[i][i];
        sum2 += arr[i][arr.length - i - 1]
    }
    
    return Math.abs(sum1 - sum2);
}