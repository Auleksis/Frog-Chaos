VK.init(function() {
	console.log("VK API CONNECTED");
	VK.callMethod("showSettingsBox", 8214);
}, function() {
	console.error("VK API CONNECTION ERROR");
}, '5.131');
const bridge = vkBridge;
vkBridge.send('VKWebAppInit');

bridge.subscribe((e) => console.log(e));

function post_wall_ending(text) {
	text = `Я сыграл в ${game_name} и получил интересную историю!\n\n" + text + "\n\nПопробуйте и вы! <ссылка>`
	VK.api("wall.post", {"message": text, "v":"5.131", "attachments": "photo367794961_457270318"}, data => {
		console.log(data);
	});
}

function post_history_ending(orig_text) {
	var text_len = 30;
	var text = [];
	var cnt = 0;
	for(var i = 0; i < orig_text.length; i++) {
		if(cnt < text_len) {
			cnt++;
			text[i] = orig_text[i];
			if(text[i] == '\n') cnt = 0;
			continue;
		}
		while(orig_text[i] != ' ') i--;
		text[i] = '\n';
		cnt = 0;
	}
	text = text.join('');
	bridge.send('VKWebAppShowStoryBox', {
		background_type: 'image',
		url : 'https://sun9-79.userapi.com/impg/xbea8LuReLx6cOSE1cD_-0_13pwwhRCG36eapQ/f-k2OXxW4Vg.jpg?size=1080x1920&quality=96&sign=ec5ae4b6ded33a4d7834a8bda5b0a84e&type=album',
		"stickers": [{
			"sticker_type": "native",
			"sticker": {
				"action_type": "text",
				"action": {"text": text, "style": "poster", "alignment": "right"},
				"transform": {"relation_width": 1}
			}
		}]
	})
}

function invite_friends() {
	VK.callMethod("showInviteBox");
}

function share_link(text) {
	var link = encodeURIComponent("https://vk.com/app51635447");
	window.open(`https://vk.com/share.php?url=${link}&title=${game_name}`, "share", {
		"width": 200,
		"height": 300
	});
}

function save_session(data) {
	bridge.send('VKWebAppStorageSet', {
		"key": "user_data",
		"value": data
	});
}

async function load_last_session() {
	var data = await bridge.send('VKWebAppStorageGet', {
		keys: ["user_data"]
	});
	data = data.keys[0].value;
	unityI.SendMessage("Room", "LoadSession", data);
}

var game_name = "Frog Chaos";
