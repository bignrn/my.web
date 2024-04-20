<script setup></script>

<template>
  <footer class="common-footer">
    <address>
      <a href="https://github.com/bignrn" target="_blank" class="code-link">
        <img src="images/all/address-github.svg" class="github-icon" />
        <span class="title">CODE公開</span>
      </a>
    </address>

    <small>
      <p class="title">画像著作</p>
      <ul class="small-ul-wrap">
        <li>icon by <a target="_blank" href="https://icons8.com" class="web-link">Icons8</a></li>
        <li>illustration by <a target="_blank" href="https://undraw.co/illustrations" class="web-link">unDraw</a></li>
        <li>Favicon by <a target="_blank" href="http://flat-icon-design.com/" class="web-link">FLAT ICON</a></li>
      </ul>
    </small>
  </footer>
</template>

<style lang="scss" scoped>
.common-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-weight: 600;
  width: 100%;
  height: 22.1rem;
  padding-bottom: 0.5rem;
  background-color: $theme-color;

  // 共通
  .title {
    font-size: 1.6rem;
    font-weight: 600;
    color: $black;
  }

  address {
    .code-link {
      text-decoration: none;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 1.5rem;

      .github-icon {
        max-width: 2.5rem;
        width: 100%;
      }
    }
  }

  small {
    .small-ul-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.3rem;

      li {
        font-size: 1.2rem;
        line-height: 1.6rem;
        color: $text-secondary;

        .web-link {
          color: $text-secondary;
        }
      }
    }
  }
}
</style>