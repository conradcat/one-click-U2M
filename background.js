var youtube_link = "";

chrome.tabs.onUpdated.addListener(function(tabId , info) {
	if (info.status == "complete") {
		if(typeof tabId != 'undefined') { 
			chrome.tabs.get(tabId, function(tab){
				current_url = JSON.stringify(tab.url);
				if( current_url == "\"http://www.youtube-mp3.org/\"" && youtube_link != "" ){
					code_str = 'document.getElementById("youtube-url").value=' + youtube_link + ';' + 'document.getElementById("submit").click();';
					youtube_link = "";
					chrome.tabs.executeScript({
						code: code_str
					});
				}
			});
		}
	}
});

function genericOnClick(info, tab) {
  youtube_link = JSON.stringify(info.linkUrl);
  chrome.tabs.create({ url: "http://www.youtube-mp3.org/" });
}

chrome.contextMenus.create({"title": "U2M", "contexts":["link"], "onclick": genericOnClick});