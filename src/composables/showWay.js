export function useShowWay(data, store) {
    const { currentMove } = store;
    const { ways, current } = data;
    //проверка на цвет текущей фигуры и цвет фигуры у которых ход
    if (currentMove !== current.figureType) return;

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