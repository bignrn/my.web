import { defineStore } from "pinia";

export const useDiceTopicStore = defineStore("DiceTopic", {
  state: () => ({
    topics: [
      {
        "id": "1",
        "title": "行ってみたい国"
      },
      {
        "id": "2",
        "title": "恋バナ"
      },
      {
        "id": "3",
        "title": "行ってみたい場所"
      },
      {
        "id": "4",
        "title": "おすすめのおやつ"
      },
      {
        "id": "5",
        "title": "最近はまっている事・物"
      },
      {
        "id": "6",
        "title": "面白いエピソード"
      },
      {
        "id": "7",
        "title": "生まれ変わったら何になりたい？"
      },
      {
        "id": "8",
        "title": "好きなタイプ"
      },
      {
        "id": "9",
        "title": "私の\"実は凄い事！\"をカミングアウト"
      },
      {
        "id": "10",
        "title": "ささやかな幸せ"
      },
      {
        "id": "11",
        "title": "休日の過ごし方"
      },
      {
        "id": "12",
        "title": "宝くじで1億円あたったら？"
      }
    ],
  }),
})