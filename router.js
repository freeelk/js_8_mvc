var Router = {
    handle: function(fullRoute) {
        var [route, param] = fullRoute.split('_');
        var routeName = route + 'Route';

        if (!Controller.hasOwnProperty(routeName)) {
            throw new Error('Маршрут не найден!');
        }

        Controller[routeName](param);
    }
};

