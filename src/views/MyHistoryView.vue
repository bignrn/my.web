<script setup>
import { ref } from "vue";
// import ApexCharts from "vue3-apexcharts";

// const languages = ref();
// const DataBases = ref();
const mySkills = ref([
  {
    title: "開発可能な言語",
    data: [
      {
        name: 'Languages',
        data: [4, 3, 3, 3, 2, 3, 1, 1, 1],
        categories: ['Vue.js', 'JavaScript', 'HTML', 'CSS', 'Java', 'Python', 'C', 'PHP', "Laravel"],
      },
    ]
  },
  {
    title: "データベース",
    data: [
      {
        name: 'DataBases',
        data: [4, 1, 2],
        categories: ['Firebase', "MySQL", "PostgreSQL"],
      },
    ]
  },
  {
    title: "サーバー/クラウド",
    data: [
      {
        name: 'server',
        data: [1, 3, 1],
        categories: ['Linux', "GCP", "AWS"],
      },
    ]
  },
]);
const myPersonality = ref([
  {
    title: "FFS理論",
    data: [
      {
        name: 'FFS',
        data: [2, 3, 3, 2, 3],
        categories: ['凝縮性', "受容性", "弁別性", "拡散性", "保全性"],
      },
    ],
    setting: {
      yaxis: {
        stepSize: 20,
        min: 0,
        max: 3,
        tickAmount: 3,
        labels: {
          style: {
            fontSize: '2rem',
            fontWeight: 600
          }
        }
      }
    }
  },
  {
    title: "MBTI診断(ENTJ-A:指揮官タイプ)",
    data: [
      {
        name: '16Personalities',
        data: [56, 97, 52, 89, 60],
        categories: ['外向型', "直感型", "思考型", "計画型", "自己主張型"],
      },
    ],
    setting: {
      yaxis: {
        stepSize: 25,
        min: 0,
        max: 100,
        tickAmount: 3,
        labels: {
          style: {
            fontSize: '2rem',
            fontWeight: 600
          }
        }
      }
    }
  },
]);

const chartOptions = {
  chart: {
    type: 'radar',
    toolbar: {
      show: false
    },
  },
  title: {
    text: '',
  },
  yaxis: {
    stepSize: 20,
    min: 0,
    max: 4,
    tickAmount: 4,
    labels: {
      style: {
        fontSize: '1.6rem',
        fontWeight: 400
      }
    }
  },
  xaxis: {
    categories: [],
    labels: {
      style: {
        fontSize: '2rem',
        fontWeight: 500
      }
    }
  },
  plotOptions: {
    radar: {
      size: 100,
    }
  },
  responsive: [
    {
      breakpoint: 600,
      options: {
        yaxis: {
          labels: {
            style: {
              fontSize: '1rem',
              fontWeight: 400
            }
          }
        },
        xaxis: {
          labels: {
            style: {
              fontSize: '1.1rem',
              fontWeight: 500
            }
          }
        },
        plotOptions: {
          radar: {
            size: 72,
          }
        },
      }
    }
  ],
};

const lv1 = "images/profile/lv1.svg";
const lv2 = "images/profile/lv2.svg";
const ipa = "images/profile/ipa.svg";
const oracle = "images/profile/oracle.svg";
const historyList = [
  { img: oracle, title: "JAVA BRONZE SE", year: 2021 },
  { img: ipa, title: "基本情報技術者試験", year: 2022 },
  { img: lv1, title: "HTML5\nプロフェッショナル試験Lv1", period: "2024.03.30 > 2029.03.30", year: 2023 },
  { img: lv2, title: "HTML5\nプロフェッショナル試験Lv2", period: "2024.03.30 > 2029.03.30", year: 2024 },
];
const books = [
  "images/profile/readAbleCode.png",
  "images/profile/TheMostUnderstandableOrderOfExplanation.png",
  "images/profile/holeOfThought.png",
  "images/profile/TheTeamEvolvesNaturally.png",
  "images/profile/designSystem.png",
  "images/profile/objectOriented UI.png",
];
const hobbies = [
  {
    img: "images/profile/tp-bg-img.jpg",
    title: "トランペット",
    description: "小学4年生から今日まで、続けている趣味です。トランペットは、私を自由に表現する事が出来る方法だと思っています。\n今では、母校に赴いて外部トランペット講師のお手伝いとして、地域貢献をしています。",
  },
  {
    img: "images/profile/bike.png",
    title: "バイク",
    description: "景色や空気の変化を感じながら走る事が一種のリフレッシュの時間になっています。\nバイクは、中学生のころから憧れを持っており、その夢を叶える事が出来ました。",
  },
  {
    img: "images/profile/undraw_programmer_re_owql.svg",
    title: "個人開発",
    description: "お客様の周りを良くする前に、自分の身の回りから良くして行かないと、良い物を提供出来ないと思っています。\nまた、単純に開発する事が好きなので遊びと、新しい技術の探求心でやっています。",
  },
  {
    img: "images/detail/undraw_team_up_re_84ok.svg",
    title: "コミュニティ",
    description: "IT業界の技術革新の発展は常に早いです。その中で、エンジニア同士の交流とは新しい視点や知識を取り入れる大事なひと時になります。\nそういう意味で、気になったものには積極的に参加しています。",
  },
];

