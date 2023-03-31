<script setup>
import { defineProps, ref, toRefs } from 'vue';
import ButtonCommon from '../all/common/ButtonCommon.vue';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  topic: String,
})
const { topic } = toRefs(props)

const editTopic = ref(topic.value);

</script>

<template>
  <section class="edit-topic-item-wrap">
    <div class="input-form-wrap">
      <div>{{ id }}：</div>
      <input type="text" v-model="editTopic" class="input-topic" />
    </div>
    <div class="btn-wrap">
      <ButtonCommon class="register-btn">
        登録する
      </ButtonCommon>
      <ButtonCommon classType="type-b" class="cancel-btn">
        キャンセル
      </ButtonCommon>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.edit-topic-item-wrap {

  .input-form-wrap {
    display: flex;

    >div {
      display: flex;
      align-items: center;
      height: calc(2rem - 0.1rem);
      padding: 0.4rem;
      background-color: $theme-color;
      border-radius: 0.5rem 0 0 0.5rem;
    }

    .input-topic {
      font-size: 1.2rem;
      font-weight: 600;
      width: 20rem;
      height: 1.5rem;
      padding: 0.4rem;
      background-color: $theme-color;
      border: $theme-color solid 0.2rem;
      border-radius: 0 0.5rem 0.5rem 0;

      &:focus-visible {
        background-color: $white;
        outline: none;
      }
    }
  }


  .btn-wrap {
    display: flex;
    justify-content: center;
    margin-top: 0.4rem;

    .register-btn,
    .cancel-btn {
      margin: 0.5rem 0.3rem;
    }
  }
}
</style>