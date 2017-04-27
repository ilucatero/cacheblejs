cacheblejs.namespace("cacheblejs");

actions = (function() {
/** START STORAGE */
	this.isLocalStorageActivated = function(){
		if (typeof localStorage !== 'undefined') {
		    try {
		        localStorage.setItem('feature_test', 'yes');
		        if (localStorage.getItem('feature_test') === 'yes') {
		        	localStorage.removeItem('feature_test');
		        	return true;
		        } 
		    } catch(e) {
		        // localStorage is disabled
		    }
		}
		return false;
	};
	this.setStoredLocalValue = function(namespace, k, v){
		var storedJsonVal = getStoredLocalValue(namespace);
		if (storedJsonVal){
			storedJsonVal[k] = v;
		}else {
			storedJsonVal = {};
			storedJsonVal[k] = v;
		}
		
		// if LocalStorage is not available then use cookies
		if(!isLocalStorageActivated){
			// update cookie
			var path = '/' + digimind.application.settings.rootContext + '/' + digimind.application.settings.digiClient + '/';
			var date = new Date();
	        date.setTime(date.getTime() + (360*24*60*60*1000));
			var document_cookie = namespace + "=" + JSON.stringify(storedJsonVal) + "; expires=" + date.toUTCString() + "; path=" + path;
			document.cookie = document_cookie;
			return document_cookie;
		} else{
			localStorage.setItem(namespace, JSON.stringify(storedJsonVal));
		}
	};
	this.getStoredLocalValue = function(namespace, k){
		var jsonVal = new Array();
		// if LocalStorage is not available then check cookies
		if(!isLocalStorageActivated){
			var coukie = document.cookie.match('(^|;)\\s*' + namespace + '\\s*=\\s*([^;]+)');
			if(coukie){ 
				jsonVal = JSON.parse(coukie.pop());
			}
		} else{
			var storedVal = localStorage.getItem(namespace);
			if(storedVal){
				jsonVal = JSON.parse(storedVal);
			} else {
				return {};
			}
		}

		return jsonVal[k];
	};
	/** END STORAGE */
  
  return this;
  })();
