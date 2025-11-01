<script setup>
import { nextTick, ref } from "vue";
import { generateAmidaSVG } from "@/util/createAmida";
import ButtonCommon from "@/components/all/common/ButtonCommon.vue";

const amidaDivRef = ref(null);
const playerNames = ref("you,me");
const paymentAmount = ref("2500");
const executedAmidaFlg = ref(false);
const errorMessage = ref([]);

const executeAmida = () => {
  errorMessage.value = [];
  executedAmidaFlg.value = true;
  const splitPlayerName = playerNames.value.trim().split(",").filter(Boolean);
  if (!paymentAmount.value.trim()) errorMessage.value.push("※金額を入力してください");
  if (!Number(paymentAmount.value.trim())) errorMessage.value.push("※数字を入力してください");
  if (splitPlayerName.length <= 1) errorMessage.value.push("※二人以上入力してください");
  if (errorMessage.value.length > 0) return;
  nextTick(() => {
    amidaDivRef.value.innerHTML = generateAmidaSVG(splitPlayerName, paymentAmount.value);
  });
};
</script>

<template>
  <section class="money-amida-root">
    <h1>金額あみだくじ(開発中)</h1>
    <p>超シンプル！</p>
    <div class="how-to-play mt">
      <h2>遊び方</h2>
      <ol>
        <li>参加者の名前を入力する。</li>
        <li>支払金額を入力する。</li>
        <li>あみだくじを生成する。</li>
        <li>当たった金額を払う💰</li>
      </ol>
    </div>
    <div class="player-name mt">
      <div class="input-wrap">
        <input v-model="playerNames" />
        <div>※名前を「,」カンマ 区切りで入力</div>
      </div>
    </div>
    <div class="money mt">
      <input v-model="paymentAmount" /><span>円</span>
    </div>
    <div class="execute mt">
      <ButtonCommon @click="executeAmida">あみだくじ を生成</ButtonCommon>
    </div>
    <div class="errors">
      <p v-for="err in errorMessage" :key="err" class="">{{ err }}</p>
    </div>
    <div class="results mt" :class="{ mb:!executedAmidaFlg }">
      <div v-if="(!paymentAmount && !playerNames) || !executedAmidaFlg" class="not-execute">※結果がここに表示するよ！</div>
      <div v-else ref="amidaDivRef" class="amida-wrap"></div>
    </div>
    <div v-if="executedAmidaFlg" class="just-kidding mt mb">
      <p>結果が出たら、さて、お財布を出そうか。</p>
      <p>男に二言は無いよね？？</p>
      <p>............冗談だよ？笑笑</p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.money-amida-root {
  margin-top: calc($header-height + 2rem);
  .mt {
    margin-top: 3rem;
  }
  .how-to-play {
    width: 25rem;
    margin: auto;
    font-size: 1.6rem;
    text-align: start;
    >h2 {
      text-align: center;
    }
  }
  .money,
  .player-name {
    input {
      font-size: 1.6rem;
    }
  }
  .errors {
    color: $text-error;
  }
  .results {
    .not-execute {
      align-content: center;
      width: 90%;
      height: 10rem;
      margin: auto;
      background-color: rgba($prof-theme-color, 0.5);
    }
    .amida-wrap {
      overflow-y: scroll;
    }
  }
  .mb {
    margin-bottom: 5rem;
  }
}
</style>