const home = (function () {
    const index = function (ctx) {
        if (userModel.isAuthorized()) {
            petModel.getAll().then(function (res) {
                    let userInfo = storage.getData('userInfo');
                    ctx.pets = res.filter(pet=>pet._acl.creator !==userInfo.id);

                    ctx.partial('views/pet/listPets.hbs');
            }).catch(
                function (res) {
                    notifications.handleError(res);
                }
            );
        } else {
            ctx.partial('views/home/index.hbs');
        }
    };

    return {
        index,
    };
}());
