<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-navbar-brand href="#">AnLi</b-navbar-brand>
      <b-collapse is-nav id="nav-collapse">
        <b-navbar-nav>
          <b-nav-item href="#" v-b-modal.about-modal>{{ $t('navbar.about') }}</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="Language" right>
            <b-dropdown-item href="#" v-for="(text, locale) in languages" :key="locale" @click="selectLanguage(locale)" :active="$i18n.locale == locale">{{ text }}</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    
    <b-modal id="about-modal" centered ok-only :title="$t('navbar.about')">
      <div v-html="$t('navbar.aboutContent')"></div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'anli-navbar',
  data() {
    return {
      languages: {
        en: 'English',
        zh: '中文'
      }
    }
  },
  methods: {
    selectLanguage(locale) {
      this.$i18n.locale = locale
      localStorage.setItem('lang', locale)
    }
  }
};
</script>
