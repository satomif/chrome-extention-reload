/*(function(){
  // tab がアップデートされたとき（１）
  chrome.tabs.onUpdated.addListener(function(tabId){
    console.log("OK111111!!!!!!!!!!!!!!");
    // ページアクションを出す
    //chrome.pageAction.show(tabId);
  })
  chrome.webRequest.onCompleted.addListener(function(details) {
    console.log("Status Get!!!!!!!!!!!!!!");
      if (details.statusCode !== 200) {

      }
  });
  chrome.webRequest.onBeforeRequest.addListener(
      function (details) {
        console.log(details.url);
        // 現在のタブを取得する
        chrome.tabs.query({
          active: true,
          windowId: chrome.windows.WINDOW_ID_CURRENT
        }, function (result) {
          var currentTab = result.shift();
          // 取得したタブに対してメッセージを送る
          chrome.tabs.sendMessage(currentTab.id, details, function() {});
        });
      },
      {urls: ['<all_urls>']},
      []
  );
  chrome.browserAction.onClicked.addListener(function(tab) {
    // No tabs or host permissions needed!
    console.log('Turning ' + tab.url + ' red!');
    chrome.tabs.executeScript({
      code: 'document.body.style.backgroundColor="red"'
    });
  });
})();*/
chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
      //console.log(details.url);
      // 現在のタブを取得する
      chrome.tabs.query({
        active: true,
        windowId: chrome.windows.WINDOW_ID_CURRENT
      }, function (result) {
        var currentTab = result.shift();
        //console.log(currentTab);
        // 取得したタブに対してメッセージを送る
        chrome.tabs.sendMessage(currentTab.id, details, function() {});
      });
    },
    {urls: ['<all_urls>']},
    []
);
chrome.webRequest.onCompleted.addListener(function(details) {
    console.log("Status Get!!!!!!!!!!!!!!");
    console.log(details);
      // Promiseを使う方法
      function sleepByPromise(sec) {
        return new Promise(resolve => setTimeout(resolve, sec*1000));
      }

      // async修飾子を使って非同期関数を宣言します。
      async function wait(sec) {

        console.log('wait ' + sec.toString() + ' sec right now!');

        // await句を使って、Promiseの非同期処理が完了するまで待機します。
        await sleepByPromise(sec);
        console.log('wait ' + sec.toString() + ' sec done!');

      }

      chrome.tabs.executeScript(details.tabId, {file :'dom.js'}, function(results) {
        console.log('response!!!!!');
        console.log(results[0].strContent);
        console.log(results[0].reload);
        if (results[0].reload) {
          console.log('reload!!!!!');
          // 現在のタブを取得する
          chrome.tabs.query({
            active: true,
            windowId: chrome.windows.WINDOW_ID_CURRENT
          }, function (result) {
            var currentTab = result.shift();
            //console.log(currentTab);
            // 取得したタブに対してメッセージを送る
            //chrome.tabs.sendMessage(currentTab.id, details, function() {});
            wait(1);
            // リロード
            chrome.tabs.reload(currentTab.id);
          });
        }
    });

      console.log(details);
      console.log('anothor task 1 ');
      console.log('anothor task 2 ');
      console.log(details.statusCode);
      console.log('anothor task 3');

    if (details.statusCode !== 200) {
      console.log('reload（２）!!!!!');
      // 現在のタブを取得する
      chrome.tabs.query({
        active: true,
        windowId: chrome.windows.WINDOW_ID_CURRENT
      }, function (result) {
        var currentTab = result.shift();
        //console.log(currentTab);
        // 取得したタブに対してメッセージを送る
        //chrome.tabs.sendMessage(currentTab.id, details, function() {});
        wait(1);
        // リロード
        chrome.tabs.reload(currentTab.id);
      });
    }
  },
  {urls: ['<all_urls>']},
  []
);
