var Controller = {
    musicRoute: function () {
        return Model.getMusic().then(function (music) {
            results.innerHTML = View.render('music', {list: music});
        });
    },
    friendsRoute: function () {
        return Model.getFriends().then(function (friends) {
            results.innerHTML = View.render('friends', {list: friends});
        });
    },
    newsRoute: function () {
        return Model.getNews().then(function (news) {
            results.innerHTML = View.render('news', {list: news.items});
        });
    },
    groupsRoute: function () {
        return Model.getGroups().then(function (groups) {
            results.innerHTML = View.render('groups', {list: groups.items});
        })
    },
    allphotosRoute: function () {
        Model.getAllComments().then(function (comments) {
            Model.data = comments.items;
            return Model.getUsers(getUsersWhoCommented(comments));
        })
            .then(function (users) {
                Model.data = withModel(Model.data, users, 'users', 'from_id', 'id');
                return Model.getAllphotos();
            }).then(function (photos) {
            Model.data = withModel(photos.items, Model.data, 'comments', 'id', 'pid');
            results.innerHTML = View.render('allphotos', {list: Model.data});
        });
    },
    allalbumsRoute: function (sortOrder) {
        Model.getAllAlbums().then(function (albums) {
            Model.getAllComments().then(function (comments) {
                Model.data = comments.items;
                return Model.getUsers(getUsersWhoCommented(comments));
            }).then(function (users) {
                Model.data = withModel(Model.data, users, 'users', 'from_id', 'id');

                var promises = [];
                for (var i = 0; i < albums.items.length; i++) {
                    promises.push(Model.getPhotos(albums.items[i].id, sortOrder));
                }

                Promise.all(promises).then(function (photosArray) {
                    photosArray.forEach(function (photos) {
                        photos.items = sortItems(photos.items, sortOrder);
                        photos.items = withModel(photos.items, Model.data, 'comments_ext', 'id', 'pid');
                        albums.items = withModel(albums.items, photos.items, 'photos', 'id', 'album_id');
                    });
                    results.innerHTML = View.render('allallbumsphotos', {list: albums.items});
                });

            });
        });
    },
};

//Добавление данных из связанной модели
function withModel(parentModel, childModel, childModelName, parentKeyField, childKeyField) {
    for (var i = 0; i < parentModel.length; i++) {
        if (!parentModel[i].hasOwnProperty(childModelName)) {
            parentModel[i][childModelName] = {count: 0, items: []};
        }

        for (var j = 0; j < childModel.length; j++) {
            if (parentModel[i][parentKeyField] === childModel[j][childKeyField]) {
                parentModel[i][childModelName].count++;
                parentModel[i][childModelName].items.push(childModel[j]);
            }
        }
    }
    return parentModel;
}

//список пользователей, которые комментировали
function getUsersWhoCommented(comments) {
    var usersId = [];
    for (var i = 0; i < comments.items.length; i++) {
        usersId.push(comments.items[i].from_id);
    }
    return usersId.join();
}

//сортировка данных перед выводом
function sortItems(items, sortKey) {
    var fn;
    switch (sortKey) {
        case 'date':
            fn = function(a, b) {
                if (a.date < b.date) return 1;
                if (a.date > b.date) return -1;
            };
            break;
        case 'comments':
            fn = function(a, b) {
                if (a.comments.count < b.comments.count) return 1;
                if (a.comments.count > b.comments.count) return -1;
            };
            break;
        case 'likes':
            fn = function(a, b) {
                if (a.likes.count < b.likes.count) return 1;
                if (a.likes.count > b.likes.count) return -1;
            };
            break;
        case 'reposts':
            fn = function(a, b) {
                if (a.reposts.count < b.reposts.count) return 1;
                if (a.reposts.count > b.reposts.count) return -1;
            };
            break;
        default:
            return items;
            break;
    }

    items.sort(fn);
    return items;
}




