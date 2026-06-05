<script setup>
import { defineEmits, ref, toRefs } from 'vue';
import ButtonCommon from '../all/common/ButtonCommon.vue';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  topic: String,
  isDeleteBtn: {
    type: Boolean,
    default: false,
  },
  dispId: String,
})
const { topic } = toRefs(props)
const emits = defineEmits(["deleteBtn", "saveBtn", "cancelBtn"]);

const editTopic = ref(topic.value);

const deleteBtn = (id) => {
  emits("deleteBtn", id);
};
const saveBtn = (id) => {
  if (isNaN(id)) {
    id = "1"; // 0追加時にNaNが来る為応急処置
  }
  if (editTopic.value == "") return;
  emits("saveBtn", { id: id, topic: editTopic.value });
}
const cancelBtn = (id) => {
  emits("cancelBtn", id);
}
</script>

<template>
  <section class="edit-topic-item-wrap">
    <div class="input-form-wrap">
      <div class="disp-id">
        {{ dispId }}:
      </div>
      <input
        v-model="editTopic"
        type="text"
        class="input-topic"
        :class="{ isDelete: isDeleteBtn }"
      >
      <button
        v-if="isDeleteBtn"
        class="delete-list-btn"
        @click="deleteBtn(id)"
      >
        削除
      </button>
    </div>
    <div class="btn-wrap">
      <ButtonCommon
        class="register-btn"
        @click="saveBtn(id)"
      >
        登録する
      </ButtonCommon>
      <ButtonCommon
        class-type="type-b"
        class="cancel-btn"
        @click="cancelBtn(id)"
      >
        キャンセル
      </ButtonCommon>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.edit-topic-item-wrap {
  .input-form-wrap {
    display: flex;
    justify-content: center;
    height: 3.7rem;
    font-size: 1.6rem;
    font-weight: 600;

    $border-size: 0.2rem;

    .disp-id {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0.4rem;
      background-color: $theme-color;
      border-radius: 0.5rem 0 0 0.5rem;
      box-sizing: border-box;
    }

    .input-topic {
      max-width: 42rem;
      width: 100%;
      height: 100%;
      padding: 0.4rem;
      background-color: $theme-color;
      border: $theme-color solid $border-size;
      border-radius: 0 0.5rem 0.5rem 0;
      box-sizing: border-box;

      &:focus-visible {
        background-color: $white;
        outline: none;
      }
    }

    .delete-list-btn {
      border: none;
      background-color: transparent;
      color: $delete-text-color;
      cursor: pointer;
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