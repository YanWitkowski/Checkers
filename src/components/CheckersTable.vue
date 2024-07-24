<template>
    <div class="checkers-table">
        <div v-for="(row, rowIndex) in table" class="checkers-table__row" :key="rowIndex">
            <TableCell v-for="(cell, cellIndex) in row" class="checkers-table__cell"
                :class="{ 'checkers-table__cell--highlight': tableHighlight[rowIndex][cellIndex] === 1 }"
                :key="rowIndex + '-' + cellIndex + cell" :data="{ figureType: cell, cx: cellIndex, cy: rowIndex }"
                @showWay="showWay" @moveChecker="moveChecker" />
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import TableCell from "@/components/TableCell.vue";
import { useMainStore } from "@/store";
import { useUserStore } from "@/store/user";

const { userWhite, userBlack } = storeToRefs(useUserStore());

const store = useMainStore();
const { table, tableHighlight, currentChecker, currentMove, toogleMove } = storeToRefs(store);

function showWay(data) {
    const { ways, current } = data;

    //проверка на цвет текущей фигуры и цвет фигуры у которых ход
    if (currentMove.value !== current.figureType) return;

    //создаем временный пустой массив
    const tempArr = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    //добавляем подсветку для возможных путей
    ways.forEach((way) => {
        tempArr[way.cy][way.cx] = 1;
    });
    //обновляем store
    store.$patch({
        tableHighlight: tempArr,
        currentChecker: current,
    });
}

function takeEnemy(cell) {
    const { cx, cy, figureType } = currentChecker.value;
    const { cx: ccx, cy: ccy } = cell;
    let enemy = {};

    const ways = {
        topLeft: () => (cx > ccx && cy > ccy),
        topRight: () => (cx < ccx && cy > ccy),
        bottomLeft: () => (cx > ccx && cy < ccy),
        bottomRight: () => (cx < ccx && cy < ccy),
    };

    const options = {
        topLeft: () => ({ cx: ccx + 1, cy: ccy + 1 }),
        topRight: () => ({ cx: ccx - 1, cy: ccy + 1 }),
        bottomLeft: () => ({ cx: ccx + 1, cy: ccy - 1 }),
        bottomRight: () => ({ cx: ccx - 1, cy: ccy - 1 }),
    };

    Object.entries(ways).forEach(([key, value]) => {
        if (value()) {
            enemy = options[key]();
            return;
        }
    });

    if (enemy.cx !== cx && enemy.cy !== cy && table.value[enemy.cy][enemy.cx] !== figureType) {
        store.$patch((state) => {
            state.table[enemy.cy][enemy.cx] = 0;
        });

        if (figureType === 1) {
            userBlack.value.increaseScore();
            userBlack.value.addTableItem(2);
        } else {
            userWhite.value.increaseScore();
            userWhite.value.addTableItem(1);
        }
    }
}

function moveChecker(current) {
    const { cx, cy } = current;
    //если подсвечена туда можно идти
    if (tableHighlight.value[cy][cx] === 1) {
        takeEnemy(current);
        //обновляем store
        store.$patch((state) => {
            //удаляем шашку с предыдущего места
            state.table[currentChecker.value.cy][currentChecker.value.cx] = 0;
            //устанавливаем шашку в новое место
            state.table[cy][cx] = currentChecker.value.figureType;
        });
        //обнуляем подсветку
        store.resetTableHighlight();
        //обнуляем текущую шашку
        store.resetCurrentChecker();
        //меняем цвет фигур, у которых ход
        store.toggleMove();
    }
}
</script>

<style lang="less">
.checkers-table {
    display: flex;
    flex-direction: column;
    width: 800px;
    height: 800px;
    margin: 0 auto;
    border: 1px solid @gray;

    &__row {
        display: flex;
        width: 100%;

        &:nth-child(2n) {
            .checkers-table__cell:nth-child(2n+1) {
                background-color: @brown;
            }
        }

        &:nth-child(2n+1) {
            .checkers-table__cell:nth-child(2n) {
                background-color: @brown;
            }
        }
    }

    &__cell {
        position: relative;

        &--highlight {
            &::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: @green;
                opacity: 0.5;
            }
        }
    }
}
</style>