const returnChartOptions = (val) => {
  const tempChartOption = JSON.parse(JSON.stringify(chartOptions));
  tempChartOption["xaxis"]["categories"] = val.data[0]["categories"]
  return Object.assign(tempChartOption, val["setting"]);
};
</script>

<template>
  <div class="portfolio-wrap">
    <!-- 見出し -->
    <section class="introduction-me">
      <span class="cover white" />
      <span class="cover orange" />
      <div class="z-index-top">
        <img
          src="images/profile/Mishima_Yuma.svg"
          alt="Mishima Yuma"
          class="name"
        >
        <img
          src="images/profile/myAvatar_clip.png"
          alt="yuma"
          class="me"
        >
        <div class="poem">
          <p>開発は楽しく。誠実に。</p>
          <p>誰もが使えるシステムをめざす。</p>
          <p>開発のプロフェッショナル。</p>
        </div>
      </div>
    </section>
    <!-- 資格 -->
    <section class="my-capabilities">
      <span class="orange half-circle" />
      <span class="orange pillar" />
      <ul class="capabilities-wrap">
        <li
          v-for="value in historyList"
          :key="value"
        >
          <p class="year">
            {{ value.year }}
          </p>
          <img
            :src="value.img"
            alt="capability-img"
            class="photo"
          >
          <p class="title">
            {{ value.title }}
          </p>
          <p
            v-if="value?.period"
            class="period"
          >
            {{ value?.period }}
          </p>
        </li>
      </ul>
    </section>
    <!-- 本棚 -->
    <section class="recommend-books">
      <h2>"ため"になった本棚</h2>
      <div class="top-2-wrap books">
        <div class="book large">
          <img
            src="images/profile/7Habits.jpg"
            alt="book"
            class="book-img"
          >
          <div class="text-wrap">
            <h3 class="title">
              7つの習慣
            </h3>
            <p class="description">
              生活・仕事・生き方について、考える道標の様な本です。<br>
              人によっては聖書と呼ばれています。
            </p>
          </div>
        </div>
        <div class="book large">
          <img
            src="images/profile/YourStrengthsYouDontKnow.png"
            alt="book"
            class="book-img"
          >
          <div class="text-wrap">
            <h3 class="title">
              あなたの知らない<br>あなたの強み
            </h3>
            <p class="description">
              私が自己啓発本に興味を持つ切っ掛けになった最初の本です。
            </p>
          </div>
        </div>
      </div>
      <div class="some-wrap">
        <ul class="books">
          <li
            v-for="b in books"
            :key="b"
            class="book"
          >
            <img
              :src="b"
              alt="book"
              class="book-img"
            >
          </li>
        </ul>
      </div>
    </section>
    <!-- グラフ化 -->
    <section class="my-skill-tree">
      <h2>私 をグラフ化</h2>
      <div class="flex-wrap">
        <div class="description-wrap">
          <h3>表の読み方</h3>
          <ul>
            <li>4: 即戦力</li>
            <li>3: 実務経験</li>
            <li>2: 多少の実務あり</li>
            <li>1: 教育的、知識</li>
          </ul>
        </div>
        <div
          v-for="value in mySkills"
          :key="value.title"
          class="graph-wrap"
        >
          <h3>{{ value.title }}</h3>
          <apexchart 
            width="100%"
            type="radar"
            :options="returnChartOptions(value)"
            :series="value.data"
          />
        </div>
      </div>
      <h2>性格診断</h2>
      <div class="flex-wrap">
        <div
          v-for="value in myPersonality"
          :key="value.title"
          class="graph-wrap"
        >
          <h3>{{ value.title }}</h3>
          <apexchart 
            width="100%"
            type="radar"
            :options="returnChartOptions(value)"
            :series="value.data"
          />
        </div>
        <!-- 略語 -->
        <abbr class="graph-wrap outside">
          <div>
            <!-- FFS理論 x 宇宙兄弟 -->
            <!-- https://www.ffs-uchukyodai.com/spacebr/top/ -->
            <!-- https://www.ffs-uchukyodai.com/spacebr/member/_login.jsp?__afc=&ec=needLogin -->
            <p>
              FFS理論 x 宇宙兄弟
              (
              <a
                href="https://www.ffs-uchukyodai.com/spacebr/top/"
                target="_blank"
              >
                公式サイト
              </a>
              )
            </p>
            <a
              href="https://www.ffs-uchukyodai.com/spacebr/trial/trial_result_eddie.jsp"
              target="_blank"
            >
              [エディ・ジェイ]タイプ
            </a>
            <br>
            
          </div>
          <div>
            <!-- MBTI診断 -->
            <!-- https://www.16personalities.com/ja/%E7%B5%90%E6%9E%9C/entj-a/m/3xkiizs77 -->
            <p>
              16Personalities
              (
              <a
                href="https://www.16personalities.com/ja"
                target="_blank"
              >
                公式サイト
              </a>
              )
            </p>
            <a
              href="https://www.16personalities.com/ja/プロフィール/c24467a4d634d"
              target="_blank"
            >
              指揮官タイプ（ENTJ-A）
            </a>
          </div>
        </abbr>
      </div>
    </section>
    <!-- 趣味 -->
    <section class="my-hobby">
      <h2>趣味</h2>
      <ul class="hobby-list">
        <li
          v-for="hobby in hobbies"
          :key="hobby.title"
          class="hobby-card"
        >
          <img
            :src="hobby.img"
            :alt="hobby.title"
            class="hobby-img"
          >
          <div class="hobby-text">
            <h3>{{ hobby.title }}</h3>
            <p>{{ hobby.description }}</p>
          </div>
        </li>
      </ul>
    </section>
    <!-- なぜITの世界に -->
  </div>
