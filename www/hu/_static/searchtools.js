/*
 * searchtools.js_t (custom)
 * ~~~~~~~~~~~~~~~~
 *
 * Sphinx JavaScript utilities for the full-text search.
 *
 * :copyright: Copyright 2007-2018 by the Sphinx team, see AUTHORS.
 * :license: BSD, see LICENSE for details.
 *
 */


/* Non-minified version JS is _stemmer.js if file is provided */ BaseStemmer=function(){this.setCurrent=function(r){this.current=r;this.cursor=0;this.limit=this.current.length;this.limit_backward=0;this.bra=this.cursor;this.ket=this.limit};this.getCurrent=function(){return this.current};this.copy_from=function(r){this.current=r.current;this.cursor=r.cursor;this.limit=r.limit;this.limit_backward=r.limit_backward;this.bra=r.bra;this.ket=r.ket};this.in_grouping=function(r,t,i){if(this.cursor>=this.limit)return false;var s=this.current.charCodeAt(this.cursor);if(s>i||s<t)return false;s-=t;if((r[s>>>3]&1<<(s&7))==0)return false;this.cursor++;return true};this.in_grouping_b=function(r,t,i){if(this.cursor<=this.limit_backward)return false;var s=this.current.charCodeAt(this.cursor-1);if(s>i||s<t)return false;s-=t;if((r[s>>>3]&1<<(s&7))==0)return false;this.cursor--;return true};this.out_grouping=function(r,t,i){if(this.cursor>=this.limit)return false;var s=this.current.charCodeAt(this.cursor);if(s>i||s<t){this.cursor++;return true}s-=t;if((r[s>>>3]&1<<(s&7))==0){this.cursor++;return true}return false};this.out_grouping_b=function(r,t,i){if(this.cursor<=this.limit_backward)return false;var s=this.current.charCodeAt(this.cursor-1);if(s>i||s<t){this.cursor--;return true}s-=t;if((r[s>>>3]&1<<(s&7))==0){this.cursor--;return true}return false};this.eq_s=function(r){if(this.limit-this.cursor<r.length)return false;if(this.current.slice(this.cursor,this.cursor+r.length)!=r){return false}this.cursor+=r.length;return true};this.eq_s_b=function(r){if(this.cursor-this.limit_backward<r.length)return false;if(this.current.slice(this.cursor-r.length,this.cursor)!=r){return false}this.cursor-=r.length;return true};this.find_among=function(r){var t=0;var i=r.length;var s=this.cursor;var e=this.limit;var h=0;var u=0;var n=false;while(true){var c=t+(i-t>>>1);var a=0;var f=h<u?h:u;var l=r[c];var o;for(o=f;o<l[0].length;o++){if(s+f==e){a=-1;break}a=this.current.charCodeAt(s+f)-l[0].charCodeAt(o);if(a!=0)break;f++}if(a<0){i=c;u=f}else{t=c;h=f}if(i-t<=1){if(t>0)break;if(i==t)break;if(n)break;n=true}}do{var l=r[t];if(h>=l[0].length){this.cursor=s+l[0].length;if(l.length<4)return l[2];var v=l[3](this);this.cursor=s+l[0].length;if(v)return l[2]}t=l[1]}while(t>=0);return 0};this.find_among_b=function(r){var t=0;var i=r.length;var s=this.cursor;var e=this.limit_backward;var h=0;var u=0;var n=false;while(true){var c=t+(i-t>>1);var a=0;var f=h<u?h:u;var l=r[c];var o;for(o=l[0].length-1-f;o>=0;o--){if(s-f==e){a=-1;break}a=this.current.charCodeAt(s-1-f)-l[0].charCodeAt(o);if(a!=0)break;f++}if(a<0){i=c;u=f}else{t=c;h=f}if(i-t<=1){if(t>0)break;if(i==t)break;if(n)break;n=true}}do{var l=r[t];if(h>=l[0].length){this.cursor=s-l[0].length;if(l.length<4)return l[2];var v=l[3](this);this.cursor=s-l[0].length;if(v)return l[2]}t=l[1]}while(t>=0);return 0};this.replace_s=function(r,t,i){var s=i.length-(t-r);this.current=this.current.slice(0,r)+i+this.current.slice(t);this.limit+=s;if(this.cursor>=t)this.cursor+=s;else if(this.cursor>r)this.cursor=r;return s};this.slice_check=function(){if(this.bra<0||this.bra>this.ket||this.ket>this.limit||this.limit>this.current.length){return false}return true};this.slice_from=function(r){var t=false;if(this.slice_check()){this.replace_s(this.bra,this.ket,r);t=true}return t};this.slice_del=function(){return this.slice_from("")};this.insert=function(r,t,i){var s=this.replace_s(r,t,i);if(r<=this.bra)this.bra+=s;if(r<=this.ket)this.ket+=s};this.slice_to=function(){var r="";if(this.slice_check()){r=this.current.slice(this.bra,this.ket)}return r};this.assign_to=function(){return this.current.slice(0,this.limit)}};
HungarianStemmer=function(){var r=new BaseStemmer;var e=[["cs",-1,-1],["dzs",-1,-1],["gy",-1,-1],["ly",-1,-1],["ny",-1,-1],["sz",-1,-1],["ty",-1,-1],["zs",-1,-1]];var i=[["á",-1,1],["é",-1,2]];var a=[["bb",-1,-1],["cc",-1,-1],["dd",-1,-1],["ff",-1,-1],["gg",-1,-1],["jj",-1,-1],["kk",-1,-1],["ll",-1,-1],["mm",-1,-1],["nn",-1,-1],["pp",-1,-1],["rr",-1,-1],["ccs",-1,-1],["ss",-1,-1],["zzs",-1,-1],["tt",-1,-1],["vv",-1,-1],["ggy",-1,-1],["lly",-1,-1],["nny",-1,-1],["tty",-1,-1],["ssz",-1,-1],["zz",-1,-1]];var t=[["al",-1,1],["el",-1,1]];var s=[["ba",-1,-1],["ra",-1,-1],["be",-1,-1],["re",-1,-1],["ig",-1,-1],["nak",-1,-1],["nek",-1,-1],["val",-1,-1],["vel",-1,-1],["ul",-1,-1],["nál",-1,-1],["nél",-1,-1],["ból",-1,-1],["ról",-1,-1],["tól",-1,-1],["ül",-1,-1],["ből",-1,-1],["ről",-1,-1],["től",-1,-1],["n",-1,-1],["an",19,-1],["ban",20,-1],["en",19,-1],["ben",22,-1],["képpen",22,-1],["on",19,-1],["ön",19,-1],["képp",-1,-1],["kor",-1,-1],["t",-1,-1],["at",29,-1],["et",29,-1],["ként",29,-1],["anként",32,-1],["enként",32,-1],["onként",32,-1],["ot",29,-1],["ért",29,-1],["öt",29,-1],["hez",-1,-1],["hoz",-1,-1],["höz",-1,-1],["vá",-1,-1],["vé",-1,-1]];var u=[["án",-1,2],["én",-1,1],["ánként",-1,2]];var n=[["stul",-1,1],["astul",0,1],["ástul",0,2],["stül",-1,1],["estül",3,1],["éstül",3,3]];var f=[["á",-1,1],["é",-1,1]];var c=[["k",-1,3],["ak",0,3],["ek",0,3],["ok",0,3],["ák",0,1],["ék",0,2],["ök",0,3]];var l=[["éi",-1,1],["áéi",0,3],["ééi",0,2],["é",-1,1],["ké",3,1],["aké",4,1],["eké",4,1],["oké",4,1],["áké",4,3],["éké",4,2],["öké",4,1],["éé",3,2]];var o=[["a",-1,1],["ja",0,1],["d",-1,1],["ad",2,1],["ed",2,1],["od",2,1],["ád",2,2],["éd",2,3],["öd",2,1],["e",-1,1],["je",9,1],["nk",-1,1],["unk",11,1],["ánk",11,2],["énk",11,3],["ünk",11,1],["uk",-1,1],["juk",16,1],["ájuk",17,2],["ük",-1,1],["jük",19,1],["éjük",20,3],["m",-1,1],["am",22,1],["em",22,1],["om",22,1],["ám",22,2],["ém",22,3],["o",-1,1],["á",-1,2],["é",-1,3]];var k=[["id",-1,1],["aid",0,1],["jaid",1,1],["eid",0,1],["jeid",3,1],["áid",0,2],["éid",0,3],["i",-1,1],["ai",7,1],["jai",8,1],["ei",7,1],["jei",10,1],["ái",7,2],["éi",7,3],["itek",-1,1],["eitek",14,1],["jeitek",15,1],["éitek",14,3],["ik",-1,1],["aik",18,1],["jaik",19,1],["eik",18,1],["jeik",21,1],["áik",18,2],["éik",18,3],["ink",-1,1],["aink",25,1],["jaink",26,1],["eink",25,1],["jeink",28,1],["áink",25,2],["éink",25,3],["aitok",-1,1],["jaitok",32,1],["áitok",-1,2],["im",-1,1],["aim",35,1],["jaim",36,1],["eim",35,1],["jeim",38,1],["áim",35,2],["éim",35,3]];var m=[17,65,16,0,0,0,0,0,0,0,0,0,0,0,0,0,1,17,36,10,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1];var b=0;function _(){b=r.limit;r:{var i=r.cursor;e:{if(!r.in_grouping(m,97,369)){break e}i:while(true){var a=r.cursor;a:{if(!r.out_grouping(m,97,369)){break a}r.cursor=a;break i}r.cursor=a;if(r.cursor>=r.limit){break e}r.cursor++}i:{var t=r.cursor;a:{if(r.find_among(e)==0){break a}break i}r.cursor=t;if(r.cursor>=r.limit){break e}r.cursor++}b=r.cursor;break r}r.cursor=i;if(!r.out_grouping(m,97,369)){return false}e:while(true){i:{if(!r.in_grouping(m,97,369)){break i}break e}if(r.cursor>=r.limit){return false}r.cursor++}b=r.cursor}return true}function d(){if(!(b<=r.cursor)){return false}return true}function v(){var e;r.ket=r.cursor;e=r.find_among_b(i);if(e==0){return false}r.bra=r.cursor;if(!d()){return false}switch(e){case 1:if(!r.slice_from("a")){return false}break;case 2:if(!r.slice_from("e")){return false}break}return true}function g(){var e=r.limit-r.cursor;if(r.find_among_b(a)==0){return false}r.cursor=r.limit-e;return true}function j(){if(r.cursor<=r.limit_backward){return false}r.cursor--;r.ket=r.cursor;{var e=r.cursor-1;if(e<r.limit_backward){return false}r.cursor=e}r.bra=r.cursor;if(!r.slice_del()){return false}return true}function h(){r.ket=r.cursor;if(r.find_among_b(t)==0){return false}r.bra=r.cursor;if(!d()){return false}if(!g()){return false}if(!r.slice_del()){return false}if(!j()){return false}return true}function w(){r.ket=r.cursor;if(r.find_among_b(s)==0){return false}r.bra=r.cursor;if(!d()){return false}if(!r.slice_del()){return false}if(!v()){return false}return true}function z(){var e;r.ket=r.cursor;e=r.find_among_b(u);if(e==0){return false}r.bra=r.cursor;if(!d()){return false}switch(e){case 1:if(!r.slice_from("e")){return false}break;case 2:if(!r.slice_from("a")){return false}break}return true}function p(){var e;r.ket=r.cursor;e=r.find_among_b(n);if(e==0){return false}r.bra=r.cursor;if(!d()){return false}switch(e){case 1:if(!r.slice_del()){return false}break;case 2:if(!r.slice_from("a")){return false}break;case 3:if(!r.slice_from("e")){return false}break}return true}function y(){r.ket=r.cursor;if(r.find_among_b(f)==0){return false}r.bra=r.cursor;if(!d()){return false}if(!g()){return false}if(!r.slice_del()){return false}if(!j()){return false}return true}function C(){var e;r.ket=r.cursor;e=r.find_among_b(c);if(e==0){return false}r.bra=r.cursor;if(!d()){return false}switch(e){case 1:if(!r.slice_from("a")){return false}break;case 2:if(!r.slice_from("e")){return false}break;case 3:if(!r.slice_del()){return false}break}return true}function S(){var e;r.ket=r.cursor;e=r.find_among_b(l);if(e==0){return false}r.bra=r.cursor;if(!d()){return false}switch(e){case 1:if(!r.slice_del()){return false}break;case 2:if(!r.slice_from("e")){return false}break;case 3:if(!r.slice_from("a")){return false}break}return true}function B(){var e;r.ket=r.cursor;e=r.find_among_b(o);if(e==0){return false}r.bra=r.cursor;if(!d()){return false}switch(e){case 1:if(!r.slice_del()){return false}break;case 2:if(!r.slice_from("a")){return false}break;case 3:if(!r.slice_from("e")){return false}break}return true}function H(){var e;r.ket=r.cursor;e=r.find_among_b(k);if(e==0){return false}r.bra=r.cursor;if(!d()){return false}switch(e){case 1:if(!r.slice_del()){return false}break;case 2:if(!r.slice_from("a")){return false}break;case 3:if(!r.slice_from("e")){return false}break}return true}this.stem=function(){var e=r.cursor;_();r.cursor=e;r.limit_backward=r.cursor;r.cursor=r.limit;var i=r.limit-r.cursor;h();r.cursor=r.limit-i;var a=r.limit-r.cursor;w();r.cursor=r.limit-a;var t=r.limit-r.cursor;z();r.cursor=r.limit-t;var s=r.limit-r.cursor;p();r.cursor=r.limit-s;var u=r.limit-r.cursor;y();r.cursor=r.limit-u;var n=r.limit-r.cursor;S();r.cursor=r.limit-n;var f=r.limit-r.cursor;B();r.cursor=r.limit-f;var c=r.limit-r.cursor;H();r.cursor=r.limit-c;var l=r.limit-r.cursor;C();r.cursor=r.limit-l;r.cursor=r.limit_backward;return true};this["stemWord"]=function(e){r.setCurrent(e);this.stem();return r.getCurrent()}};
Stemmer = HungarianStemmer;


