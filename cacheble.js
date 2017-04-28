var cacheblejs = function(){
	/** checks if the localStorage is activated/available  */
	var _isLocalStorageActivated = function(){
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
	
	/** Save the giving value in item if localStorage is activated, otherwise in a cookie	 */
	var _setStateValue = function(namespace, k, v){
		var storedJsonVal = _getStateValue(namespace);
		if (storedJsonVal){
			storedJsonVal[k] = v;
		}else {
			storedJsonVal = {};
			storedJsonVal[k] = v;
		}
		
		if(_isLocalStorageActivated){
			localStorage.setItem(namespace, JSON.stringify(storedJsonVal));
		} else{// if LocalStorage is NOT available then use cookies
			var path = '/';
			var date = new Date();
	        date.setTime(date.getTime() + (360*24*60*60*1000));
			var document_cookie = namespace + "=" + JSON.stringify(storedJsonVal) + "; expires=" + date.toUTCString() + "; path=" + path;
			document.cookie = document_cookie;
			return document_cookie;			
		}
		return storedJsonVal;
	};
	/** Get the giving value in item if localStorage is activated, otherwise set it in a cookie	 */
	var _getStateValue = function(namespace, k){
		var jsonVal = new Array();

		if(_isLocalStorageActivated){
			var storedVal = localStorage.getItem(namespace);
			if(storedVal){
				jsonVal = JSON.parse(storedVal);
			} else {
				return {};
			}
		} else{ // if LocalStorage is not available then check cookies
			var coukie = document.cookie.match('(^|;)\\s*' + namespace + '\\s*=\\s*([^;]+)');
			if(coukie){ 
				jsonVal = JSON.parse(coukie.pop());
			}
		}

		return jsonVal[k];
	};
	
	/** return the functions to expose */
	return { setStateValue: _setStateValue, getStateValue: _getStateValue };
}();/** End of stateStorage */
