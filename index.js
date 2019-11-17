const fs = require('fs'),
      path = require('path')

module.exports = function WhisperLog(mod) {
	mod.hook('S_WHISPER', 3, event => {
		fs.appendFileSync(path.join(__dirname, 'whispers.txt'), `${msgdatetime()} ${event.name} -> ${event.recipient}: ${stripOuterHTML(event.message)}\n`)
		}
	)
}

function stripOuterHTML(str) {
	return str.replace(/^<[^>]+>|<\/[^>]+><[^\/][^>]*>|<\/[^>]+>$/g, '')
	}

function msgdatetime(str) {
	var MsgDate = new Date();
	var MsgDateString;
	
	MsgDate.setDate(MsgDate.getDate());
	
	MsgDateString = ('0' + MsgDate.getDate()).slice(-2) + '/' + ('0' + (MsgDate.getMonth()+1)).slice(-2) + '/' + MsgDate.getFullYear() + ' ' + ('0' + MsgDate.getHours()).slice(-2) + ':' + ('0' + MsgDate.getMinutes()).slice(-2) + ':' + ('0' + MsgDate.getSeconds()).slice(-2);
	
	return MsgDateString
}