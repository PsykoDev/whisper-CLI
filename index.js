const fs = require('fs'),
      path = require('path')

let uwuname = null
	

module.exports = function WhisperCLI(mod) {
	const {command} = mod.require

	mod.hook('S_LOGIN',14, (event) => {
	uwuname = event.name,
	gameId = event.gameId;
	})

	//message when target is offline
	mod.hook('S_SYSTEM_MESSAGE',1 , (event) => {
		if(event.message.includes('@831')) 
		console.log('target is offline')
	  })

	//whisper incoming
	mod.hook('S_WHISPER', 3, (event) => {
		fs.appendFileSync(path.join(__dirname, 'whispers.txt'), `${msgdatetime()} ${event.name} -> ${event.recipient}: ${stripOuterHTML(event.message)}\n`),
		console.log(('[')+(uwuname)+(']')+('Whisper from')+ " " +('[')+(event.name)+(']')+ " " +('[')+('Message')+(']:')+ " " +stripOuterHTML(event.message))		
	})

	//whisp command for CLI
	command.add('whisp', (target, ...message)=>{
		mod.send('C_WHISPER', 1, {
		  target: target,
		  message: message.join(' ')
		})
	  })

	  command.add('guild', (...message)=>{
		mod.send('C_CHAT', 1, {
		  channel: 2,
		  message: message.join(' ')
		})
	  })

	  command.add('party', (...message)=>{
		mod.send('C_CHAT', 1, {
		  channel: 1,
		  message: message.join(' ')
		})
	  })
	  var dataArray = new Buffer.alloc(1, Number());
	  command.add('inv', (target)=>{
		mod.send('C_REQUEST_CONTRACT', 1, { 
			target: target,
            type: 4,
            name: target,
            data: dataArray
		})
		console.log(('[')+(target)+(']')+('Invited') )	
	  })

	  command.add('drop', ()=>{
		mod.send('C_LEAVE_PARTY', 1, {
		})
	  })

	  command.add('add', (target, ...message) => {
		mod.send('C_ADD_FRIEND', 1, {
			name: target,
			message: message.join(' ')

		})
		console.log(('[')+(target)+(']')+('Added') )	
	})
	
	command.add('disband', () => {
		mod.send('C_DISMISS_PARTY', 1, {})
	})

	

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

}
