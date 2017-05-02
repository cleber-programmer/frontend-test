function $(query) {
  return document.querySelector(query);
}

function  compose(args) {
  return function (x) {
    return args.reverse().reduce(function (a, b) { return b(a); }, x);
  };
}

function like(person) {
  return Math.round(parseInt(person.positive) / (votes(person) / 100)) || 0;
}

function ordenation(people) {
  people.data = people.data.sort(function (a, b) {
    return b.positive - a.positive;
  });
  return people;
}

function people() {
  return (function (callback, xhr) {

    xhr.onreadystatechange = function () {
      /4/.test(this.readyState) && callback(JSON.parse(this.responseText));
    };

    xhr.open('GET', '/fazenda.json', !0);
    xhr.send(null);

    return function when(f) {
      return callback = f, when;
    };

  })(null, new XMLHttpRequest);
}

function render(template) {
  $('.r7_people').innerHTML = template;
}

function template(str) {
  return function (data) {

    return (Function("d", "var p=[];with(d){p.push('" +
      str.innerHTML
         .replace(/[\r\t\n]/g, " ")
         .split("<%")
         .join("\t")
         .replace(/((^|%>)[^\t]*)'/g, "$1\r")
         .replace(/\t=(.*?)%>/g, "',$1,'")
         .split("\t")
         .join("');")
         .split("%>")
         .join("p.push('")
         .split("\r")
         .join("\\'")+ "');}return p.join('');"))(data);

  };
}

function transforme(people) {
  people.data = people.data.map(function (person) {
    person.positive = like(person);
    person.negative = unlike(person);
    return person;
  });
  return people;
}

function unlike(person) {
  return Math.round(100  - person.positive);
}

function votes(person) {
  return parseInt(person.positive) + parseInt(person.negative);
}

people()(compose([render, template($('#r7_template')), ordenation, transforme]));