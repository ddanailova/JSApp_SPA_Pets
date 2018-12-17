const petModel = function () {
    let petsUrl = `appdata/${storage.appKey}/pets`;

    const getAll = function () {
        let sortedPetsUrl = petsUrl + '?query={}&sort={"likes": -1}';
        return requester.get(sortedPetsUrl);
    };
    const getByCategory = function (category) {
        let categoryUrl = petsUrl;
        categoryUrl += `?query={"category":${category}}`;
        return requester.get(categoryUrl);
    };

    const myPets = function (id) {
        let userPetsUrl = petsUrl;
        userPetsUrl += `?query={"_acl.creator":"${id}"}`;
        return requester.get(userPetsUrl);
    };

    const add = function (params) {
        let data = {
            "name": params.name,
            "description": params.description,
            "imageURL": params.imageURL,
            "category": params.category
        };
        return requester.post(petsUrl, data);
    };

    const postEdit = function (id, params) {
        let petEditUrl = petsUrl + `/${id}`;
        let data = {
            "name": params.name,
            "likes": params.likes,
            "description": params.description,
            "imageURL": params.imageURL,
            "category": params.category
        };
        return requester.update(petEditUrl, data);
    };

    const details = function (id) {
        let petsDetailUrl = petsUrl + `/${id}`;
        return requester.get(petsDetailUrl)
    };

    const remove = function (id) {
        let memeRemoveUrl = petsUrl + `/${id}`;
        return requester.remove(memeRemoveUrl);
    };


    return {
        getAll,
        myPets,
        add,
        details,
        postEdit,
        remove,
        getByCategory,
    }
}();