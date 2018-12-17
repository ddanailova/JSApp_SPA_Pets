const validateForm = function () {
    const register = function (selector) {
        $(selector).on('submit', function (ev) {
            let isFormValid = true;
            let username = $('#username');
            let password = $('#password');

            if (username.val().trim().length < 3) {
                isFormValid = false;
                notifications.showError('Username must be at least 3 symbols')
            }else{
                if (password.val().trim() < 6) {
                    isFormValid = false;
                    notifications.showError('Password must be at least 6 symbols')
                }
            }

            if (!isFormValid) {
                ev.preventDefault();
                ev.stopPropagation();
            }
        });
    };

    return {
        register,
    }
}();