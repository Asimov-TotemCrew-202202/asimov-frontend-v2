<template>
  <v-chip class="" :color="showHoverIcon?'#081d87':''" label :text-color="showHoverIcon?'#ffffff':''" @mouseover="showIcon" @mouseleave="hideIcon" @click="click">
    <v-icon v-if="showHoverIcon" left>
      mdi-label
    </v-icon>
    {{text}}
  </v-chip>
</template>

<script>
  export default {
    name: 'ChipCustom',

    props:{
      text: {
        type: String,
        default: 'sample'
      },
    },

    data: () => ({
      showHoverIcon: false
    }),

    methods: {
      showIcon() {
        this.showHoverIcon = true;
      },
      hideIcon() {
        this.showHoverIcon = false;
      },
      click() {
        this.$emit('click');
      }
    }
  }
</script>

<style>
.v-icon {
  transition: 0.5s;
}
</style>
