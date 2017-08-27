var isReload = true;
chrome.webRequest.onCompleted.addListener(function(details) {
    console.log('isReload(1):' + isReload.toString());
    // timer
    function sleepByPromise(sec) {
      return new Promise(resolve => setTimeout(resolve, sec*1000));
    }

    // async修飾子を使って非同期関数を宣言します。
    async function waitReload(sec, chrome, tabId) {
        // await句を使って、Promiseの非同期処理が完了するまで待機します。
        await sleepByPromise(sec);
        console.log('timer: ' + sec.toString() + 'sec!!!');
        console.log('isReload(2):' + isReload.toString());
        isReload = true;
        console.log('reload exec!!');
        // リロード
        chrome.tabs.reload(tabId);
    }

/*
      // statusチェック
      if (details.statusCode !== 200) {
          // 現在のタブを取得する
          chrome.tabs.query({
              active: true,
              windowId: chrome.windows.WINDOW_ID_CURRENT
          }, function (result) {
              console.log('reload(2)!!');
              var currentTab = result.shift();
              // timer reload
             if (isReload) {
                 isReload = false;
                 waitReload(1, chrome, currentTab.id);
             }
          });
      }

*/

      // bodyの中身チェック
      chrome.tabs.executeScript(details.tabId, {file :'dom.js'}, function(results) {
        if (results[0].reload) {
          // 現在のタブを取得する
          chrome.tabs.query({
            active: true,
            windowId: chrome.windows.WINDOW_ID_CURRENT
          }, function (result) {
              console.log('reload(1)!!');
              var currentTab = result.shift();
              console.log('isReload(3):' + isReload.toString());
              // timer reload
              if (isReload) {
                  isReload = false;
                  waitReload(1, chrome, currentTab.id);
              }
          });
        }
    });
  },
  {urls: ['<all_urls>']},
  []
);
