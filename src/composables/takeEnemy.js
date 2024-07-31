export function useTakeEnemy(params) {
    const { cell, currentChecker, store, table, userBlack, userWhite } = params;

    const { cx, cy, figureType } = currentChecker;
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

    if (enemy.cx !== cx && enemy.cy !== cy && table[enemy.cy][enemy.cx] !== figureType) {
        store.$patch((state) => {
            state.table[enemy.cy][enemy.cx] = 0;
        });

        if (figureType === 1) {
            userBlack.increaseScore();
            userBlack.addTableItem(2);
        } else {
            userWhite.increaseScore();
            userWhite.addTableItem(1);
        }
    }
}