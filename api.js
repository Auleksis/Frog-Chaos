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
	VK.api("wall.post", {"message": text, "v":"5.131", "attachments": "photo367794961_457270153"}, data => {
		console.log(data);
	});
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

async function save_session(data) {
	var data = await bridge.send('VKWebAppStorageSet', {
		"key": "user_data",
		"value": data
	});
	if(data.result) {
		console.log("SUCCESS");
	}
}
async function load_last_session() {
	var data = await bridge.send('VKWebAppStorageGet', {
		keys: ["user_data"]
	});
	return data.keys[0].value;
}

var game_name = "<название_игры>";


// window.onclick = async () => {
// 	await save_session("Example Data; Sample Data.");
// 	console.log(await load_last_session());
// }
