/**
 * Created by zhoujun on 2017/2/6.
 * email :zhoujun247@gmail.com
 */


function http(url, options, type = 'json') {
	options = options || {};
	options.credentials = 'include';
	return fetch(url, options).then((resp)=> {
		if (resp.ok) {
			return resp[type]();
		} else {
			return resp[type]().then((err)=> {
				alert(err);
			});
		}
	});
}

export default http;