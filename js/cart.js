var CookieSessionStore = {
    isSet: function() {
        return this.get() != undefined ? true : false;
    },
    get: function() {
        var nameEq = this.cookieName + '='
        var ca = document.cookie.split(';');
        for (var i=0; i<=ca.length; i++) {
            var c = ca[i];
            if (c != undefined) {
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEq) == 0) return c.substring(nameEq.length,c.length);
            }
        }
        return null;
    },
    set: function(id) {
        document.cookie = this.cookieName + '=' + id + this.expires(1) + '; path=/';
    },
    expires: function(days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
	return "; expires="+date.toGMTString();
    },
    cookieName: 'hpsession'
}

var Cart = {
    session: CookieSessionStore,
    newId: function() {
	this.id = $.couch.newUUID();
	this.session.set(this.id);
    },
    grab: function() {
	this.newId();
	if (this.session.isSet()) {
            this.find(this.session.get());
	} else {
            this.create();
	}
        return this;
    },
    create: function() {
	this.session.set(id)
	console.log('create')
    },
    find: function(id) {
	console.log('find')
    }
}

$(function() {
    Cart.grab()
});
