<template>
    <div class="table-cell" @click="moveChecker">
        <div v-if="figureType !== 0" class="table-cell__figure" :class="{
            'table-cell__figure--black': figureType === 1,
            'table-cell__figure--white': figureType === 2,
        }" @click.stop="showWay">
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { defineProps, reactive, ref } from "vue";
import { useMainStore } from "@/store";
import { useMoveCalculate } from "@/composables/moveCalculate.js"

const store = useMainStore();
const { table } = storeToRefs(store);

const emit = defineEmits(["showWay", "moveChecker"]);
const props = defineProps({
    data: {
        type: Object,
        default: () => ({})
    },
});

const figureType = ref(props.data.figureType);
const cx = ref(props.data.cx);
const cy = ref(props.data.cy);

const current = reactive({ 
    cx: cx.value, 
    cy: cy.value, 
    figureType: figureType.value,
});

function onTable(way) {
    const { cx, cy } = way;

    return cx >= 0 && cx < 8 && cy >= 0 && cy < 8;
}

function canMove(way) {
  const { cx, cy } = way;

  //в пределах поля и ячейка пуста
  return onTable(way) && table.value[cy][cx] === 0;
}

function showWay() {
    let ways = [
        {
            position: "topLeft",
            cx: cx.value - 1,
            cy: cy.value - 1
        },
        {
            position: "topRight",
            cx: cx.value + 1,
            cy: cy.value - 1
        },
        {
            position: "bottomLeft",
            cx: cx.value - 1,
            cy: cy.value + 1
        },
        {
            position: "bottomRight",
            cx: cx.value + 1,
            cy: cy.value + 1
        },
    ].filter((item) => onTable(item));

    ways = useMoveCalculate({ ways, table, figureType }).filter((item) => canMove(item));

    emit("showWay", { ways, current });
}

function moveChecker() {
  emit("moveChecker", current)
}
</script>

<style lang="less">
.table-cell {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;

    &__figure {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        box-shadow: 0 0 1px 4px @gray;

        &--black {
            background-color: @black;
        }

        &--white {
            background-color: @white;
        }
    }
}
</style>