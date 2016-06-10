
function sign(key, header, payload, callback) {
	var token = KJUR.jws.JWS.sign("RS256", header, payload, key);
	callback(token);
}

function verify(key, jwtToken, text, callback) {
	isValid = KJUR.jws.JWS.verifyJWT(jwtToken, key, { alg: ['RS256'], jti: text });
	callback(isValid);
}

document.querySelector("#sign").onclick = function () {
	var privateKeyString = document.querySelector("#privateKey").value;
	var prvKey = KEYUTIL.getKey(privateKeyString);

	var userText = document.querySelector("#text").value;
	var header = JSON.stringify({ alg: 'RS256', typ: 'JWT' });
	var payload = JSON.stringify({ jti: userText });

	sign(prvKey, header, payload, function (token) {
		if (token) {
			document.querySelector("#token").textContent = token;
		}
	});
}

document.querySelector("#verify").onclick = function () {
	var publicKeyString = document.querySelector("#publicKey").value;
	var pubKey = KEYUTIL.getKey(publicKeyString);

	var token = document.querySelector("#token").textContent;
	var userText = document.querySelector("#text").value;
	verify(pubKey, token, userText, function (isValid) {
		if (isValid) {
			document.querySelector("#status").textContent = "Valid";
		}
		else {
			document.querySelector("#status").textContent = "Not Valid";
		}
	})
}
