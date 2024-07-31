function editWay(way) {
    const { cx, cy, position } = way;
  
    const options = {
      topLeft: (x, y) => ({ cx: x - 1, cy: y - 1 }),
      topRight: (x, y) => ({ cx: x + 1, cy: y - 1 }),
      bottomLeft: (x, y) => ({ cx: x - 1, cy: y + 1 }),
      bottomRight: (x, y) => ({ cx: x + 1, cy: y + 1 })
    };
  
    return Object.assign({ position }, options[position](cx, cy));
  }
  
export function useMoveCalculate(params) {
    const { ways, table, figureType } = params

    const availableWays= {
      1: ["topLeft", "topRight"],
      2: ["bottomLeft", "bottomRight"]
    };
  
    const temp = [];
  
    ways.forEach((way) => {
      const { cx, cy, position } = way;
      const tableCell = table.value[cy][cx];
      const canMove = availableWays[figureType.value].includes(position);
  
       //ячейка пуста, но неверное направление
       if (tableCell === 0 && !canMove) return;
      //ячейка пуста, но верное направление
      if (tableCell === 0 && canMove) {
        return temp.push(way);
      }
      if (tableCell !== figureType.value) {
        return temp.push(editWay(way));
      }
    });
  
    return temp;
  }