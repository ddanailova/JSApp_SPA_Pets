const pet = function () {

    const getByCategory = function (ctx) {
        petModel.getByCategory(ctx.params.category).then(function (res) {
            ctx.pets = res;
            ctx.partial('views/pet/listPets.hbs');
        }).catch(
            function (res) {
                notifications.handleError(res);
            }
        );
    };

    const getAdd = function (ctx) {
        ctx.partial('views/pet/addPet.hbs');
    };

    const postAdd = function (ctx) {
        petModel.add(ctx.params).then(function () {
            notifications.showInfo('Pet created.');
            ctx.redirect('#/');
        }).catch(function (res) {
            notifications.handleError(res);
        });
    };

    const myPets = function (ctx) {
        let userInfo = storage.getData('userInfo');
        petModel.myPets(userInfo.id)
            .then(function (res) {
                ctx.pets = res;
                ctx.partial('views/pet/myPets.hbs');
            }).catch(function (res) {
            notifications.handleError(res);
        })
    };

    const details = function (ctx) {
        let petId = ctx.params.id;
        storage.saveData('petId', petId);
        petModel.details(petId)
            .then(function (res) {
                ctx.pet = res;
                ctx.partial('views/pet/detailsPet.hbs');
            })
            .catch(function (res) {
                notifications.handleError(res);
            });
    };

    const getEdit = function (ctx) {
        let petId = ctx.params.id;
        storage.saveData('petId', petId);
        petModel.details(petId)
            .then(function (res) {
                ctx.pet = res;
                ctx.partial('views/pet/editPet.hbs');
            })
            .catch(function (res) {
                notifications.handleError(res);
            });
    };

    const postEdit = function (ctx) {
        let petId = storage.getData('petId');
        petModel.details(petId).then(
            function (data) {
                ctx.params.name=data.name;
                ctx.params.likes=data.likes;
                ctx.params.imageURL=data.imageURL;
                ctx.params.category=data.category;
                petModel.postEdit(petId, ctx.params)
                    .then(function (res) {
                        notifications.showInfo(`Updated successfully!`);
                        ctx.redirect('#/');
                    })
                    .catch(function (res) {
                        notifications.handleError(res);
                    });
            }
        )
            .catch(function (res) {
            notifications.handleError(res);
        });
    };

    const getRemove = function (ctx) {
        let petId = ctx.params.id;
        storage.saveData('petId', petId);
        petModel.details(petId)
            .then(function (res) {
                ctx.pet = res;
                ctx.partial('views/pet/removePet.hbs');
            })
            .catch(function (res) {
                notifications.handleError(res);
            });
    };

    const postRemove = function (ctx) {
        let petId = ctx.params.id;
        petModel.remove(petId)
            .then(function () {
                notifications.showInfo('Pet removed successfully!');
                ctx.redirect('#/')
            })
            .catch(function (res) {
                notifications.handleError(res);
            });
    };

    const postLike = function (ctx) {
        let petId = ctx.params.id;
        petModel.details(petId).then(
            function (data) {
                let likes =Number(data.likes) + 1;
                ctx.params.name=data.name;
                ctx.params.description=data.description;
                ctx.params.likes=likes;
                ctx.params.imageURL=data.imageURL;
                ctx.params.category=data.category;
                petModel.postEdit(petId, ctx.params)
                    .then(function (res) {
                        ctx.redirect('#/');
                    })
                    .catch(function (res) {
                        notifications.handleError(res);
                    });
            }
        )
            .catch(function (res) {
                notifications.handleError(res);
            });
    };


    return {
        getAdd,
        postAdd,
        myPets,
        getRemove,
        getEdit,
        postEdit,
        postRemove,
        details,
        getByCategory,
        postLike,
    }
}();