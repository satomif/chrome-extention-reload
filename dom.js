//        var content = document.getElementById("content");
var content = document.getElementsByClassName("content_area");
var strContent = '';
for( var i=0; i<content.length; i++ ) {
  strContent += content.item(i).innerHTML;
}
console.log('strContent:' + strContent);
var response = {reload : false, 'strContent' : strContent};
 if (strContent.indexOf("ただいまサイトが大変混雑しているため、アクセス可能な人数を制限中です。") != -1) {
   response.reload = true;
 }
/*if (strContent.indexOf("Nintendo Switchは、在庫切れのため、ご購入できません。") != -1) {
  response.reload = true;
}*/
response
