import rotas from './rotas.js';
import spa from './spa.js'

(() => {
    spa('content', rotas)

    $('.nav-link').click(function() {
        $('.navbar-nav li.active').removeClass('active')
        $(this).parent().addClass('active')
        if ($('.navbar-collapse').hasClass('show')) {
            $('.navbar-collapse').removeClass('show')
        }
    })
})()
