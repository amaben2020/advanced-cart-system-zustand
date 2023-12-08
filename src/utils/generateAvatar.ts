export const generateAvatar = (
  firstName: string,
  lastName: string,
): { text: string; bg: string; textColor: string } => {
  const colors = [
    { text: "#FF5733", bg: "#33FF57" },
    { text: "#7D3C98", bg: "#3498DB" },
    { text: "#1F618D", bg: "#F39C12" },
    { text: "#D35400", bg: "#E74C3C" },
    { text: "#27AE60", bg: "#E74C3C" },
    { text: "#3498DB", bg: "#7D3C98" },
    { text: "#2ECC71", bg: "#E74C3C" },
    { text: "#F39C12", bg: "#1F618D" },
    { text: "#E74C3C", bg: "#27AE60" },
    { text: "#9B59B6", bg: "#16A085" },
    { text: "#16A085", bg: "#9B59B6" },
    { text: "#2C3E50", bg: "#F39C12" },
    { text: "#E74C3C", bg: "#3498DB" },
    { text: "#3498DB", bg: "#E74C3C" },
    { text: "#2ECC71", bg: "#F39C12" },
    { text: "#F39C12", bg: "#2ECC71" },
    { text: "#27AE60", bg: "#3498DB" },
    { text: "#E74C3C", bg: "#2C3E50" },
    { text: "#9B59B6", bg: "#16A085" },
    { text: "#16A085", bg: "#9B59B6" },
    { text: "#2C3E50", bg: "#F39C12" },
    { text: "#E74C3C", bg: "#3498DB" },
    { text: "#3498DB", bg: "#E74C3C" },
    { text: "#2ECC71", bg: "#F39C12" },
    { text: "#F39C12", bg: "#2ECC71" },
    { text: "#27AE60", bg: "#3498DB" },
    { text: "#E74C3C", bg: "#2C3E50" },
    { text: "#9B59B6", bg: "#16A085" },
    { text: "#16A085", bg: "#9B59B6" },
    { text: "#2C3E50", bg: "#F39C12" },
  ];

  const firstText = firstName?.split("")[0];
  const secondText = lastName?.split("")[0];

  const firstTextChar = firstText?.charCodeAt(0);
  const lastTextChar = secondText?.charCodeAt(0);

  const colorIndex = (firstTextChar + lastTextChar) % colors.length;

  return {
    text: firstText?.toUpperCase() + secondText?.toUpperCase(),
    bg: colors[colorIndex]["bg"],
    textColor: colors[colorIndex]["text"],
  };
};
