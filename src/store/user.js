import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore('user', () => {
  class user {
    constructor(score, table) {
      this.score = score,
      this.table = table
    }

    addTableItem(figureType) {
      this.table.push(figureType)
    }

    increaseScore() {
      this.score++
    }
  }

  const userBlack = ref(new user(0, []))

  const userWhite = ref(new user(0, []))

  return {
    userBlack,
    userWhite
  }
});