import "./styles.css";

const onClickAdd = () => {
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";
  createIncompleteList(inputText);
};

const deleteFromIncompleteList = (target) => {
  document.getElementById("incomplete-list").removeChild(target);
};

const createIncompleteList = (text) => {
  //li生成
  const li = document.createElement("li");

  //div生成
  const div = document.createElement("div");
  div.className = "list-row";

  //p生成
  const p = document.createElement("p");
  p.innerText = text;

  //button生成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    //削除
    deleteFromIncompleteList(completeButton.parentNode.parentNode);

    //完了リストに追加
    const addTarget = completeButton.parentNode.parentNode;
    //TODO内容テキストを取得
    //firstElementChildを使用すると汎用性が薄まるけど、本質じゃないので今回は許容
    const text = addTarget.firstElementChild.firstElementChild.innerText;
    // //div以下を初期化
    addTarget.textContent = null;
    // //タグの生成
    const div = document.createElement("div");
    div.className = "list-row";
    const p = document.createElement("p");
    p.innerText = text;
    //buttonタグの生成
    const backButton = document.createElement("button");
    backButton.addEventListener("click", () => {
      const deleteTarget = backButton.parentNode.parentNode;
      document.getElementById("complete-list").removeChild(deleteTarget);

      const text = backButton.parentNode.firstElementChild.innerText;
      createIncompleteList(text);
    });

    backButton.innerText = "戻す";
    addTarget.appendChild(div);
    div.appendChild(p);
    div.appendChild(backButton);
    document.getElementById("complete-list").appendChild(addTarget);
  });

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    deleteFromIncompleteList(deleteButton.parentNode.parentNode);
  });

  //階層設定
  li.appendChild(div);
  div.appendChild(p);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);

  document.getElementById("incomplete-list").appendChild(li);
};

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());
