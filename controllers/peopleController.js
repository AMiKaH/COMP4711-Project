let mod = require('../models/peopleData');

exports.getAllPeople = function(req,res,next) {
    let Peoples = mod.getall();
    Peoples.then((data) => {
        res.render('peoples', { people: data.rows, peoplesCSS: true });
    });
}

exports.peopleAddForm = function(req,res,next) {
    res.render('peopleadd' ,{formsCSS: true});
}

exports.getPeople = function(req,res,next) {
    let id = req.params.id;
    let People = mod.getpeople(id);
    People.then( (data) => {
        res.render('people', {people: data.rows[0], peopleCSS: true});
    });
}

exports.peopleAdd = function(req,res,next) {
   let p_name = req.body.name;
   let p_about = req.body.about;
   let p_imageURL = req.body.url;

   let pOject = {
      name: p_name,
      about: p_about,
      url: p_imageURL
   }

   mod.add(pOject);
   res.redirect(301, '/peoples');
}