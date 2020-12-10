'use strict';

const username = document.querySelector('#username'),
    registrUser = document.querySelector('#registrUser'),
    login = document.querySelector('#login'),
    list = document.querySelector('#list'),
    monthes = [' января ', ' февраля ', ' марта ', ' апреля ', ' мая ', ' июня ',
        ' июля ', ' августа ', ' сентября ', ' октября ', ' ноября ', ' декабря '
    ];

let usersList = [],
    json = JSON.stringify(usersList);
if (localStorage.getItem('key')) {
    usersList = JSON.parse(localStorage.getItem('key'));
}
const program = function() {
    list.textContent = '';
    let usersList2 = usersList.filter(element => element !== null);
    usersList = usersList2;
    usersList.forEach(function(item) {
        const li = document.createElement('li');

        li.innerHTML = 'Имя: ' + item.name + ', фамилия: ' + item.lastName + ', зарегистрирован ' +
            item.regDate + '&nbsp <a href="#" id="delete">[удалить]</a>';

        list.append(li);

        const remove = li.querySelector('#delete');
        remove.addEventListener('click', function() {
            const val = item;
            for (let i in usersList) {
                if (val === usersList[i]) {
                    delete usersList[i];
                }
            }
            program();
        });
    });
    json = JSON.stringify(usersList);
    localStorage.setItem('key', json);
};
registrUser.addEventListener('click', function() {
    let nameAndLastName,
        name,
        lastName,
        checkSpace = 0,
        checkName = function(a) {
            checkSpace = 0;
            nameAndLastName = prompt(a);
            for (let item of nameAndLastName.trim()) {
                if (item === ' ') {
                    checkSpace++;
                }
            }
            if (checkSpace !== 1) {
                checkName('Ошибка ввода! Введите имя и фамилию через пробел.');
            }
            nameAndLastName = nameAndLastName.split(' ');
            name = nameAndLastName[0];
            lastName = nameAndLastName[1];
        };
    checkName('Введите имя и фамилию через пробел.');
    let login = prompt('Введите логин'),
        pass = prompt('Введите пароль');
    let today = new Date();
    let newUser = {
        name: name,
        lastName: lastName,
        login: login,
        pass: pass,
        regDate: today.getDay() + monthes[today.getMonth()] + today.getFullYear() + 'г., ' +
            today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
    };
    usersList.push(newUser);
    program();

});

login.addEventListener('click', function() {
    let log = prompt('Введите логин'),
        n = -1;
    usersList.forEach(function(item) {
        if (item.login === log) {
            n = item;
            let password = prompt('Введите пароль');
            if (password === item.pass) {
                username.textContent = item.login;
            } else {
                alert('Неверный пароль');
            }
        }
    });
    if (n === -1) {
        alert('Пользователь не найден');
    }

});

program();