/**
 * Simple result scoring code.
 */
var Scorer = {
  // Implement the following function to further tweak the score for each result
  // The function takes a result array [filename, title, anchor, descr, score]
  // and returns the new score.
  /*
  score: function(result) {
    return result[4];
  },
  */

  // query matches the full name of an object
  objNameMatch: 11,
  // or matches in the last dotted part of the object name
  objPartialMatch: 6,
  // Additive scores depending on the priority of the object
  objPrio: {0:  15,   // used to be importantResults
            1:  5,   // used to be objectResults
            2: -5},  // used to be unimportantResults
  //  Used when the priority is not in the mapping.
  objPrioDefault: 0,

  // query found in title
  title: 15,
  // query found in terms
  term: 5
};



function splitQuery(query) {
    return query.split(/\s+/);
}


/**
 * Search Module
 */
var Search = {

  _index : null,
  _queued_query : null,
  _pulse_status : -1,

  init : function() {
      var params = $.getQueryParameters();
      if (params.q) {
          var query = params.q[0];
          $('input[name="q"]')[0].value = query;
          this.performSearch(query);
      }
  },

  loadIndex : function(url) {
    $.ajax({type: "GET", url: url, data: null,
            dataType: "script", cache: true,
            complete: function(jqxhr, textstatus) {
              if (textstatus != "success") {
                document.getElementById("searchindexloader").src = url;
              }
            }});
  },

  setIndex : function(index) {
    var q;
    this._index = index;
    if ((q = this._queued_query) !== null) {
      this._queued_query = null;
      Search.query(q);
    }
  },

  hasIndex : function() {
      return this._index !== null;
  },

  deferQuery : function(query) {
      this._queued_query = query;
  },

  stopPulse : function() {
      this._pulse_status = 0;
  },

  startPulse : function() {
    if (this._pulse_status >= 0)
        return;
    function pulse() {
      var i;
      Search._pulse_status = (Search._pulse_status + 1) % 4;
      var dotString = '';
      for (i = 0; i < Search._pulse_status; i++)
        dotString += '.';
      Search.dots.text(dotString);
      if (Search._pulse_status > -1)
        window.setTimeout(pulse, 500);
    }
    pulse();
  },

  /**
   * perform a search for something (or wait until index is loaded)
   */
  performSearch : function(query) {
    // create the required interface elements
    this.out = $('#search-results');
    this.title = $('<h2>' + _('Searching') + '</h2>').appendTo(this.out);
    this.dots = $('<span></span>').appendTo(this.title);
    this.status = $('<p style="display: none"></p>').appendTo(this.out);
    this.output = $('<ul class="search"/>').appendTo(this.out);

    $('#search-progress').text(_('Preparing search...'));
    this.startPulse();

    // index already loaded, the browser was quick!
    if (this.hasIndex())
      this.query(query);
    else
      this.deferQuery(query);
  },

  /**
   * execute search (requires search index to be loaded)
   */
  query : function(query) {
    var i;
    var stopwords = ["a", "abban", "ahhoz", "ahogy", "ahol", "aki", "akik", "akkor", "alatt", "amely", "amelyek", "amelyekben", "amelyeket", "amelyet", "amelynek", "ami", "amikor", "amit", "amolyan", "am\u00edg", "annak", "arra", "arr\u00f3l", "az", "azok", "azon", "azonban", "azt", "azt\u00e1n", "azut\u00e1n", "azzal", "az\u00e9rt", "be", "bel\u00fcl", "benne", "b\u00e1r", "cikk", "cikkek", "cikkeket", "csak", "de", "e", "ebben", "eddig", "egy", "egyes", "egyetlen", "egyik", "egyre", "egy\u00e9b", "eg\u00e9sz", "ehhez", "ekkor", "el", "ellen", "els\u0151", "el\u00e9g", "el\u0151", "el\u0151sz\u00f6r", "el\u0151tt", "emilyen", "ennek", "erre", "ez", "ezek", "ezen", "ezt", "ezzel", "ez\u00e9rt", "fel", "fel\u00e9", "hanem", "hiszen", "hogy", "hogyan", "igen", "ill", "ill.", "illetve", "ilyen", "ilyenkor", "ism\u00e9t", "ison", "itt", "jobban", "j\u00f3", "j\u00f3l", "kell", "kellett", "keress\u00fcnk", "kereszt\u00fcl", "ki", "k\u00edv\u00fcl", "k\u00f6z\u00f6tt", "k\u00f6z\u00fcl", "legal\u00e1bb", "legyen", "lehet", "lehetett", "lenne", "lenni", "lesz", "lett", "maga", "mag\u00e1t", "majd", "meg", "mellett", "mely", "melyek", "mert", "mi", "mikor", "milyen", "minden", "mindenki", "mindent", "mindig", "mint", "mintha", "mit", "mivel", "mi\u00e9rt", "most", "m\u00e1r", "m\u00e1s", "m\u00e1sik", "m\u00e9g", "m\u00edg", "nagy", "nagyobb", "nagyon", "ne", "nekem", "neki", "nem", "nincs", "n\u00e9ha", "n\u00e9h\u00e1ny", "n\u00e9lk\u00fcl", "olyan", "ott", "pedig", "persze", "r\u00e1", "s", "saj\u00e1t", "sem", "semmi", "sok", "sokat", "sokkal", "szemben", "szerint", "szinte", "sz\u00e1m\u00e1ra", "tal\u00e1n", "teh\u00e1t", "teljes", "tov\u00e1bb", "tov\u00e1bb\u00e1", "t\u00f6bb", "ugyanis", "utols\u00f3", "ut\u00e1n", "ut\u00e1na", "vagy", "vagyis", "vagyok", "valaki", "valami", "valamint", "val\u00f3", "van", "vannak", "vele", "vissza", "viszont", "volna", "volt", "voltak", "voltam", "voltunk", "\u00e1ltal", "\u00e1ltal\u00e1ban", "\u00e1t", "\u00e9n", "\u00e9ppen", "\u00e9s", "\u00edgy", "\u00f6ssze", "\u00fagy", "\u00faj", "\u00fajabb", "\u00fajra", "\u0151", "\u0151k", "\u0151ket"];

    // stem the searchterms and add them to the correct list
    var stemmer = new Stemmer();
    var searchterms = [];
    var excluded = [];
    var hlterms = [];
    var tmp = splitQuery(query);
    var objectterms = [];
    for (i = 0; i < tmp.length; i++) {
      if (tmp[i] !== "") {
          objectterms.push(tmp[i].toLowerCase());
      }

      if ($u.indexOf(stopwords, tmp[i].toLowerCase()) != -1 || tmp[i].match(/^\d+$/) ||
          tmp[i] === "") {
        // skip this "word"
        continue;
      }
      // stem the word
      var word = stemmer.stemWord(tmp[i].toLowerCase());
      // prevent stemmer from cutting word smaller than two chars
      if(word.length < 3 && tmp[i].length >= 3) {
        word = tmp[i];
      }
      var toAppend;
      // select the correct list
      if (word[0] == '-') {
        toAppend = excluded;
        word = word.substr(1);
      }
      else {
        toAppend = searchterms;
        hlterms.push(tmp[i].toLowerCase());
      }
      // only add if not already in the list
      if (!$u.contains(toAppend, word))
        toAppend.push(word);
    }
    var highlightstring = '?highlight=' + $.urlencode(hlterms.join(" "));

    // console.debug('SEARCH: searching for:');
    // console.info('required: ', searchterms);
    // console.info('excluded: ', excluded);

    // prepare search
    var terms = this._index.terms;
    var titleterms = this._index.titleterms;

    // array of [filename, title, anchor, descr, score]
    var results = [];
    $('#search-progress').empty();

    // lookup as object
    for (i = 0; i < objectterms.length; i++) {
      var others = [].concat(objectterms.slice(0, i),
                             objectterms.slice(i+1, objectterms.length));
      results = results.concat(this.performObjectSearch(objectterms[i], others));
    }

    // lookup as search terms in fulltext
    results = results.concat(this.performTermsSearch(searchterms, excluded, terms, titleterms));

    // let the scorer override scores with a custom scoring function
    if (Scorer.score) {
      for (i = 0; i < results.length; i++)
        results[i][4] = Scorer.score(results[i]);
    }

    // now sort the results by score (in opposite order of appearance, since the
    // display function below uses pop() to retrieve items) and then
    // alphabetically
    results.sort(function(a, b) {
      var left = a[4];
      var right = b[4];
      if (left > right) {
        return 1;
      } else if (left < right) {
        return -1;
      } else {
        // same score: sort alphabetically
        left = a[1].toLowerCase();
        right = b[1].toLowerCase();
        return (left > right) ? -1 : ((left < right) ? 1 : 0);
      }
    });

    // for debugging
    //Search.lastresults = results.slice();  // a copy
    //console.info('search results:', Search.lastresults);

    // print the results
    var resultCount = results.length;
    function displayNextItem() {
      // results left, load the summary and display it
      if (results.length) {
        var item = results.pop();

        // black list 404 page from returning from the search results
        if (item[0] == "404") { // item[0] returns the URL for the page
          displayNextItem();
          return;
        }   

        
        var listItem = $('<li style="display:none"></li>');
        if (DOCUMENTATION_OPTIONS.FILE_SUFFIX === '') {
          // dirhtml builder
          var dirname = item[0] + '/';
          if (dirname.match(/\/index\/$/)) {
            dirname = dirname.substring(0, dirname.length-6);
          } else if (dirname == 'index/') {
            dirname = '';
          }
          listItem.append($('<a/>').attr('href',
            DOCUMENTATION_OPTIONS.URL_ROOT + dirname +
            highlightstring + item[2]).html(item[1]));
        } else {
          // normal html builders
          listItem.append($('<a/>').attr('href',
            item[0] + DOCUMENTATION_OPTIONS.FILE_SUFFIX +
            highlightstring + item[2]).html(item[1]));
        }
        if (item[3]) {
          listItem.append($('<span> (' + item[3] + ')</span>'));
          Search.output.append(listItem);
          listItem.slideDown(5, function() {
            displayNextItem();
          });
        } else if (DOCUMENTATION_OPTIONS.HAS_SOURCE) {
          var suffix = DOCUMENTATION_OPTIONS.SOURCELINK_SUFFIX;
          if (suffix === undefined) {
            suffix = '.txt';
          }
          $.ajax({url: DOCUMENTATION_OPTIONS.URL_ROOT + '_sources/' + item[5] + (item[5].slice(-suffix.length) === suffix ? '' : suffix),
                  dataType: "text",
                  complete: function(jqxhr, textstatus) {
                    var data = jqxhr.responseText;
                    if (data !== '' && data !== undefined) {
                      listItem.append(Search.makeSearchSummary(data, searchterms, hlterms));
                    }
                    Search.output.append(listItem);
                    listItem.slideDown(5, function() {
                      displayNextItem();
                    });
                  }});
        } else {
          // no source available, just display title
          Search.output.append(listItem);
          listItem.slideDown(5, function() {
            displayNextItem();
          });
        }
      }
      // search finished, update title and status message
      else {
        Search.stopPulse();
        Search.title.text(_('Search Results'));
        if (!resultCount)
          Search.status.text(_('Your search did not match any documents. Please make sure that all words are spelled correctly and that you\'ve selected enough categories.'));
        else
            Search.status.text(_('Search finished, found %s page(s) matching the search query.').replace('%s', resultCount));
        Search.status.fadeIn(500);
      }
    }
    displayNextItem();
  },

  /**
   * search for object names
   */
  performObjectSearch : function(object, otherterms) {
    var filenames = this._index.filenames;
    var docnames = this._index.docnames;
    var objects = this._index.objects;
    var objnames = this._index.objnames;
    var titles = this._index.titles;

    var i;
    var results = [];

    for (var prefix in objects) {
      for (var name in objects[prefix]) {
        var fullname = (prefix ? prefix + '.' : '') + name;
        if (fullname.toLowerCase().indexOf(object) > -1) {
          var score = 0;
          var parts = fullname.split('.');
          // check for different match types: exact matches of full name or
          // "last name" (i.e. last dotted part)
          if (fullname == object || parts[parts.length - 1] == object) {
            score += Scorer.objNameMatch;
          // matches in last name
          } else if (parts[parts.length - 1].indexOf(object) > -1) {
            score += Scorer.objPartialMatch;
          }
          var match = objects[prefix][name];
          var objname = objnames[match[1]][2];
          var title = titles[match[0]];
          // If more than one term searched for, we require other words to be
          // found in the name/title/description
          if (otherterms.length > 0) {
            var haystack = (prefix + ' ' + name + ' ' +
                            objname + ' ' + title).toLowerCase();
            var allfound = true;
            for (i = 0; i < otherterms.length; i++) {
              if (haystack.indexOf(otherterms[i]) == -1) {
                allfound = false;
                break;
              }
            }
            if (!allfound) {
              continue;
            }
          }
          var descr = objname + _(', in ') + title;

          var anchor = match[3];
          if (anchor === '')
            anchor = fullname;
          else if (anchor == '-')
            anchor = objnames[match[1]][1] + '-' + fullname;
          // add custom score for some objects according to scorer
          if (Scorer.objPrio.hasOwnProperty(match[2])) {
            score += Scorer.objPrio[match[2]];
          } else {
            score += Scorer.objPrioDefault;
          }
          results.push([docnames[match[0]], fullname, '#'+anchor, descr, score, filenames[match[0]]]);
        }
      }
    }

    return results;
  },

  /**
   * search for full-text terms in the index
   */
  performTermsSearch : function(searchterms, excluded, terms, titleterms) {
    var docnames = this._index.docnames;
    var filenames = this._index.filenames;
    var titles = this._index.titles;

    var i, j, file;
    var fileMap = {};
    var scoreMap = {};
    var results = [];

    // perform the search on the required terms
    for (i = 0; i < searchterms.length; i++) {
      var word = searchterms[i];
      var files = [];
      var _o = [
        {files: terms[word], score: Scorer.term},
        {files: titleterms[word], score: Scorer.title}
      ];

      // no match but word was a required one
      if ($u.every(_o, function(o){return o.files === undefined;})) {
        break;
      }
      // found search word in contents
      $u.each(_o, function(o) {
        var _files = o.files;
        if (_files === undefined)
          return

        if (_files.length === undefined)
          _files = [_files];
        files = files.concat(_files);

        // set score for the word in each file to Scorer.term
        for (j = 0; j < _files.length; j++) {
          file = _files[j];
          if (!(file in scoreMap))
            scoreMap[file] = {}
          scoreMap[file][word] = o.score;
        }
      });

      // create the mapping
      for (j = 0; j < files.length; j++) {
        file = files[j];
        if (file in fileMap)
          fileMap[file].push(word);
        else
          fileMap[file] = [word];
      }
    }

    // now check if the files don't contain excluded terms
    for (file in fileMap) {
      var valid = true;

      // check if all requirements are matched
      if (fileMap[file].length != searchterms.length)
          continue;

      // ensure that none of the excluded terms is in the search result
      for (i = 0; i < excluded.length; i++) {
        if (terms[excluded[i]] == file ||
            titleterms[excluded[i]] == file ||
            $u.contains(terms[excluded[i]] || [], file) ||
            $u.contains(titleterms[excluded[i]] || [], file)) {
          valid = false;
          break;
        }
      }

      // if we have still a valid result we can add it to the result list
      if (valid) {
        // select one (max) score for the file.
        // for better ranking, we should calculate ranking by using words statistics like basic tf-idf...
        var score = $u.max($u.map(fileMap[file], function(w){return scoreMap[file][w]}));
        results.push([docnames[file], titles[file], '', null, score, filenames[file]]);
      }
    }
    return results;
  },

  /**
   * helper function to return a node containing the
   * search summary for a given text. keywords is a list
   * of stemmed words, hlwords is the list of normal, unstemmed
   * words. the first one is used to find the occurrence, the
   * latter for highlighting it.
   */
  makeSearchSummary : function(text, keywords, hlwords) {
    var textLower = text.toLowerCase();
    var start = 0;
    $.each(keywords, function() {
      var i = textLower.indexOf(this.toLowerCase());
      if (i > -1)
        start = i;
    });
    start = Math.max(start - 120, 0);
    var excerpt = ((start > 0) ? '...' : '') +
      $.trim(text.substr(start, 240)) +
      ((start + 240 - text.length) ? '...' : '');
    var rv = $('<div class="context"></div>').text(excerpt);
    $.each(hlwords, function() {
      rv = rv.highlightText(this, 'highlighted');
    });
    return rv;
  }
};

$(document).ready(function() {
  Search.init();
});