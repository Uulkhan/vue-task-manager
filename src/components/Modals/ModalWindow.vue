<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div class="modal-wrapper" @click.self="store.closeModal" v-if="store.modalState?.component" aria-modal="true"
        role="dialog" tabindex="-1">
        <component :is="store.modalState?.component" v-bind="store.modalState?.props" />
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import { useModalStore } from "@/stores/modal";

const store = useModalStore();

// Make a function that will trigger on keydown
function keydownListener(event) {
  // Assert the key is escape
  if (event.key === "Escape") store.closeModal();
}

// Attach event listener on mount
onMounted(() => {
  document.addEventListener("keydown", keydownListener);
});

// Clean up on unmount
onUnmounted(() => {
  document.removeEventListener("keydown", keydownListener);
});
</script>

<style lang="scss">
.modal-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 500;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);

  display: grid;
  place-items: center;
  color: var(--black-color);

  .inner {
    background-color: white;
    padding: 30px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    position: relative;
    max-width: 614px;
    width: 100%;

    h2 {
      font-size: 16px;
      font-weight: 700;
      line-height: 21px;
      letter-spacing: 0em;
      text-align: left;
    }

    .close-btn {
      position: absolute;
      top: 15px;
      right: 15px;
      cursor: pointer;
      background-color: var(--white-color);
    }

    .form {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-top: 16px;
      max-width: 308px;

      .form-item {
        display: flex;
        flex-direction: column;

        label {
          font-size: 12px;
          font-weight: 500;
          line-height: 16px;
          letter-spacing: 0em;
          text-align: left;
        }

        input,
        select,
        textarea {
          font-size: 12px;
          font-weight: 400;
          line-height: 16px;
          letter-spacing: 0em;
          text-align: left;
          border: 1px solid #C2C2C2;
          border-radius: 4px;
          padding: 8px 12px;
          margin-top: 5px;

          &::placeholder {
            color: #A6A6A6;
          }
        }

      }

      .btn {
        width: fit-content;
        padding-inline: 23px;
        margin-top: 24px;
      }
    }
  }
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: 0.25s ease all;
}
</style>