</template>

<style lang="scss" scoped>
.portfolio-wrap {
  section {
    height: 100vh;
    overflow: hidden;
    &.introduction-me {
      position: relative;
      background-image: url("/public/images/profile/bike.png");
      background-repeat: no-repeat;
      object-fit: cover;
      background-size: cover;
      background-position: center;  /* 中央に配置 */
      background-attachment: fixed; /* スクロールしても固定（任意） */
      .cover {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 900;
        display: block;
        width: 100%;
        height: 100vh;
        &.white {
          background-color: rgba($white, 0.52);
        }
        &.orange {
          clip-path: polygon(75% 0, 100% 0, 100% 100%, 20% 100%); // 左上、右上、右下、左下
          background-color: rgba($theme-color, 0.8);
        }
      }
      .z-index-top {
        position: absolute;
        top: 0;
        bottom: 0;
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin: auto;
        img.name {
          width: 20%;
        }
        img.me {
          width: 40%;
        }
        .poem {
          >p {
            margin-bottom: 1.3rem;
            font-size: 2rem;
            font-weight: 900;
            line-height: 2rem;
            text-align: start;
            color: $white;
          }
        }
      }
    }
    &.my-capabilities {
      position: relative;
      .orange {
        background-color: $theme-color;
      }
      .half-circle {
        position: absolute;
        top: 0;
        transform: translateX(-50%);
        width: 12rem;
        height: 6rem;
        border-radius: 50% / 0 0 100% 100%;
      }
      .pillar {
        position: absolute;
        transform: translateX(-50%);
        width: 3rem;
        height: 100vh;
      }
      .capabilities-wrap {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        align-content: center;
        width: fit-content;
        margin: auto;
        li {
          transform: translateX(100%);
          margin-bottom: 5rem;
          font-size: 2rem;
          &:nth-child(2n) {
            transform: translateX(-100%);
          }
          .year {
            font-size: 3.2rem;
            color: $theme-color;
          }
          .photo {
            margin: 1rem auto;
          }
          .title {
            font-size: 2rem;
          }
          .period {
            font-size: 1.6rem;
            color: $text-secondary;
          }
        }
      }
    }
    &.recommend-books {
      align-content: center;
      background-color: rgba($theme-color, 0.8);
      > h2 {
        margin: 0;
        margin-bottom: 2rem;
        font-size: 4.8rem;
      }
      .books {
        display: grid;
        grid-template-columns: repeat(auto-fill, 25rem); /* ← 4カラム */
        gap: 3rem;
        justify-content: center;
        justify-items: center;
        margin: auto 5rem;
        .book {
          width: fit-content;
          padding: 2rem;
          background-color: $white;
          border-radius: 1.6rem;
          &.large {
            display: flex;
            width: 56rem;
            text-align: start;
            .text-wrap {
              margin-left: 3.5rem;
              .title {
                font-size: 2.4rem;
              }
              .description {
                font-size: 1.6rem;
              }
            }
          }
        }
      }
      .top-2-wrap {
        display: flex;
        justify-content: center;
        gap: 10.7rem;
        width: 100%;
        padding: 0 2rem;
        margin: 0;
        margin-bottom: 3.4rem;
        box-sizing: border-box;
        .book-img {
          width: 18.2rem;
        }
      }
      .some-wrap {
        .book-img {
          width: 14.9rem;
        }
      }
    }
    &.my-skill-tree {
      align-content: center;
      h2 {
        font-size: 4.8rem;
      }
      .flex-wrap {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        .graph-wrap {
          width: 50rem;
          > h3 {
            font-size: 2.4rem;
          }
        }
        .description-wrap {
          align-content: center;
          padding: 0 1.5rem;
          font-size: 2rem;
          background-color: $background-gray;
          > h3 {
            font-size: 2.4rem;
          }
        }
      }
    }
    &.my-hobby {
      align-content: center;
      padding: 5rem;
      box-sizing: border-box;
      background-color: rgba($theme-color, 0.8);
      > h2 {
        margin: 0;
        margin-bottom: 2rem;
        font-size: 4.8rem;
      }
      .hobby-list {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 52rem));
        gap: 2.4rem;
        justify-content: center;
        margin: 0;
        padding: 0;
        list-style: none;
        .hobby-card {
          display: grid;
          grid-template-columns: 18rem minmax(0, 1fr);
          gap: 2rem;
          align-items: center;
          min-height: 20rem;
          padding: 2rem;
          text-align: start;
          background-color: $white;
          border-radius: 0.8rem;
          box-sizing: border-box;
          .hobby-img {
            width: 100%;
            aspect-ratio: 1 / 1;
            object-fit: cover;
            border-radius: 0.6rem;
            background-color: $background-gray;
          }
          .hobby-text {
            white-space: break-spaces;
            min-width: 0;
            > h3 {
              margin: 0 0 1rem;
              font-size: 2.4rem;
              line-height: 1.3;
              overflow-wrap: anywhere;
            }
            > p {
              margin: 0;
              font-size: 1.6rem;
              line-height: 1.7;
              overflow-wrap: anywhere;
            }
          }
        }
      }
    }
    // 注釈
    abbr {
      &.outside {
        align-content: center;
        > div {
          margin-bottom: 1rem;
        }
        p,
        a {
          color: $black;
          font-size: 2rem;
        }
      }
    }
  }
}

