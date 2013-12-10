exports.home = function(req,res){
	res.render('home',{title: 'Welcome to Mind-Blow'})
};

exports.error404 = function(req,res){
	res.status(404).render('404',{title: 'Page not Found'});
};

exports.login_handler = function(req, res){
	username = req.body.username || 'Anonymous';
	req.session.username = username;
	res.redirect('/blogs');
}

var blogs = {
	Love:{title:'Love of my life',content:'I love this song!'},
	Hello:{title:'Hello', content:'My second blog here'},
	Scorpions:{title:'Scorpions', content:'Life is too short is mindblowing song'}
};

exports.blogs = function(req,res){
	if(typeof req.session.username == 'undefined'){
		console.log(req.body);
		res.redirect('/');
	}
	else{
		res.render('blogs', {title: 'Blog - Articles', username: req.session.username, blogs:blogs});
		console.log(req.body);
	}
};

exports.blog = function(req,res){
	if(typeof req.session.username == 'undefined')
		redirect('/');
	else{
		var title = blogs[req.params.id].title;
		var content = blogs[req.params.id].content;
		res.render('blog',{title: 'Blog - ', username: req.session.username, title:title, content:content});
	}
};

exports.page = function(req,res){
	var name = req.query.name;
	var contents = {
		about: 'Blog serves you as you best lift recording notebook',
		contact: 'You can contact us at <address><strong>MindBlowing</strong></address>'
	};
	res.render('page',{title: 'Blog - ' + name, username: req.session.username, content:contents[name]});
}