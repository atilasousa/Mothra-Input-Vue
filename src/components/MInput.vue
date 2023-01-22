<script lang="ts" setup>
import { ref } from "vue";
import bem from "bem-ts";

defineEmits<{
  (e: "update:modelValue", text: string): void;
}>();

defineProps<{
  modelValue?: string;
  placeHolder?: string;
  labelPlaceHolder?: string;
}>();

const input = ref(null);

const inputFocus = ref(false);

const focusInput = () => {
  inputFocus.value = true;
  input.value?.focus();
};

const inputClass = bem("mothra-input", { strict: false });
</script>
<template>
  <div :class="inputClass()">
    <label
      v-if="labelPlaceHolder"
      :class="inputClass('label-placeholder', { focus: inputFocus })"
    >
      <span @click="focusInput">{{ labelPlaceHolder }}</span>
    </label>
    <input
      type="text"
      ref="input"
      :value="modelValue"
      @focusin="inputFocus = true"
      @focusout="inputFocus = false"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />
    <Transition name="slide-fade">
      <span
        v-if="!inputFocus && !modelValue"
        @click="focusInput"
        :class="inputClass('placeholder')"
      >
        {{ placeHolder }}
      </span>
    </Transition>
  </div>
</template>
<style lang="scss">
* {
  box-sizing: border-box;
}

.mothra-input {
  border-radius: 1rem;
  padding: 1rem 0.5rem;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;

  input {
    padding: 0.7rem 0.4rem;
    border-radius: 1rem;
    background-color: #535353b0;
    border: none;
    outline: none;
    transition: 0.3s;
    width: 100%;

    &:focus {
      transition: 0.3s;
      padding-left: 0.8rem;

      &::placeholder {
        color: transparent;
      }
    }
  }

  &__label-placeholder {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 1.1rem;
    display: flex;
    align-items: center;
    transition: 0.3s;
    text-align: left;
    cursor: auto;
    color: #9b9b9b;
  }

  &__label-placeholder--focus {
    display: inline-block;
    top: -0.6rem;
    // left: 0.7rem;
    bottom: 0;
    color: white;
  }

  &__placeholder {
    position: absolute;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    left: 1.1rem;
    color: #9b9b9b;
    top: 0;
    bottom: 0;
    transition: 0.2s;
  }
}

.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(4px);
  opacity: 0;
}
</style>
