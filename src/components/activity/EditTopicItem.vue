<script setup>
import { defineProps, defineEmits, ref, toRefs } from 'vue';
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
      <div class="disp-id">{{ dispId }}:</div>
      <input type="text" v-model="editTopic" class="input-topic" :class="{ isDelete: isDeleteBtn }" />
      <button v-if="isDeleteBtn" @click="deleteBtn(id)" class="delete-list-btn">削除</button>
    </div>
    <div class="btn-wrap">
      <ButtonCommon @click="saveBtn(id)" class="register-btn">
        登録する
      </ButtonCommon>
      <ButtonCommon @click="cancelBtn(id)" classType="type-b" class="cancel-btn">
        キャンセル
      </ButtonCommon>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.edit-topic-item-wrap {
  .input-form-wrap {
    display: flex;

    .disp-id {
      display: flex;
      align-items: center;
      height: calc(2rem - 0.1rem);
      padding: 0.4rem;
      background-color: $theme-color;
      border-radius: 0.5rem 0 0 0.5rem;
      font-size: 1rem;
      font-weight: 600;
    }

    .input-topic {
      font-size: 1rem;
      font-weight: 600;
      width: 16rem;
      height: 1.5rem;
      padding: 0.4rem;
      background-color: $theme-color;
      border: $theme-color solid 0.2rem;
      border-radius: 0 0.5rem 0.5rem 0;

      &:focus-visible {
        background-color: $white;
        outline: none;
      }

      &.isDelete {
        width: 15rem;
      }
    }

    .delete-list-btn {
      border: none;
      background-color: transparent;
      color: $delete-text-color;
      margin-left: auto;
      cursor: pointer;
    }
  }

  .btn-wrap {
    display: flex;
    justify-content: center;
    margin-top: 0.4rem;

    .register-btn,
    .cancel-btn {
      font-size: 1rem;
      font-weight: 600;
      margin: 0.5rem 0.3rem;
    }
  }
}
</style>