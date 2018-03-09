var hbs = require('hbs');

hbs.registerHelper('logon', function(options) {
    // TODO check if user is logged on
    if (true) {
        return options.fn(this);
    }
});

hbs.registerHelper('roundDate', function(context, options) {
    let _return = "";

    // Pseudonymisation de la date (en n'affichant que la date, mais pas l'heure)
    date = new Date(context);
    
    _return = date.toLocaleDateString();
    
    return _return;
});
