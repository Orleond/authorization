'use strict';

const color = document.getElementById('color'),
    change = document.getElementById('change');

function start() {
    document.body.style.backgroundColor = color.textContent;
    change.style.color = color.textContent;
}

change.addEventListener('click', function() {
    let num,
        num16 = [],
        num16end;
    for (let i = 0; i < 6; i++) {
        num = Math.floor(Math.random() * 15);
        switch (num) {
            case 10:
                num = 'a';
                break;
            case 11:
                num = 'b';
                break;
            case 12:
                num = 'c';
                break;
            case 13:
                num = 'd';
                break;
            case 14:
                num = 'e';
                break;
            case 15:
                num = 'f';
                break;
        }
        num16[i] = num;
    }
    num16end = '#' + num16.join('');
    color.textContent = num16end;
    start();
});

start();