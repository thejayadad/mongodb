import { FiLayers } from "react-icons/fi";

export default function Logo() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <div
        style={{
          height: "34px",
          width: "34px",
          borderRadius: "10px",
          backgroundColor: "#222",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FiLayers size={18} color="#FFFFFF" />
      </div>

      <span
        style={{
          fontSize: "18px",
          fontWeight: 700,
          color: "#222",
          letterSpacing: "-0.5px",
        }}
      >
        BoardFlow
      </span>
    </div>
  );
}
