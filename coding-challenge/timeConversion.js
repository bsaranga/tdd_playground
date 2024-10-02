function timeConversion(s) {
    const parts = s.split(':');
    let hour = parts[0];
    const min = parts[1];
    const sec = parts[2].substr(0, 2);
    const sig = parts[2].substr(2, 2);
    
    if (Number(hour) != 12 && sig == "PM") {
        hour = String(Number(hour) + 12);
    }
    
    if (Number(hour) == 12 && sig == "AM") {
        hour = "00"
    }
    
    return `${hour}:${min}:${sec}`
}