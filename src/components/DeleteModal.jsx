const backdropStyle = {
  position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)",
  display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999
};
const modalStyle = { background: "#fff", padding: 20, borderRadius: 6, minWidth: 300 };

const DeleteModal = ({ open, title = "Confirmar eliminación", message, onConfirm, onCancel, loading=false }) => {
  if (!open) return null;
  return (
    <div style={backdropStyle} role="presentation">
      <div style={modalStyle} role="dialog" aria-modal="true" aria-labelledby="delete-modal-title">
        <h3 id="delete-modal-title">{title}</h3>
        <p>{message || "¿Estás seguro?"}</p>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button onClick={onCancel} disabled={loading} aria-label="Cancelar eliminación">Cancelar</button>
          <button onClick={onConfirm} disabled={loading} aria-label={loading ? "Eliminando" : "Confirmar eliminación"}>{loading ? "Eliminando..." : "Eliminar"}</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
