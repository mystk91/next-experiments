export default function Page() {
  return (
    <div style={styles.container}>
      <div style={styles.blurb}>
        This is a sample page with some filler content. When the screen is wide, this text is centered.
        But when the screen narrows, the left side stays pinned while the right side overflows.
        You can scroll horizontally to see the rest of the content.
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    padding: "0 16px",
    overflow: "hidden",
    width: "100vw",
  },
  blurb: {
    fontSize: "18px",
    lineHeight: "1.5",
    maxWidth: "600px",
    whiteSpace: "nowrap",
    overflowX: "auto",
    padding: "8px",
    backgroundColor: "#f4f4f4",
    borderRadius: "8px",
    left: "0",
  },
};
