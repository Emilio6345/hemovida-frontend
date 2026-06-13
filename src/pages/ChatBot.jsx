import { useState } from "react";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [pregunta, setPregunta] = useState("");
  const [mensajes, setMensajes] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleChat = () => setOpen(!open);

  const enviarPregunta = async () => {
    if (!pregunta.trim()) return;

    const nuevos = [
      ...mensajes,
      { tipo: "usuario", texto: pregunta }
    ];

    setMensajes(nuevos);
    setPregunta("");
    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:3000/api/v1/bot/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            pregunta
          })
        }
      );

      const data = await res.json();

      console.log("RESPUESTA API:", data);

      setMensajes([
        ...nuevos,
        {
          tipo: "bot",
          texto:
            data.respuesta ||
            data.debug ||
            "Sin respuesta"
        }
      ]);

    } catch (error) {

      console.log("ERROR FRONT:", error);

      setMensajes([
        ...nuevos,
        {
          tipo: "bot",
          texto: error.message
        }
      ]);

    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button onClick={toggleChat} style={styles.fab}>
        {open ? "✖" : "🤖"}
      </button>

      {open && (
        <div style={styles.container}>
          <div style={styles.header}>
            🤖 Asistente Ecommerce
          </div>

          <div style={styles.chatBox}>
            {mensajes.map((m, i) => (
              <div
                key={i}
                style={{
                  ...styles.msg,
                  alignSelf:
                    m.tipo === "usuario"
                      ? "flex-end"
                      : "flex-start",
                  background:
                    m.tipo === "usuario"
                      ? "#2563eb"
                      : "#e5e7eb",
                  color:
                    m.tipo === "usuario"
                      ? "white"
                      : "black"
                }}
              >
                {m.texto}
              </div>
            ))}

            {loading && (
              <div style={styles.msg}>
                🤖 escribiendo...
              </div>
            )}
          </div>

          <div style={styles.inputBox}>
            <input
              value={pregunta}
              onChange={(e) =>
                setPregunta(e.target.value)
              }
              onKeyDown={(e) =>
                e.key === "Enter" &&
                enviarPregunta()
              }
              placeholder="Ej: recomiéndame algo barato"
              style={styles.input}
            />

            <button
              onClick={enviarPregunta}
              style={styles.btn}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  fab: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    background: "#111827",
    color: "white",
    fontSize: "24px",
    border: "none",
    cursor: "pointer",
    zIndex: 99999
  },

  container: {
    position: "fixed",
    bottom: "90px",
    right: "20px",
    width: "340px",
    height: "450px",
    background: "white",
    borderRadius: "15px",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden"
  },

  header: {
    background: "#111827",
    color: "white",
    padding: "10px",
    textAlign: "center"
  },

  chatBox: {
    flex: 1,
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    gap: "8px"
  },

  msg: {
    padding: "10px",
    borderRadius: "10px",
    maxWidth: "80%"
  },

  inputBox: {
    display: "flex",
    padding: "10px",
    gap: "8px"
  },

  input: {
    flex: 1
  },

  btn: {
    padding: "10px"
  }
};