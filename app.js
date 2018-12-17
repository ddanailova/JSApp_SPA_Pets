const app = Sammy('#site-content', function () {
    this.use('Handlebars', 'hbs');
    this.before({
        except: {}
    }, function () {
        user.initializeLogin();
    });

    this.get('#/', home.index);
    this.get('#/login', user.getLogin);
    this.post('#/login', user.postLogin);
    this.get('#/logout', user.logout);
    this.get('#/register', user.getRegister);
    this.post('#/register', user.postRegister);
    this.get('#/pet/category', pet.getByCategory);
    this.get('#/pet/add', pet.getAdd);
    this.post('#/pet/add', pet.postAdd);
    this.get('#/pet/mine', pet.myPets);
    this.get('#/pet/details', pet.details);
    this.get('#/pet/edit', pet.getEdit);
    this.post('#/pet/edit/:id', pet.postEdit);
    this.get('#/pet/removePage', pet.getRemove);
    this.get('#/pet/remove', pet.postRemove);
    this.get('#/pet/like',pet.postLike);
});

$(function () {
    app.run('#/');
});