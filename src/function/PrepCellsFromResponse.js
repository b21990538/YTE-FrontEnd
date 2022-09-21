function PrepCellsFromResponse(response, setCellState) {
    let cellState = [
        [false, false, false, false, false, false],
        [false, false, false, false, false, false],
        [false, false, false, false, false, false],
        [false, false, false, false, false, false],
        [false, false, false, false, false, false],
        [false, false, false, false, false, false],
        [false, false, false, false, false, false],
        [false, false, false, false, false, false],
        [false, false, false, false, false, false]
    ];

    for (const timeSlot of response.data.timeSlots) {
        cellState[timeSlot.slot][timeSlot.day] = true;
    }
    setCellState(cellState);
}

export default PrepCellsFromResponse;