var UrlParams = (function() {
	var UrlParams = function () {
		if(!(this instanceof UrlParams)) {
			return new UrlParams();
		}
		this.params = {};
		var paramStrArray = location.search.substring(1).split('&');

		paramStrArray.forEach(function(paramStr){
			var kv = paramStr.split('=');
			this.params[kv[0]] = kv[1];
		}.bind(this));
		
	}
	var p = UrlParams.prototype;
	
	p.getParams = function() {
		return this.params;
	}
	
	p.put = function(key, val) {
		if(key==null) return null;
		if(val==null) return null;
		this.params[key] = val;
		return this;
	}
	
	p.remove = function(key) {
		delete this.paramas[key];
		return this;
	}
	
	p.removeAll = function() {
		this.params = {};
		return this;
	}
	
	p.toString = function() {
		var ret = '';
		for(var key in this.params){
			ret += '&' + key + '=' + this.params[key];
		}
		return '?' + ret.substring(1);
	}
	
	p.toSelfUrl = function() {
		var hash = location.hash;
		var ret = location.href.replace(location.search, '').replace(hash, '');
		
		ret += this.toString();
		
		return ret + hash;
	}
	
	p.replaceUrl = function() {
		history.replaceState(null, null, this.toSelfUrl());
	}
	
	p.pushUrl = function() {
		history.pushState(null, null, this.toSelfUrl());
	}
	
	return UrlParams;
})();
