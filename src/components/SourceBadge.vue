<script setup>
import { computed } from 'vue'
import { Archive, ExternalLink } from 'lucide-vue-next'

const props = defineProps({
  source: { type: [Object, String], required: true },
})

const normalizedSource = computed(() => (
  typeof props.source === 'string'
    ? { institution: props.source }
    : props.source || {}
))
</script>

<template>
  <details class="source-badge">
    <summary>
      <Archive :size="14" stroke-width="1.8" />
      <span>史料来源｜{{ normalizedSource.institution || '待核实' }}</span>
    </summary>
    <div class="source-detail">
      <p v-if="normalizedSource.title"><strong>资料名称</strong>{{ normalizedSource.title }}</p>
      <p v-if="normalizedSource.collectionId"><strong>馆藏编号</strong>{{ normalizedSource.collectionId }}</p>
      <p v-if="normalizedSource.reference"><strong>参考资料</strong>{{ normalizedSource.reference }}</p>
      <p v-if="normalizedSource.visitDate"><strong>访问日期</strong>{{ normalizedSource.visitDate }}</p>
      <a
        v-if="normalizedSource.url"
        :href="normalizedSource.url"
        target="_blank"
        rel="noopener noreferrer"
      >
        查看权威来源 <ExternalLink :size="14" />
      </a>
      <span v-else class="source-pending">来源链接待核实</span>
    </div>
  </details>
</template>

<style scoped>
.source-badge {
  position: relative;
  color: var(--color-text-secondary);
  font-size: 12px;
}
.source-badge summary {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 10px;
  color: var(--color-primary);
  background: #f7e8e3;
  border: 1px solid rgba(157, 63, 56, .14);
  border-radius: 999px;
  cursor: pointer;
  list-style: none;
  transition: background .2s ease, border-color .2s ease;
}
.source-badge summary::-webkit-details-marker { display: none; }
.source-badge summary:hover,
.source-badge summary:focus-visible {
  background: #f1d8d1;
  border-color: rgba(157, 63, 56, .32);
  outline: none;
}
.source-badge[open] summary { border-radius: 12px 12px 0 0; }
.source-detail {
  width: min(390px, 100%);
  padding: 13px 14px;
  background: var(--color-paper-light);
  border: 1px solid rgba(157, 63, 56, .18);
  border-radius: 0 12px 12px 12px;
  box-shadow: 0 12px 28px rgba(45, 35, 25, .1);
}
.source-detail p {
  display: grid;
  grid-template-columns: 64px 1fr;
  gap: 8px;
  margin: 0 0 8px;
  line-height: 1.55;
}
.source-detail strong { color: var(--color-text); font-weight: 700; }
.source-detail a {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-top: 2px;
  color: var(--color-primary);
  font-weight: 700;
}
.source-detail a:hover { color: var(--color-primary-dark); }
.source-pending { color: var(--color-text-light); }
</style>
