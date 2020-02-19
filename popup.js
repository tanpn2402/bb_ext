// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

function click(e) {
	console.log('click');

	let elements = document.querySelectorAll("#form input");
	let data = {};
	for (var i = 0, element; element = elements[i++];) {
		data[element.getAttribute('id')] = element.value;
	}

	localStorage.setItem('INIT', JSON.stringify(data));

	chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
		var url = tabs[0].url;

		if (url.includes('newAccount')) {
			chrome.tabs.executeScript(null, { code: `document.getElementById('fld-firstName').value = '${data.firstName}'` });
			chrome.tabs.executeScript(null, { code: `document.getElementById('fld-lastName').value = '${data.lastName}'` });
			chrome.tabs.executeScript(null, { code: `document.getElementById('fld-e').value = '${data.email}'` });
			chrome.tabs.executeScript(null, { code: `document.getElementById('fld-p1').value = '${data.password}'` });
			chrome.tabs.executeScript(null, { code: `document.getElementById('fld-p2').value = '${data.password}'` });
			chrome.tabs.executeScript(null, { code: `document.getElementById('fld-phone').value = '${data.phone}'` });
		}
	});


	chrome.tabs.executeScript(null, { code: "document.getElementById('fld-firstName').value = '${data.firstName}'" });
	// window.close();
}

document.addEventListener('DOMContentLoaded', function () {
	var btn = document.getElementById('btnSubmit');
	btn.addEventListener('click', click);
	let elements = document.querySelectorAll("#form input");
	let initData = localStorage.getItem('INIT');
	if (initData) {
		try {
			initData = JSON.parse(initData);
			for (var i = 0, element; element = elements[i++];) {
				element.value = initData[element.getAttribute('id')];
			}
		}
		catch (e) {
			console.log(e);
		}
	}
});
