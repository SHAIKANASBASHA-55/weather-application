
const COLORS  = [
    "#D847DB",
    "#138E78",
    "#FF5733",
    "#66CC99",
    "#E74C3C",
    "#F39C12",
    "#3498DB",
    "#388EE7",
    "#8B49CC",
    "#3C882C",
    "#C63F3F",
    "#6249CC",
    "#1B127B",
    "#9B59B6",
    "#27AE60",
    "#F1C40F"
  ]

export function RandomColor() {
    const randomIndex = Math.floor(Math.random() * COLORS.length);
    const randomColor = COLORS[randomIndex];
    return randomColor;
}