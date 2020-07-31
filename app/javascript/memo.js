function memo() {
  const submit = document.getElementById("submit"); //ボタン部分を取得するための記述
  submit.addEventListener("click", (e) => {//クリックした時に実行される関数
    const formData = new FormData(document.getElementById("form"));
    const XHR = new XMLHttpRequest(); //非同期通信を実現するための記述
    XHR.open("POST", "/posts", true); //引数にリクエストの内容を追記している
    XHR.responseType = "json"; //レスポンスの内容を定義
    XHR.send(formData); //メモ投稿に入力された情報を送信
    XHR.onload = () => {
      const item = XHR.response.post; //レスポンスとしてレコードデータを取得
      const list = document.getElementById("list");//HTMLを描画する場所のlist要素を取得
      const formText = document.getElementById("content");//メモの入力フォームをリセットするための記述
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
      list.insertAdjacentHTML("afterend", HTML);

      formText.value = "";

      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
      } else {
        return null;
      } //レスポンスがあった場合の処理を記述
    };
  
    XHR.onerror = function () {
      alert("Request failed");
    };

    e.preventDefault();
  }) //レスポンスが失敗した場合の処理
}
window.addEventListener("load", memo);