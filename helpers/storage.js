const storage = function () {
    const appKey = 'kid_rkXEnRNgE';
    const appSecret = 'f1ad3eb4f6964c11a874f3230f3c1954';
    const masterSecret = '4460a023ccd64de5afd81d148c08b5a8';

    const saveData = function (key, value) {
        sessionStorage.setItem(appKey + key, JSON.stringify(value));
    };

    const getData = function (key) {
        return JSON.parse(sessionStorage.getItem(appKey + key));
    };

    const deleteData = function(key) {
        sessionStorage.removeItem(appKey + key);
    };

    const saveUser = function(data){
        saveData('userInfo', {
            id: data._id,
            username: data.username,
        });

        saveData('authToken', data._kmd.authtoken);
    };

    const deleteUser = function(){
        deleteData('authToken');
        deleteData('userInfo');
    };

    return {
        saveData,
        getData,
        deleteData,
        appKey,
        appSecret,
        masterSecret,
        saveUser,
        deleteUser
    };
}();