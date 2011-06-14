/* Using the Bing Web Search API to get the numbers */

var bingbong = function(){
  var bingURL = 'http://api.bing.net/json.aspx?AppId=B59F3913692A46D75ED39BA8F472DF261C05B80C&Sources=Web&Web.Count=1&Adult=Off&Web.Options=DisableHostCollapsing+DisableQueryAlterations&JsonType=callback&jsonCallback=bingbong.incoming&Query='

  var f = document.getElementById('f');
  f.addEventListener('submit',function(event){ /* yeah, f*ck you IE6 */
    var val1 = document.getElementById('searchterm1').value;
    var val2 = document.getElementById('searchterm2').value;
    if(val1 !== '' && val2 !== ''){
      loadme(bingURL+val1);
      loadme(bingURL+val2);
    } else {
      alert('Please provide terms first, duh!')
    }
    event.preventDefault();
  },false);

  var results = [];

  function incoming(o){
    if(!o.SearchResponse.Errors){
      results.push({
        term:o.SearchResponse.Query.SearchTerms,
        value:o.SearchResponse.Web.Total
      });
      if(results.length === 2){
        paint(results);
      }
    } else {
      alert('Bing made a boo-boo: ' + o.SearchResponse.Errors);
    }
  }

  function paint(results){
    var out = '',max = 0,
    val1 = +results[0].value,
    val2 = +results[1].value;
    if(val1 > val2){
      out += '<h2>Winner: ' + results[0].term + '</h2>';
      max = val1;
    } else {
      out += '<h2>Winner: ' + results[1].term + '</h2>';
      max = val2;
    }
    var scale = 270/max;
    out += '<ul>';
    var h1 = 310 - ~~(val1 * scale);
    var h2 = 310 - ~~(val2 * scale);
    out += '<li style="border-top:'+ h1 +'px solid #665"><span>' + 
           results[0].term + ': <strong>' + results[0].value +
           '</strong></span></li>';
    out += '<li style="border-top:'+ h2 +'px solid #665"><span>'+ 
           results[1].term + ': <strong>' + results[1].value +
           '</strong></span></li>';
    out += '</ul><div id="curtain"></div>';
    document.getElementById('output').innerHTML = out;
    results.length = 0;
  }

  function loadme(url){
    var s = document.createElement('script');
    s.setAttribute('src',url);
    document.getElementsByTagName('head')[0].appendChild(s);
  }
  
  return{incoming:incoming} 

}();