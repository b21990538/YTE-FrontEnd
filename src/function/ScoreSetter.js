function ScoreSetter(value, setScore) {
    if (value < 0) {
        setScore(0);
        return;
    }
    if (value > 100) {
        setScore(100);
        return;
    }
    setScore(value);
}

export default ScoreSetter;