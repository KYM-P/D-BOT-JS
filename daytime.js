function addZero(num) {
    if (num < 10) {
        num = "0" + num;
    }
    return num;
}

function getCurrentTime() {
    var date = new Date();
    var year = date.getFullYear();
    var month = addZero(date.getMonth() + 1);
    var day = addZero(date.getDate());
    var hour = addZero(date.getHours());
    var minute = addZero(date.getMinutes());
    var second = addZero(date.getSeconds());

    var currentTime = year + "/" + month + "/" + day + "/" + hour + "/" + minute + "/" + second;
    return currentTime;
}

currentTime = getCurrentTime();

console.log(currentTime);