@media screen and (max-width: 130rem) {
  .portfolio-wrap {
    section {
      height: auto;
      min-height: 100svh;
      overflow: hidden;
      box-sizing: border-box;
      &.introduction-me {
        background-attachment: scroll;
        .cover {
          height: 100%;
          min-height: 100svh;
          &.orange {
            clip-path: polygon(0 62%, 100% 42%, 100% 100%, 0 100%);
          }
        }
        .z-index-top {
          position: relative;
          flex-direction: column;
          justify-content: center;
          min-height: 100svh;
          padding: 6rem 1.6rem 4rem;
          box-sizing: border-box;
          img.name {
            width: min(78vw, 24rem);
            margin-bottom: 1.5rem;
          }
          img.me {
            width: min(82vw, 28rem);
          }
          .poem {
            width: 100%;
            margin-top: 2rem;
            >p {
              margin-bottom: 1rem;
              font-size: 1.6rem;
              line-height: 1.4;
              text-align: center;
            }
          }
        }
      }
      &.my-capabilities {
        min-height: auto;
        padding: 5rem 1.6rem;
        .half-circle {
          width: 8rem;
          height: 4rem;
        }
        .pillar {
          height: 100%;
          width: 1.8rem;
        }
        .capabilities-wrap {
          position: relative;
          width: 100%;
          max-width: 32rem;
          padding-left: 3.2rem;
          box-sizing: border-box;
          li {
            transform: none;
            margin-bottom: 3rem;
            font-size: 1.5rem;
            text-align: start;
            &:nth-child(2n) {
              transform: none;
            }
            &:last-child {
              margin-bottom: 0;
            }
            .year {
              font-size: 2.6rem;
            }
            .photo {
              max-width: 12rem;
              max-height: 12rem;
              margin: 0.8rem 0;
            }
            .title {
              font-size: 1.6rem;
              line-height: 1.35;
              white-space: pre-line;
              overflow-wrap: anywhere;
            }
            .period {
              font-size: 1.2rem;
              overflow-wrap: anywhere;
            }
          }
        }
      }
      &.recommend-books {
        padding: 4.5rem 1.2rem;
        > h2 {
          margin-bottom: 2rem;
          font-size: 2.8rem;
          line-height: 1.2;
        }
        .books {
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1.2rem;
          margin: 0;
          .book {
            width: 100%;
            padding: 1.2rem;
            border-radius: 0.8rem;
            box-sizing: border-box;
            &.large {
              display: grid;
              grid-template-columns: 8.4rem minmax(0, 1fr);
              width: 100%;
              gap: 1.2rem;
              .text-wrap {
                min-width: 0;
                margin-left: 0;
                .title {
                  font-size: 1.6rem;
                  line-height: 1.3;
                  overflow-wrap: anywhere;
                }
                .description {
                  font-size: 1.2rem;
                  line-height: 1.45;
                  overflow-wrap: anywhere;
                }
              }
            }
          }
        }
        .top-2-wrap {
          flex-direction: column;
          gap: 1.2rem;
          padding: 0;
          margin-bottom: 1.6rem;
          .book-img {
            width: 8.4rem;
          }
        }
        .some-wrap {
          .book-img {
            width: 100%;
            max-width: 10rem;
          }
        }
      }
      &.my-skill-tree {
        padding: 4.5rem 1.2rem;
        h2 {
          margin-bottom: 2rem;
          font-size: 2.8rem;
          line-height: 1.2;
        }
        .flex-wrap {
          gap: 1.6rem;
          .graph-wrap {
            width: 100%;
            max-width: 40rem;
            overflow: hidden;
            > h3 {
              font-size: 1.8rem;
            }
            :deep(.apexcharts-canvas),
            :deep(.apexcharts-svg) {
              max-width: 100%;
            }
          }
          .description-wrap {
            width: 100%;
            max-width: 32rem;
            padding: 1.6rem;
            font-size: 1.5rem;
            box-sizing: border-box;
            > h3 {
              font-size: 1.8rem;
            }
          }
        }
      }
      &.my-hobby {
        padding: 4.5rem 1.2rem;
        > h2 {
          margin-bottom: 2rem;
          font-size: 2.8rem;
          line-height: 1.2;
        }
        .hobby-list {
          grid-template-columns: minmax(0, 34rem);
          gap: 1.2rem;
          .hobby-card {
            grid-template-columns: 9.6rem minmax(0, 1fr);
            gap: 1.2rem;
            min-height: 12rem;
            padding: 1.2rem;
            .hobby-text {
              > h3 {
                margin-bottom: 0.6rem;
                font-size: 1.6rem;
              }
              > p {
                font-size: 1.2rem;
                line-height: 1.45;
              }
            }
          }
        }
      }
      // 注釈
      abbr {
        &.outside {
          p,
          a {
            font-size: 1.2rem;
          }
        }
      }
    }
  }
}
</style>
