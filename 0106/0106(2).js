function solution(n){
    var count = 1;
    var sum=0;
    while( 
count<=n){
        sum = sum + count;
        count++;
    }
    return sum;
}
