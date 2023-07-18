<template>
  <div v-if="data && data.length">
    <p v-if="title">{{ title }}
    </p>
    <div class="badges">
      <Badge v-for="(item, index) in data" :key="index" :selected="modelValue.includes(item[valueLabel])"
        @click="onClick(item[valueLabel])">
        {{ item[titleLabel] }}
      </Badge>

      <span class="clear" v-if="modelValue && modelValue.length" @click="clear">
        x clear
      </span>
    </div>
  </div>
</template>

<script setup>
import Badge from './Badge.vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  data: {
    type: Array,
    required: true
  },
  modelValue: {
    type: Array,
    required: true
  },
  valueLabel: {
    type: String,
    default: 'id'
  },
  titleLabel: {
    type: String,
    default: 'name'
  }
})

const emit = defineEmits(['update:modelValue'])

const onClick = (value) => {
  if (props.modelValue.includes(value)) {
    emit('update:modelValue', props.modelValue.filter(item => item !== value))
  } else {
    emit('update:modelValue', [...props.modelValue, value])
  }
}

const clear = () => {
  emit('update:modelValue', [])
}

</script>

<style lang="scss">
.filters {
  display: flex;
  flex-direction: column;
  margin: 40px 0;

  p {
    font-size: 16px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
  }

  .badges {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin: 14px 0;
    align-items: center;
  }

  .clear {
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: left;
    cursor: pointer;
  }

}
</style>