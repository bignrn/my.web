const a = {
  0: { name: "Taro", age: "25", disc: "紹介文をここに書く", phot: "aaa.jpg", list: ["リスト1", "リスト2", "リスト3"] },
  1: { name: "Hanako", age: "35", disc: "はなこです", phot: "bbb.jpg", list: ["リスト21", "リスト22", "リスト23"] },
  2: { name: "Miku", age: "20", disc: "みくです。", phot: "ccc.jpg", list: ["リスト31", "リスト32", "リスト33"] },
  3: { name: "Ryo", age: "50", disc: "合コンみたい", phot: "ddd.jpg", list: ["リスト41", "リスト42", "リスト43"] },
}
const deleteList = ["age", "disc", "phot", "list"];

const objDelete = (key, list) => {
  for (let k in key) {
    for (let l in list) {
      delete key[k][list[l]]
    }
  }
  return key;
}

const b = objDelete(a, deleteList);
console.debug(b);

export {
  objDelete,
}