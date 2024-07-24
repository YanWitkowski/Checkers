<template>
  <div class="app">
    <div class="app__container">
      <UserInfo :data="{ title: 'White', user: userWhite, isCurrentWay: isCurrentWhite }" />
      <CheckersTable />
      <UserInfo :data="{ title: 'Black', user: userBlack, isCurrentWay: isCurrentBlack }" />
    </div>
  </div>
</template>
<script>
import CheckersTable from "@/components/CheckersTable.vue";
import UserInfo from "@/components/UserInfo.vue";
import { useMainStore } from "@/store";
import { useUserStore} from "@/store/user";
import { mapStores } from "pinia";

export default {
  setup() { },
  components: {
    CheckersTable,
    UserInfo
  },
  data() {
    return {};
  },
  computed: {
    ...mapStores(useMainStore, useUserStore),
    userBlack() {
      return this.userStore?.userBlack;
    },
    userWhite() {
      return this.userStore?.userWhite;
    },
    isCurrentWhite() {
      return this.mainStore?.currentMove === 2;
    },
    isCurrentBlack() {
      return this.mainStore?.currentMove === 1;
    }
  }
};
</script>

<style lang="less">
.app {
  &__container {
    display: flex;
    width: 1400px;
    margin: 0 auto;
  }
}
</style>