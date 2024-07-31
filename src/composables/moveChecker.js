import { useTakeEnemy } from "@/composables/takeEnemy.js"

export function useMoveChecker(params) {
    const { cell, currentChecker, store, table, tableHighlight, userBlack, userWhite } = params;
    const { cx, cy } = cell;
    //если подсвечена туда можно идти
    if (tableHighlight[cy][cx] === 1) {
        useTakeEnemy({ cell, currentChecker, store, table, userBlack, userWhite })
        //обновляем store
        store.$patch((state) => {
            //удаляем шашку с предыдущего места
            state.table[currentChecker.cy][currentChecker.cx] = 0;
            //устанавливаем шашку в новое место
            state.table[cy][cx] = currentChecker.figureType;
        });
        //обнуляем подсветку
        store.resetTableHighlight();
        //обнуляем текущую шашку
        store.resetCurrentChecker();
        //меняем цвет фигур, у которых ход
        store.toggleMove();
    }
}