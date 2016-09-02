var Model = {
    login: function(appId, perms) {
        return new Promise(function(resolve, reject) {
            VK.init({
                apiId: appId
            });

            VK.Auth.login(function(response) {
                if (response.session) {
                    resolve(response);
                } else {
                    reject(new Error('Не удалось авторизоваться'));
                }
            }, perms);
        });
    },
    callApi: function(method, params) {
        return new Promise(function(resolve, reject) {
            VK.api(method, params, function(response) {
                if (response.error) {
                    reject(new Error(response.error.error_msg));
                } else {
                    resolve(response.response);
                }
            });
        });
    },
    getUser: function() {
        return this.callApi('users.get', {});
    },
    getMusic: function() {
        return this.callApi('audio.get', {});
    },
    getFriends: function() {
        return this.callApi('friends.get', {fields: 'photo_100'});
    },
    getNews: function() {
        return this.callApi('newsfeed.get', {filters: 'post', count: 20});
    },
    getGroups: function() {
        return this.callApi('groups.get', {extended: 1, 'v':'5.53'});
    },
    getAllphotos: function() {
        return this.callApi('photos.getAll', {extended: 1, skip_hidden: 1, count: 100, 'v':'5.53'});
    },
    getAllComments: function() {
        return this.callApi('photos.getAllComments', {count: 100, 'v':'5.53'});
    },
    getUsers: function(users) {
        return this.callApi('users.get', {user_ids: users, fields: 'photo_50', 'v':'5.53'});
    },
    getAllAlbums: function() {
        return this.callApi('photos.getAlbums', {need_system: 1, 'v':'5.53'});
    },
    getPhotos: function(album) {
        return this.callApi('photos.get', {extended: 1, album_id: album, 'v':'5.53'});
    }

};
