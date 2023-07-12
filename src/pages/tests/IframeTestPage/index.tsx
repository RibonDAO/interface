function IframeTestPage() {
  return (
    <div
      style={{
        width: "calc(100% + 520px)",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "auto",
        marginLeft: -260,
        marginRight: -260,
      }}
    >
      <iframe
        src="https://ribon.io/comunidade/"
        title="Ribon Comunidade"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
      />
    </div>
  );
}

export default IframeTestPage;
