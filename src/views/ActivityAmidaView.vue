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
    <div class="how-to-play">
      <h2>遊び方</h2>
      <ol>
        <li>参加者の名前を入力する。</li>
        <li>支払金額を入力する。</li>
        <li>あみだくじを開始する。</li>
        <li>当たった金額を払う💰</li>
      </ol>
    </div>
    <div class="player-name">
      <div class="input-wrap">
        <input v-model="playerNames" />
        <div>※名前を「,」カンマ 区切りで入力</div>
      </div>
    </div>
    <div class="money">
      <input v-model="paymentAmount" /><span>円</span>
    </div>
    <div class="execute">
      <ButtonCommon @click="executeAmida">あみだくじ を生成</ButtonCommon>
    </div>
    <div class="errors">
      <p v-for="err in errorMessage" :key="err" class="">{{ err }}</p>
    </div>
    <div class="results">
      <div v-if="(!paymentAmount && !playerNames) || !executedAmidaFlg" class="not-execute">※結果がここに表示するよ！</div>
      <div v-else ref="amidaDivRef" class="amida-wrap"></div>
    </div>
    <div>
      <p>結果が出たら、さて、お財布を出そうか。</p>
      <p>男に二言は無いよね？？</p>
      <p>............冗談だよ？笑笑</p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.money-amida-root {
  margin-top: calc($header-height + 2rem);
  .amida-wrap {
    overflow-y: scroll;
  }
}
</style>