<template>
  <div class="demo-style-container">
    <span class="py-result-item">
      <ruby>
        <span class="py-chinese-item">汉</span>
        <rp>(</rp>
        <rt class="py-pinyin-item">hàn</rt>
        <rp>)</rp>
      </ruby>
    </span>
    <span class="py-result-item">
      <ruby>
        <span class="py-chinese-item">语</span>
        <rp>(</rp>
        <rt class="py-pinyin-item">yǔ</rt>
        <rp>)</rp>
      </ruby>
    </span>
    ，
    <span class="py-result-item">
      <ruby>
        <span class="py-chinese-item">拼</span>
        <rp>(</rp>
        <rt class="py-pinyin-item">pīn</rt>
        <rp>)</rp>
      </ruby>
    </span>
    <span class="py-result-item">
      <ruby>
        <span class="py-chinese-item">音</span>
        <rp>(</rp>
        <rt class="py-pinyin-item">yīn</rt>
        <rp>)</rp>
      </ruby>
    </span>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.demo-style-container {
  padding: 20px 12px 12px;
  border: 1px solid #555;
  border-radius: 4px;
  .py-chinese-item {
    color: blue;
  }
  .py-pinyin-item {
    color: red;
  }
}
</style>
