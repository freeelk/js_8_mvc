/*1 задание:
    Взять за основу пример `MVС`.
    Добавить вкладку `Группы`, при переходе на вкладку, должен отображаться список групп (лого и имена групп),
    в которых состоит пользователь

 2 задание:
 Взять за основу пример `MVС`.
 Добавить вкладку `Фото`, при переходе на вкладку, должны отображаться все фото пользователя с количеством лайков, репостов и комментариев каждого фото.


 4 задание (со большой звездочкой):
 Взять за основу результат `ДЗ 3`.
 Вместо обычного списка всех фото, выводить фото, сгруппированные по альбомам, в которых они состоят.
 Например:
 Альбом1
 фото1
 фото2
 фото3

 Альбом2
 фото1
 фото2

 И так далее…

 5 задание (со очень большой звездочкой):
 Взять за основу результат `ДЗ 4`.
 Добавить возможность выбирать сортировку фото в альбомах:
 - по количеству комментариев
 - по количеству репостов
 - по количеству лайков
 - по дате добавления
    */



Handlebars.registerHelper('formatTime', function(time) {
    var minutes = parseInt(time / 60),
        seconds = time - minutes * 60;

    minutes = minutes.toString().length === 1 ? '0' + minutes : minutes;
    seconds = seconds.toString().length === 1 ? '0' + seconds : seconds;

    return minutes + ':' + seconds;
});

Handlebars.registerHelper('formatDate', function(ts) {
    return new Date(ts * 1000).toLocaleString();
});

new Promise(function(resolve) {
    window.onload = resolve;
}).then(function() {
    return Model.login(5267932, 2 | 4 | 8 | 8192);
}).then(function() {
    return Model.getUser().then(function(users) {
        header.innerHTML = View.render('header', users[0]);
    });
}).catch(function(e) {
    console.error(e);
    alert('Ошибка: ' + e.message);
});



window.addEventListener('load', function(e) {
    document.getElementById('sort-panel').style.display = 'none';
});

document.getElementById('menu').addEventListener('click', function(e){
   if(e.target.id === 'allalbums') {
       document.getElementById('sort-panel').style.display = '';
   } else {
       document.getElementById('sort-panel').style.display = 'none';
   };
});
